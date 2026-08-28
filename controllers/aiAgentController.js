/**
 * Agent IA outillé (function calling) : prend des rendez-vous, retrouve un
 * patient par son code, et répond aux questions générales — en réutilisant le
 * LLM déjà configuré par le tenant dans Paramètres → Intelligence Artificielle
 * (clé générique multi-modèles comme OpenRouter/AIML API, ou clé native
 * Claude/Gemini/DeepSeek), sans dépendre d'un fournisseur particulier.
 *
 * Le modèle ne touche jamais la base directement : il ne peut que demander
 * l'exécution d'un outil (utils/aiAgentTools.js), exécuté ici via req.dbClient
 * (isolé par tenant et RLS), et ne reçoit en retour que le résultat de cet outil.
 */

const { callLLM } = require('../utils/llmClient');
const { AGENT_TOOLS, executeTool } = require('../utils/aiAgentTools');
const { getActiveLLMConfig } = require('./aiCopilotController');

const AGENT_SYSTEM_PROMPT = `Tu es l'assistant de prise de rendez-vous de la clinique, utilisé par le personnel d'accueil.

Règles :
- Pour proposer un rendez-vous, cherche d'abord les créneaux disponibles avec l'outil prévu — ne propose jamais un horaire sans l'avoir vérifié.
- N'appelle l'outil de création de rendez-vous qu'après confirmation explicite du patient, du praticien, de la date et de l'heure par l'utilisateur.
- Si le patient n'est identifié que par son nom, demande son code patient (ex: SM-4821) et vérifie-le avant de continuer.
- Tu peux répondre à des questions de santé générales (prévention, hygiène de vie, explication de termes médicaux courants), toujours en français, avec prudence et sans poser de diagnostic. Renvoie systématiquement vers un praticien pour tout cas particulier, symptôme précis ou urgence.
- Réponds de façon concise, professionnelle et directement utilisable par l'accueil.`;

const MAX_AGENT_TURNS = 4;

const handleAgentTurn = async (req, res) => {
  const { message, history } = req.body;
  const tenantId = req.user.tenant_id;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Le message est requis.' });
  }

  const activeLLM = await getActiveLLMConfig(tenantId);
  if (!activeLLM || !activeLLM.is_active || !activeLLM.api_key) {
    return res.status(422).json({
      error: "Aucun LLM actif n'est configuré pour cette clinique. Configurez-en un dans Paramètres → Intelligence Artificielle.",
      code: 'NO_LLM_CONFIGURED'
    });
  }

  let convo = Array.isArray(history) ? history.slice(-20) : [];
  convo.push({ role: 'user', content: message.trim() });

  const actions = [];

  try {
    for (let turn = 0; turn < MAX_AGENT_TURNS; turn++) {
      const result = await callLLM({
        provider: activeLLM.provider_name,
        apiKey: activeLLM.api_key,
        model: activeLLM.model_name,
        baseUrl: activeLLM.base_url,
        temperature: activeLLM.temperature,
        maxTokens: activeLLM.max_tokens,
        systemPrompt: AGENT_SYSTEM_PROMPT,
        messages: convo,
        tools: AGENT_TOOLS
      });

      if (!result.toolCalls || result.toolCalls.length === 0) {
        convo.push({ role: 'assistant', content: result.content });
        return res.status(200).json({
          success: true,
          answer: result.content,
          history: convo,
          actions,
          llm_provider: activeLLM.provider_name,
          llm_model: activeLLM.model_name
        });
      }

      convo.push({ role: 'assistant', content: result.content || '', tool_calls: result.toolCalls });

      for (const call of result.toolCalls) {
        let toolResult;
        try {
          toolResult = await executeTool(call.name, call.arguments, { dbClient: req.dbClient, tenantId });
          actions.push({ tool: call.name, arguments: call.arguments, success: true, result: toolResult });
        } catch (err) {
          toolResult = { error: err.message };
          actions.push({ tool: call.name, arguments: call.arguments, success: false, error: err.message });
        }
        convo.push({ role: 'tool', tool_call_id: call.id, name: call.name, content: JSON.stringify(toolResult) });
      }
    }

    return res.status(200).json({
      success: true,
      answer: "Je n'ai pas pu terminer cette demande en un nombre raisonnable d'étapes. Pouvez-vous reformuler ou préciser ?",
      history: convo,
      actions
    });
  } catch (err) {
    console.error('AI agent turn error:', err.message);
    return res.status(502).json({ error: "Échec de la communication avec le LLM : " + err.message, actions });
  }
};

module.exports = {
  handleAgentTurn
};
