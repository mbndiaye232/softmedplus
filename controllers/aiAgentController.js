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

Nous sommes aujourd'hui {TODAY}. Sers-t'en pour interpréter « demain », « jeudi prochain » : calcule la date réelle, et ne propose jamais une date passée.

Règles :
- Pour proposer un rendez-vous, cherche d'abord les créneaux disponibles avec l'outil prévu — ne propose jamais un horaire sans l'avoir vérifié.
- N'appelle l'outil de création de rendez-vous qu'après confirmation explicite du patient, du praticien, de la date et de l'heure par l'utilisateur.
- Si le patient n'est identifié que par son nom, demande son code patient (ex: SM-4821) et vérifie-le avant de continuer.
- Si la personne n'a pas de code patient (nouveau patient), rassemble prénom, nom, téléphone, sexe et date de naissance, puis crée le dossier minimal avec l'outil prévu avant de proposer un rendez-vous. Ne devine jamais la date de naissance : demande-la si elle manque.
- Tu peux répondre à des questions de santé générales (prévention, hygiène de vie, explication de termes médicaux courants), toujours en français, avec prudence et sans poser de diagnostic. Renvoie systématiquement vers un praticien pour tout cas particulier, symptôme précis ou urgence.
- Pour annuler ou reporter : liste d'abord les rendez-vous du patient, fais préciser lequel, récapitule-le (date, heure, praticien) et n'agis qu'après un accord explicite. Une annulation ne se devine jamais.
- Après un report, annonce le nouvel horaire confirmé. Si le créneau visé est occupé, propose-en un autre plutôt que d'insister.
- Réponds de façon concise, professionnelle et directement utilisable par l'accueil.`;

const MAX_AGENT_TURNS = 4;

/**
 * Date du jour, à donner au modèle pour qu'il puisse résoudre « demain »,
 * « jeudi prochain »… Un LLM n'a aucune notion de la date courante : sans cet
 * ancrage il propose des dates arbitraires, souvent passées.
 * Fuseau du Sénégal explicite : le serveur (Render) tourne en UTC.
 */
function todayInDakar() {
  const now = new Date();
  const jour = now.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Dakar'
  });
  const heure = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Dakar'
  });
  const iso = now.toLocaleDateString('sv-SE', { timeZone: 'Africa/Dakar' }); // sv-SE => AAAA-MM-JJ
  return `${jour} (${iso}), il est ${heure}`;
}

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
        systemPrompt: AGENT_SYSTEM_PROMPT.replace('{TODAY}', todayInDakar()),
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
          console.error(`AI agent tool call failed (${call.name}):`, err.message);
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

// ============================================================================
// Agent du PORTAIL PUBLIC (patients non authentifiés)
// ============================================================================

const pool = require('../config/db');
const { PUBLIC_AGENT_TOOLS, executePublicTool } = require('../utils/publicAgentTools');

const PUBLIC_AGENT_SYSTEM_PROMPT = `Tu es l'assistant de prise de rendez-vous en ligne de la clinique {CLINIC_NAME}. Tu parles directement au patient, en français, avec courtoisie et concision.

Nous sommes aujourd'hui {TODAY}. Sers-t'en pour interpréter « demain », « jeudi prochain », « la semaine prochaine » : calcule la date réelle, et ne propose jamais une date passée.

Règles impératives :
- Demande TOUJOURS le motif de la consultation. C'est lui qui détermine le spécialiste : sans motif, tu ne peux pas orienter le patient correctement.
- Une fois le motif connu, appelle l'outil qui liste les praticiens et leurs spécialités, et retiens celui dont la spécialité correspond. Ne devine jamais : un motif « cardiologie » ne doit pas aboutir chez un ophtalmologue. Si aucune spécialité ne correspond, propose un médecin généraliste ou dis franchement que la clinique ne propose pas cette spécialité.
- Transmets ensuite l'identifiant du praticien retenu ET celui de la prestation à la recherche de créneaux puis à la préparation, pour que l'horaire, la durée et le tarif soient cohérents avec le motif.
- Vérifie toujours les créneaux libres avec l'outil prévu avant de proposer un horaire. N'invente jamais une disponibilité.
- Si le patient dit avoir déjà un dossier, demande son code patient (ex: SM-4821) PUIS son prénom et son nom, et vérifie les deux ensemble. Ne révèle jamais d'information sur un dossier tant que l'identité n'est pas confirmée.
- Si le patient n'a pas de code, traite-le comme un nouveau patient : il te faut son prénom, son nom et son téléphone. Préviens qu'un acompte de 2 000 FCFA est demandé pour une première consultation.
- Quand tout est réuni et confirmé, appelle l'outil de préparation, puis annonce clairement le récapitulatif (date, heure, praticien, acompte éventuel) et invite le patient à confirmer d'un clic. Tu ne réserves pas toi-même : c'est le patient qui valide.
- Tu peux répondre à des questions générales sur la clinique et à des questions de santé courantes (prévention, hygiène de vie), sans jamais poser de diagnostic ni proposer de traitement. Pour tout symptôme précis ou toute urgence, invite à consulter un praticien ou à appeler les secours.
- Ne demande jamais de données médicales sensibles : tu prends des rendez-vous, tu ne fais pas de consultation.
- Pour annuler ou reporter un rendez-vous, il faut IMPÉRATIVEMENT le code patient ET le prénom et nom : sans cette double vérification, tu ne peux ni afficher ni modifier quoi que ce soit. Liste d'abord ses rendez-vous, fais préciser lequel, récapitule-le et n'agis qu'après un accord explicite du patient. Une annulation est définitive : ne la déclenche jamais sur une simple allusion.
- Écris en texte simple, jamais en markdown : pas d'astérisques, pas de dièses, pas de tirets de liste. Tes réponses sont lues à voix haute par une synthèse vocale, qui prononcerait ces symboles littéralement. Pour énumérer, fais une phrase ou numérote en toutes lettres.`;

