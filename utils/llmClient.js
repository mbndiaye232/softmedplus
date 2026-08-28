/**
 * Unified Multi-Provider LLM Client for SoftMed
 * Supports: OpenRouter, Google Gemini, DeepSeek, Anthropic Claude, Mammouth, OpenAI
 *
 * Appel d'outils (tool calling) : `messages` et `tools` utilisent un format neutre,
 * indépendant du fournisseur, pour que l'agent (utils/aiAgentTools.js) fonctionne à
 * l'identique quel que soit le LLM choisi par le tenant (clé générique OpenRouter/AIML
 * multi-modèles, ou clé native Claude/Gemini/DeepSeek) :
 *
 *   messages: [
 *     { role: 'user'|'assistant'|'system', content: string },
 *     { role: 'assistant', content: string, tool_calls: [{ id, name, arguments }] },
 *     { role: 'tool', tool_call_id, name, content: string }
 *   ]
 *   tools: [{ name, description, parameters: <JSON Schema object> }]
 *
 * Chaque adaptateur (OpenAI-compatible / Claude / Gemini) traduit cette forme neutre
 * vers son propre protocole à l'aller, et normalise sa réponse vers
 * `{ content, toolCalls: [{id, name, arguments}] }` au retour.
 */

async function callLLM({ provider, apiKey, model, baseUrl, messages, tools, temperature = 0.7, maxTokens = 1500, systemPrompt = '' }) {
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
    return await callGeminiNative({ apiKey, model, messages: formattedMessages, temperature, maxTokens, tools });
  }

  // 2. Anthropic Claude Native API
  if (p === 'claude' || p === 'anthropic') {
    return await callClaudeNative({ apiKey, model, messages: formattedMessages, temperature, maxTokens, systemPrompt, tools });
  }

  // 3. OpenAI-Compatible API (OpenRouter, DeepSeek, Mammouth, Custom)
  return await callOpenAICompatible({ provider: p, apiKey, model, baseUrl, messages: formattedMessages, temperature, maxTokens, tools });
}

// ============================================================================
// Traducteurs neutres <-> protocole (fonctions pures, testables sans réseau)
// ============================================================================

/** Forme neutre -> définitions d'outils au format OpenAI (function calling). */
function toolsToOpenAI(tools) {
  if (!Array.isArray(tools) || tools.length === 0) return undefined;
  return tools.map((t) => ({
    type: 'function',
    function: { name: t.name, description: t.description || '', parameters: t.parameters || { type: 'object', properties: {} } }
  }));
}

/** Historique neutre -> messages au format OpenAI (tool_calls / role 'tool'). */
function historyToOpenAI(messages) {
  return messages.map((m) => {
    if (m.role === 'assistant' && Array.isArray(m.tool_calls) && m.tool_calls.length > 0) {
      return {
        role: 'assistant',
        content: m.content || null,
        tool_calls: m.tool_calls.map((tc) => ({
          id: tc.id,
          type: 'function',
          function: { name: tc.name, arguments: JSON.stringify(tc.arguments || {}) }
        }))
      };
    }
    if (m.role === 'tool') {
      return { role: 'tool', tool_call_id: m.tool_call_id, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) };
    }
    return { role: m.role, content: m.content };
  });
}

/** Réponse OpenAI -> forme neutre { content, toolCalls }. */
function parseOpenAIResponse(data) {
  const msg = data.choices?.[0]?.message || {};
  const toolCalls = Array.isArray(msg.tool_calls)
    ? msg.tool_calls.map((tc) => {
        let args = {};
        try { args = JSON.parse(tc.function?.arguments || '{}'); } catch (e) { args = {}; }
        return { id: tc.id, name: tc.function?.name, arguments: args };
      })
    : [];
  return { content: msg.content || '', toolCalls };
}

/** Forme neutre -> définitions d'outils au format Anthropic. */
function toolsToClaude(tools) {
  if (!Array.isArray(tools) || tools.length === 0) return undefined;
  return tools.map((t) => ({ name: t.name, description: t.description || '', input_schema: t.parameters || { type: 'object', properties: {} } }));
}

/** Historique neutre -> messages au format Anthropic (blocs tool_use / tool_result). */
function historyToClaude(messages) {
  const out = [];
  for (const m of messages) {
    if (m.role === 'system') continue; // extrait séparément par l'appelant
    if (m.role === 'assistant' && Array.isArray(m.tool_calls) && m.tool_calls.length > 0) {
      const content = [];
      if (m.content) content.push({ type: 'text', text: m.content });
      for (const tc of m.tool_calls) content.push({ type: 'tool_use', id: tc.id, name: tc.name, input: tc.arguments || {} });
      out.push({ role: 'assistant', content });
      continue;
    }
    if (m.role === 'tool') {
      out.push({ role: 'user', content: [{ type: 'tool_result', tool_use_id: m.tool_call_id, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }] });
      continue;
    }
    out.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content });
  }
  if (out.length === 0) out.push({ role: 'user', content: 'Bonjour' });
  return out;
}

/** Réponse Anthropic -> forme neutre { content, toolCalls }. */
function parseClaudeResponse(data) {
  const blocks = Array.isArray(data.content) ? data.content : [];
  const text = blocks.filter((b) => b.type === 'text').map((b) => b.text).join('');
  const toolCalls = blocks.filter((b) => b.type === 'tool_use').map((b) => ({ id: b.id, name: b.name, arguments: b.input || {} }));
  return { content: text, toolCalls };
}

