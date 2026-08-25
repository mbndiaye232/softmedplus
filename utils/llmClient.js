/**
 * Unified Multi-Provider LLM Client for SoftMed
 * Supports: OpenRouter, Google Gemini, DeepSeek, Anthropic Claude, Mammouth, OpenAI
 */

async function callLLM({ provider, apiKey, model, baseUrl, messages, temperature = 0.7, maxTokens = 1500, systemPrompt = '' }) {
  if (!apiKey) {
    throw new Error('Clé API LLM non fournie.');
  }

  const p = (provider || 'openrouter').toLowerCase();

  // Prepare full message list with optional system prompt
  let formattedMessages = [];
  if (systemPrompt && systemPrompt.trim()) {
    formattedMessages.push({ role: 'system', content: systemPrompt.trim() });
  }

  if (Array.isArray(messages)) {
    formattedMessages = formattedMessages.concat(messages);
  } else if (typeof messages === 'string') {
    formattedMessages.push({ role: 'user', content: messages });
  }

  // 1. Google Gemini Native API
  if (p === 'gemini') {
    return await callGeminiNative({ apiKey, model, messages: formattedMessages, temperature, maxTokens });
  }

  // 2. Anthropic Claude Native API
  if (p === 'claude' || p === 'anthropic') {
    return await callClaudeNative({ apiKey, model, messages: formattedMessages, temperature, maxTokens, systemPrompt });
  }

  // 3. OpenAI-Compatible API (OpenRouter, DeepSeek, Mammouth, Custom)
  return await callOpenAICompatible({ provider: p, apiKey, model, baseUrl, messages: formattedMessages, temperature, maxTokens });
}

/**
 * OpenAI-Compatible Protocol (OpenRouter, DeepSeek, Mammouth, OpenAI, Local Ollama)
 */
async function callOpenAICompatible({ provider, apiKey, model, baseUrl, messages, temperature, maxTokens }) {
  let endpoint = 'https://openrouter.ai/api/v1/chat/completions';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  if (provider === 'openrouter') {
    endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    headers['HTTP-Referer'] = 'https://softmed.com.co';
    headers['X-Title'] = 'SoftMed EHR Platform';
  } else if (provider === 'deepseek') {
    endpoint = 'https://api.deepseek.com/v1/chat/completions';
  } else if (provider === 'mammouth') {
    endpoint = baseUrl || 'https://api.mammouth.ai/v1/chat/completions';
  } else if (provider === 'custom' && baseUrl) {
    endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl.replace(/\/+$/, '')}/chat/completions`;
  }

  const payload = {
    model: model || (provider === 'openrouter' ? 'deepseek/deepseek-chat' : 'deepseek-chat'),
    messages,
    temperature: parseFloat(temperature) || 0.7,
    max_tokens: parseInt(maxTokens, 10) || 1500
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errBody = await res.text();
      let msg = `Erreur API ${provider} (${res.status})`;
      try {
        const parsed = JSON.parse(errBody);
        msg = parsed.error?.message || parsed.message || msg;
      } catch (e) {
        msg = `${msg}: ${errBody.slice(0, 150)}`;
      }
      throw new Error(msg);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    return {
      content,
      model: data.model || model,
      usage: data.usage || null,
      provider
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(`Délai d'attente dépassé (45s) lors de la communication avec ${provider}.`);
    }
    throw err;
  }
}

/**
 * Google Gemini Native REST API
 */
async function callGeminiNative({ apiKey, model, messages, temperature, maxTokens }) {
  const modelName = (model || 'gemini-2.0-flash-001').replace(/^models\//, '');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  // Convert OpenAI-style messages to Gemini contents format
  const contents = [];
  let systemInstruction = null;

  for (const m of messages) {
    if (m.role === 'system') {
      systemInstruction = { parts: [{ text: m.content }] };
    } else {
      contents.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      });
    }
  }

  // Gemini requires at least one user turn
  if (contents.length === 0) {
    contents.push({ role: 'user', parts: [{ text: 'Bonjour' }] });
  }

  const payload = {
    contents,
    generationConfig: {
      temperature: parseFloat(temperature) || 0.7,
      maxOutputTokens: parseInt(maxTokens, 10) || 1500
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = systemInstruction;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errBody = await res.text();
      let msg = `Erreur Gemini (${res.status})`;
      try {
        const parsed = JSON.parse(errBody);
        msg = parsed.error?.message || msg;
      } catch (e) {
        msg = `${msg}: ${errBody.slice(0, 150)}`;
      }
      throw new Error(msg);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.map(p => p.text).join('') || '';

    return {
      content: text,
      model: modelName,
      usage: data.usageMetadata || null,
      provider: 'gemini'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(`Délai d'attente dépassé (45s) avec l'API Google Gemini.`);
    }
    throw err;
  }
}

/**
 * Anthropic Claude Native REST API
 */
async function callClaudeNative({ apiKey, model, messages, temperature, maxTokens, systemPrompt }) {
  const endpoint = 'https://api.anthropic.com/v1/messages';
  const modelName = model || 'claude-3-5-sonnet-20241022';

  // Extract system prompt from messages if not provided explicitly
  let extractedSystem = systemPrompt || '';
  const filteredMessages = [];

  for (const m of messages) {
    if (m.role === 'system') {
      extractedSystem += (extractedSystem ? '\n\n' : '') + m.content;
    } else {
      filteredMessages.push({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      });
    }
  }

  if (filteredMessages.length === 0) {
    filteredMessages.push({ role: 'user', content: 'Bonjour' });
  }

  const payload = {
    model: modelName,
    messages: filteredMessages,
    max_tokens: parseInt(maxTokens, 10) || 1500,
    temperature: parseFloat(temperature) || 0.7
  };

  if (extractedSystem) {
    payload.system = extractedSystem;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errBody = await res.text();
      let msg = `Erreur Anthropic Claude (${res.status})`;
      try {
        const parsed = JSON.parse(errBody);
        msg = parsed.error?.message || msg;
      } catch (e) {
        msg = `${msg}: ${errBody.slice(0, 150)}`;
      }
      throw new Error(msg);
    }

    const data = await res.json();
    const content = data.content?.map(c => c.text).join('') || '';

    return {
      content,
      model: data.model || modelName,
      usage: data.usage || null,
      provider: 'claude'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(`Délai d'attente dépassé (45s) avec l'API Claude.`);
    }
    throw err;
  }
}

module.exports = {
  callLLM
};