const handlePublicAgentTurn = async (req, res) => {
  const { slug, message, history } = req.body;

  if (!slug || !message || !message.trim()) {
    return res.status(400).json({ error: 'Clinique et message requis.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Portail public : pas de JWT, donc pas de contexte RLS posé par tenantIsolator.
    // On bascule en bypass puis on borne TOUTES les requêtes au tenant résolu depuis
    // le slug de l'URL — jamais depuis un paramètre choisi par le modèle.
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tRes = await client.query(`SELECT id, name FROM tenants WHERE LOWER(slug) = LOWER($1) AND is_active = true LIMIT 1`, [slug.trim()]);
    if (tRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Clinique introuvable.' });
    }
    const tenantId = tRes.rows[0].id;
    const clinicName = tRes.rows[0].name;

    const cfg = await client.query(
      `SELECT * FROM ai_llm_configs WHERE tenant_id = $1 AND is_active = true ORDER BY updated_at DESC LIMIT 1`,
      [tenantId]
    );
    if (cfg.rowCount === 0 || !cfg.rows[0].api_key) {
      await client.query('COMMIT');
      return res.status(422).json({
        error: "L'assistant conversationnel n'est pas disponible pour cette clinique.",
        code: 'NO_LLM_CONFIGURED'
      });
    }
    const activeLLM = cfg.rows[0];

    let convo = Array.isArray(history) ? history.slice(-20) : [];
    convo.push({ role: 'user', content: message.trim() });

    const actions = [];
    let bookingParams = null;

    for (let turn = 0; turn < MAX_AGENT_TURNS; turn++) {
      const result = await callLLM({
        provider: activeLLM.provider_name,
        apiKey: activeLLM.api_key,
        model: activeLLM.model_name,
        baseUrl: activeLLM.base_url,
        temperature: activeLLM.temperature,
        maxTokens: activeLLM.max_tokens,
        systemPrompt: PUBLIC_AGENT_SYSTEM_PROMPT
          .replace('{CLINIC_NAME}', clinicName)
          .replace('{TODAY}', todayInDakar()),
        messages: convo,
        tools: PUBLIC_AGENT_TOOLS
      });

      if (!result.toolCalls || result.toolCalls.length === 0) {
        convo.push({ role: 'assistant', content: result.content });
        await client.query('COMMIT');
        return res.status(200).json({ success: true, answer: result.content, history: convo, actions, booking_params: bookingParams });
      }

      convo.push({ role: 'assistant', content: result.content || '', tool_calls: result.toolCalls });

      for (const call of result.toolCalls) {
        let toolResult;
        try {
          toolResult = await executePublicTool(call.name, call.arguments, { dbClient: client, tenantId });
          if (call.name === 'preparer_reservation' && toolResult.ready) {
            bookingParams = toolResult.booking_params;
          }
          actions.push({ tool: call.name, success: true, result: toolResult });
        } catch (err) {
          console.error(`Public AI agent tool failed (${call.name}):`, err.message);
          toolResult = { error: err.message };
          actions.push({ tool: call.name, success: false, error: err.message });
        }
        convo.push({ role: 'tool', tool_call_id: call.id, name: call.name, content: JSON.stringify(toolResult) });
      }
    }

    await client.query('COMMIT');
    return res.status(200).json({
      success: true,
      answer: "Je n'ai pas réussi à aboutir. Pouvez-vous reformuler votre demande ?",
      history: convo,
      actions,
      booking_params: bookingParams
    });
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch (e) {}
    console.error('Public AI agent turn error:', err.message);
    return res.status(502).json({ error: "L'assistant est momentanément indisponible." });
  } finally {
    client.release();
  }
};

module.exports = {
  handleAgentTurn,
  handlePublicAgentTurn
};