/** Forme neutre -> déclarations de fonctions au format Gemini. */
function toolsToGemini(tools) {
  if (!Array.isArray(tools) || tools.length === 0) return undefined;
  return [{ functionDeclarations: tools.map((t) => ({ name: t.name, description: t.description || '', parameters: t.parameters || { type: 'object', properties: {} } })) }];
}

/** Historique neutre -> contents au format Gemini (functionCall / functionResponse). */
function historyToGemini(messages) {
  const contents = [];
  for (const m of messages) {
    if (m.role === 'system') continue;
    if (m.role === 'assistant' && Array.isArray(m.tool_calls) && m.tool_calls.length > 0) {
      const parts = [];
      if (m.content) parts.push({ text: m.content });
      for (const tc of m.tool_calls) parts.push({ functionCall: { name: tc.name, args: tc.arguments || {} } });
      contents.push({ role: 'model', parts });
      continue;
    }
    if (m.role === 'tool') {
      let response;
      try { response = typeof m.content === 'string' ? JSON.parse(m.content) : m.content; } catch (e) { response = { result: m.content }; }
      contents.push({ role: 'user', parts: [{ functionResponse: { name: m.name, response } }] });
      continue;
    }
    contents.push({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] });
  }
  return contents;
}

/** Réponse Gemini -> forme neutre { content, toolCalls }. */
function parseGeminiResponse(data) {
  const parts = data.candidates?.[0]?.content?.parts || [];
  const text = parts.filter((p) => p.text).map((p) => p.text).join('');
  const toolCalls = parts.filter((p) => p.functionCall).map((p, i) => ({ id: `gemini-call-${i}`, name: p.functionCall.name, arguments: p.functionCall.args || {} }));
  return { content: text, toolCalls };
}

/**
 * OpenAI-Compatible Protocol (OpenRouter, DeepSeek, Mammouth, OpenAI, Local Ollama)
 */
async function callOpenAICompatible({ provider, apiKey, model, baseUrl, messages, temperature, maxTokens, tools }) {
  let endpoint = 'https://openrouter.ai/api/v1/chat/completions';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  if (provider === 'openrouter') {
    endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    headers['HTTP-Referer'] = 'https://softmed.com.co';
    headers['X-Title'] = 'SoftMed EHR Platform';
  } else if (provider === 'aimlapi' || provider === 'aiml') {
    endpoint = baseUrl ? (baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl.replace(/\/+$/, '')}/chat/completions`) : 'https://api.aimlapi.com/v1/chat/completions';
  } else if (provider === 'deepseek') {
    endpoint = 'https://api.deepseek.com/v1/chat/completions';
  } else if (provider === 'mammouth') {
    endpoint = baseUrl || 'https://api.mammouth.ai/v1/chat/completions';
  } else if (provider === 'custom' && baseUrl) {
    endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl.replace(/\/+$/, '')}/chat/completions`;
  }

  const payload = {
    model: model || (provider === 'openrouter' ? 'deepseek/deepseek-chat' : 'deepseek-chat'),
    messages: historyToOpenAI(messages),
    temperature: parseFloat(temperature) || 0.7,
    max_tokens: parseInt(maxTokens, 10) || 1500
  };
  const openaiTools = toolsToOpenAI(tools);
  if (openaiTools) {
    payload.tools = openaiTools;
    payload.tool_choice = 'auto';
  }

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
    const { content, toolCalls } = parseOpenAIResponse(data);
    return {
      content,
      toolCalls,
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
async function callGeminiNative({ apiKey, model, messages, temperature, maxTokens, tools }) {
  const modelName = (model || 'gemini-2.0-flash-001').replace(/^models\//, '');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const systemMsg = messages.find((m) => m.role === 'system');
  const systemInstruction = systemMsg ? { parts: [{ text: systemMsg.content }] } : null;

  const contents = historyToGemini(messages);
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
  const geminiTools = toolsToGemini(tools);
  if (geminiTools) {
    payload.tools = geminiTools;
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
    const { content, toolCalls } = parseGeminiResponse(data);

    return {
      content,
      toolCalls,
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
async function callClaudeNative({ apiKey, model, messages, temperature, maxTokens, systemPrompt, tools }) {
  const endpoint = 'https://api.anthropic.com/v1/messages';
  const modelName = model || 'claude-3-5-sonnet-20241022';

  // Extract system prompt from messages if not provided explicitly
  let extractedSystem = systemPrompt || '';
  for (const m of messages) {
    if (m.role === 'system') extractedSystem += (extractedSystem ? '\n\n' : '') + m.content;
  }

  const payload = {
    model: modelName,
    messages: historyToClaude(messages),
    max_tokens: parseInt(maxTokens, 10) || 1500,
    temperature: parseFloat(temperature) || 0.7
  };

  if (extractedSystem) {
    payload.system = extractedSystem;
  }
  const claudeTools = toolsToClaude(tools);
  if (claudeTools) {
    payload.tools = claudeTools;
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
    const { content, toolCalls } = parseClaudeResponse(data);

    return {
      content,
      toolCalls,
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
  callLLM,
  // Traducteurs exportés pour tests unitaires (fonctions pures, sans réseau)
  toolsToOpenAI, historyToOpenAI, parseOpenAIResponse,
  toolsToClaude, historyToClaude, parseClaudeResponse,
  toolsToGemini, historyToGemini, parseGeminiResponse
};
