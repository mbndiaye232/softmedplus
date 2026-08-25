const pool = require('../config/db');

// ============================================================================
// Clinical Knowledge Base & Medical Rule Engine (CDSS)
// ============================================================================
const CLINICAL_KNOWLEDGE = {
  DRUG_INTERACTIONS: [
    {
      drugs: ['anticoagulant', 'ains', 'ibuprofene', 'aspirine', 'ketoprofene', 'diclofenac'],
      severity: 'CRITIQUE / DANGER',
      description: 'Majoration majeure du risque hémorragique gastro-intestinal et systémique.',
      recommendation: 'Éviter formellement l\'association. Privilégier le Paracétamol pour l\'analgésie/antipyrèse.'
    },
    {
      drugs: ['metformine', 'produit de contraste', 'iode'],
      severity: 'ÉLEVÉE',
      description: 'Risque d\'acidose lactique grave en cas d\'insuffisance rénale aiguë.',
      recommendation: 'Arrêter la metformine 48h avant et après l\'injection de produit de contraste iodé.'
    },
    {
      drugs: ['amoxicilline', 'allopurinol'],
      severity: 'MODÉRÉE',
      description: 'Augmentation de la fréquence des éruptions cutanées (rashs).',
      recommendation: 'Surveillance cutanée étroite ou alternative antibiotique.'
    },
    {
      drugs: ['iec', 'sartan', 'spironolactone', 'potassium'],
      severity: 'ÉLEVÉE',
      description: 'Risque d\'hyperkaliémie sévère pouvant entraîner des troubles du rythme cardiaque.',
      recommendation: 'Contrôler la kaliémie et la créatininémie à J7.'
    }
  ],

  PROTOCOLS: {
    paludisme_grave: {
      title: 'Protocole Prise en Charge du Paludisme Grave (Recommandations OMS / PNLP)',
      first_line: 'Artésunate injectable (IV ou IM) : 2.4 mg/kg à H0, H12, H24 puis 1 fois/jour jusqu\'à relais oral.',
      femme_enceinte: 'Artésunate injectable indiqué à tous les trimestres de la grossesse sans restriction compte tenu du pronostic vital.',
      relais: 'Dès que le patient peut tolérer la voie orale (minimum 3 doses IV), relais complet de 3 jours par CTA (ex: Artéméther-Luméfantrine).'
    },
    paludisme_simple: {
      title: 'Protocole Paludisme Simple non compliqué',
      treatment: 'Combinaison Thérapeutique à base d\'Artémisinine (CTA) pendant 3 jours (ex: Artéméther + Luméfantrine ou Artésunate + Amodiaquine).'
    },
    hta_guidelines: {
      title: 'Prise en charge de l\'Hypertension Artérielle (HTA)',
      first_line: 'Bithérapie initiale recommandée (IEC ou ARA2 + Inhibiteur Calcique ou Diurétique thiazidique).',
      target: '< 130/80 mmHg si toléré, < 140/90 mmHg chez le sujet âgé.'
    },
    pediatric_amoxicillin: {
      title: 'Posologie Pédiatrique Usuelle - Amoxicilline',
      dosage: '50 à 80 mg/kg/jour répartis en 2 à 3 prises (max 100 mg/kg/jour pour otite moyenne aiguë récidivante).'
    }
  }
};

// 1. Process Voice / Text Clinical Query (Dossier-aware or General Medical)
const handleCopilotQuery = async (req, res) => {
  const { prompt, patient_id, context_mode } = req.body;
  const tenantId = req.user.tenant_id;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'La requête du médecin est requise.' });
  }

  const promptLower = prompt.toLowerCase();
  let patientDossier = null;
  let targetPatientId = patient_id;

  try {
    // A. If no patient_id provided, attempt to detect patient name in prompt
    if (!targetPatientId) {
      const patientMatch = await pool.query(`
        SELECT id, first_name, last_name, patient_code
        FROM patients
        WHERE tenant_id = $1 AND (
          LOWER(first_name || ' ' || last_name) = ANY(regexp_split_to_array($2, '\\s+')) OR
          $2 ILIKE '%' || first_name || '%' AND $2 ILIKE '%' || last_name || '%' OR
          $2 ILIKE '%' || patient_code || '%'
        )
        LIMIT 1
      `, [tenantId, promptLower]);

      if (patientMatch.rowCount > 0) {
        targetPatientId = patientMatch.rows[0].id;
      }
    }

    // B. If a patient is targeted, fetch their comprehensive dossier securely
    if (targetPatientId) {
      const pRes = await pool.query(`
        SELECT p.*, s.name as status_name, s.code as status_code,
               d.first_name as attending_first_name, d.last_name as attending_last_name, d.specialty_name as attending_doctor_specialty
        FROM patients p
        LEFT JOIN patient_statuses s ON p.status_id = s.id
        LEFT JOIN practitioners d ON p.attending_practitioner_id = d.id
        WHERE p.id = $1 AND p.tenant_id = $2
      `, [targetPatientId, tenantId]);

      if (pRes.rowCount > 0) {
        const patient = pRes.rows[0];

        // Fetch recent consultations
        let consultations = [];
        try {
          const cRes = await pool.query(`
            SELECT id, reason_for_visit as reason, diagnosis_text as diagnosis,
                   clinical_examination as notes, vital_signs as vitals, created_at as consultation_date
            FROM consultation_notes
            WHERE patient_id = $1 AND tenant_id = $2
            ORDER BY created_at DESC LIMIT 5
          `, [targetPatientId, tenantId]);
          consultations = cRes.rows;
        } catch (e) {
          console.warn('Consultation notes query warning:', e.message);
        }

        // Fetch active treatments / prescriptions
        let treatments = [];
        try {
          const tRes = await pool.query(`
            SELECT treatment_name as medication_name, dosage_instructions as dosage, start_date, end_date, status, results_obtained as notes
            FROM patient_treatments
            WHERE patient_id = $1 AND tenant_id = $2 AND (status = 'EN_COURS' OR status = 'ACTIVE')
            ORDER BY created_at DESC LIMIT 10
          `, [targetPatientId, tenantId]);
          treatments = tRes.rows;
        } catch (e) {
          console.warn('patient_treatments query warning:', e.message);
        }

        // Fetch lab orders
        let labOrders = [];
        try {
          const lRes = await pool.query(`
            SELECT test_name, category, status, results_text as results, created_at as order_date
            FROM patient_lab_orders
            WHERE patient_id = $1 AND tenant_id = $2
            ORDER BY created_at DESC LIMIT 5
          `, [targetPatientId, tenantId]);
          labOrders = lRes.rows;
        } catch (e) {
          console.warn('patient_lab_orders query warning:', e.message);
        }

        patientDossier = {
          patient,
          consultations,
          treatments,
          labOrders
        };
      }
    }

    // Check if active LLM is configured
    const activeLLM = await getActiveLLMConfig(tenantId);
    if (activeLLM && activeLLM.is_active && activeLLM.api_key) {
      try {
        let systemPrompt = activeLLM.system_prompt || 'Tu es un copilote médical IA expert pour la plateforme SoftMed. Tu assistes les médecins et soignants avec précision, rigueur clinique et bienveillance en français.';
        
        let contextMsg = '';
        if (patientDossier) {
          const p = patientDossier.patient;
          contextMsg = `\n\n[CONTEXTE DU DOSSIER PATIENT EN COURS]\n` +
            `- Patient : ${p.first_name} ${p.last_name} (${p.gender || 'N/A'}), Âge : ${calculateAge(p.date_of_birth) || 'Inconnu'} ans\n` +
            `- Allergies connues : ${safeStr(p.allergies) || 'Aucune connue'}\n` +
            `- Antécédents / Pathologies : ${safeStr(p.medical_history) || safeStr(p.notes) || 'Néant'}\n` +
            `- Traitements en cours : ${(patientDossier.treatments || []).map(t => `${t.medication_name} (${t.dosage || ''})`).join(', ') || 'Aucun'}\n` +
            `- Dernières consultations : ${(patientDossier.consultations || []).map(c => `[${new Date(c.consultation_date).toLocaleDateString()}] Motif: ${c.reason}, Diag: ${c.diagnosis}`).join(' | ') || 'Aucune'}\n`;
        }

        const llmResult = await callLLM({
          provider: activeLLM.provider_name,
          apiKey: activeLLM.api_key,
          model: activeLLM.model_name,
          baseUrl: activeLLM.base_url,
          temperature: activeLLM.temperature,
          maxTokens: activeLLM.max_tokens,
          systemPrompt,
          messages: [
            { role: 'user', content: `${prompt}${contextMsg}` }
          ]
        });

        if (llmResult && llmResult.content) {
          return res.status(200).json({
            success: true,
            prompt,
            patient_matched: patientDossier ? {
              id: patientDossier.patient.id,
              name: `${patientDossier.patient.first_name} ${patientDossier.patient.last_name}`,
              patient_code: patientDossier.patient.patient_code,
              age: calculateAge(patientDossier.patient.date_of_birth),
              gender: patientDossier.patient.gender
            } : null,
            answer: llmResult.content,
            speech_text: llmResult.content.replace(/[#*`_\[\]]/g, '').slice(0, 300),
            category: 'LLM_INTELLIGENCE',
            llm_provider: activeLLM.provider_name,
            llm_model: activeLLM.model_name,
            alerts: [],
            suggestions: []
          });
        }
      } catch (llmErr) {
        console.warn('Active LLM call failed, falling back to local CDSS engine:', llmErr.message);
      }
    }

    // C. Fallback: Local Clinical Reasoning & Rule-Based Response Synthesis
    const aiResponse = synthesizeClinicalAnswer(prompt, patientDossier);

    return res.status(200).json({
      success: true,
      prompt,
      patient_matched: patientDossier ? {
        id: patientDossier.patient.id,
        name: `${patientDossier.patient.first_name} ${patientDossier.patient.last_name}`,
        patient_code: patientDossier.patient.patient_code,
        age: calculateAge(patientDossier.patient.date_of_birth),
        gender: patientDossier.patient.gender
      } : null,
      ...aiResponse
    });

  } catch (err) {
    console.error('aiCopilotController error:', err);
    return res.status(500).json({ error: 'Erreur lors du traitement par l\'assistant IA : ' + err.message });
  }
};

// 2. Intelligent Medical Consultation Dictation Parser
const handleDictationConsultation = async (req, res) => {
  const { dictation_text, patient_id } = req.body;
  const tenantId = req.user.tenant_id;

  if (!dictation_text || !dictation_text.trim()) {
    return res.status(400).json({ error: 'Le texte de dictée vocale est requis.' });
  }

  try {
    let patient = null;
    if (patient_id) {
      const pRes = await pool.query('SELECT * FROM patients WHERE id = $1 AND tenant_id = $2', [patient_id, tenantId]);
      if (pRes.rowCount > 0) patient = pRes.rows[0];
    }

    // Check if active LLM can parse and structure consultation into JSON
    const activeLLM = await getActiveLLMConfig(tenantId);
    if (activeLLM && activeLLM.is_active && activeLLM.api_key) {
      try {
        const parsePrompt = `Tu es un assistant médical qui structure une dictée vocale de consultation en JSON strict valide.
Voici la dictée brute du médecin :
"""${dictation_text}"""

Retourne UNIQUEMENT un objet JSON avec cette structure exacte, sans markdown autour :
{
  "reason": "Motif de consultation",
  "diagnosis": "Diagnostic ou hypothèse diagnostique",
  "examination": "Compte-rendu de l'examen clinique",
  "vitals": {
    "blood_pressure": "ex: 12/8",
    "temperature": 37.5,
    "weight": 70,
    "pulse": 80
  },
  "prescriptions": [
    "Médicament 1 : posologie et durée",
    "Médicament 2 : posologie et durée"
  ]
}`;

        const llmResult = await callLLM({
          provider: activeLLM.provider_name,
          apiKey: activeLLM.api_key,
          model: activeLLM.model_name,
          baseUrl: activeLLM.base_url,
          temperature: 0.2,
          maxTokens: 1000,
          messages: [{ role: 'user', content: parsePrompt }]
        });

        if (llmResult && llmResult.content) {
          const cleanJson = llmResult.content.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          return res.status(200).json({
            success: true,
            raw_text: dictation_text,
            structured: parsed,
            llm_powered: true,
            provider: activeLLM.provider_name,
            model: activeLLM.model_name
          });
        }
      } catch (e) {
        console.warn('LLM dictation parsing error, fallback to heuristics:', e.message);
      }
    }

    const structuredConsultation = parseMedicalDictation(dictation_text, patient);

    return res.status(200).json({
      success: true,
      raw_text: dictation_text,
      structured: structuredConsultation,
      llm_powered: false
    });

  } catch (err) {
    console.error('handleDictationConsultation error:', err);
    return res.status(500).json({ error: 'Erreur lors de la structuration de la dictée : ' + err.message });
  }
};

// ============================================================================
// Clinical NLP & Reasoning Functions
// ============================================================================

function calculateAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const diff = Date.now() - birth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function safeStr(val) {
  if (!val) return '';
  if (Array.isArray(val)) return val.join(', ');
  if (typeof val === 'object') {
    try { return JSON.stringify(val); } catch(e) { return ''; }
  }
  return String(val);
}

function normalizeText(str) {
  return (str || '')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, ' ')
    .trim();
}

function synthesizeClinicalAnswer(prompt, dossier) {
  const rawQ = prompt.toLowerCase();
  const q = normalizeText(prompt);
  const alerts = [];
  const suggestions = [];
  let answerText = '';
  let speechText = '';
  let category = 'GENERAL_MEDICAL';

  // --------------------------------------------------------------------------
  // SCENARIO 1: DOSSIER-SPECIFIC QUERY (If a patient record is linked)
  // --------------------------------------------------------------------------
  if (dossier) {
    category = 'DOSSIER_INSIGHT';
    const p = dossier.patient;
    const patientName = `${p.first_name} ${p.last_name}`;
    const age = calculateAge(p.date_of_birth);
    const allergies = safeStr(p.allergies) || 'Aucune allergie connue répertoriée';
    const antecedents = safeStr(p.medical_history) || safeStr(p.notes) || 'Aucun antécédent particulier';
    const treatments = dossier.treatments || [];
    const consultations = dossier.consultations || [];

    // Check for Allergies & Antecedents
    if (q.includes('allergie') || q.includes('allergique') || q.includes('contre indication') || q.includes('antecedent') || q.includes('precaution')) {
      answerText = `### ⚠️ Allergies & Précautions pour **${patientName}** :\n\n` +
        `- **Allergies déclarées :** ${allergies}\n` +
        `- **Antécédents médicaux :** ${antecedents}\n` +
        `- **Traitements actifs :** ${treatments.length > 0 ? treatments.map(t => `${t.medication_name} (${t.dosage || ''})`).join(', ') : 'Aucun traitement chronique enregistré.'}`;
      speechText = `Pour ${patientName}, les allergies répertoriées sont : ${allergies}. Antécédents : ${antecedents}.`;
      const allergiesLower = allergies.toLowerCase();
      if (allergiesLower && allergiesLower !== 'aucune' && allergiesLower !== 'néant' && allergiesLower !== 'aucune allergie connue répertoriée') {
        alerts.push({ type: 'ALLERGY', message: `Attention : Allergie connue à "${allergies}".` });
      }
    }
    // Check for Vitals / Constantes
    else if (q.includes('constante') || q.includes('tension') || q.includes('pouls') || q.includes('temperature') || q.includes('glycemie') || q.includes('coeur') || q.includes('saturation') || q.includes('poids')) {
      const vitalsList = consultations.filter(c => c.vitals && Object.keys(c.vitals).length > 0);
      if (vitalsList.length > 0) {
        const latestVitals = vitalsList[0].vitals;
        answerText = `### 🩺 Dernières Constantes Vitales — **${patientName}**\n\n` +
          `- **Date du relevé :** ${new Date(vitalsList[0].consultation_date).toLocaleDateString('fr-FR')}\n` +
          `- **Tension Artérielle :** ${latestVitals.blood_pressure || latestVitals.bp || 'Non renseignée'}\n` +
          `- **Fréquence Cardiaque :** ${latestVitals.heart_rate || latestVitals.pulse ? `${latestVitals.heart_rate || latestVitals.pulse} bpm` : 'Non renseignée'}\n` +
          `- **Température :** ${latestVitals.temperature ? `${latestVitals.temperature} °C` : 'Non renseignée'}\n` +
          `- **Poids / Taille :** ${latestVitals.weight ? `${latestVitals.weight} kg` : ''} ${latestVitals.height ? `| ${latestVitals.height} cm` : ''}\n` +
          `- **Saturation O2 :** ${latestVitals.spo2 ? `${latestVitals.spo2} %` : 'Non renseignée'}`;
        speechText = `Pour ${patientName}, la tension relevée est de ${latestVitals.blood_pressure || latestVitals.bp || 'non renseignée'} et la température de ${latestVitals.temperature ? `${latestVitals.temperature} degrés` : 'non renseignée'}.`;
      } else {
        answerText = `### 🩺 Constantes Vitales — **${patientName}**\n\nAucune constante vitale numérique n'a été saisie pour ${patientName} lors des dernières consultations.`;
        speechText = `Aucune constante vitale récente n'a été enregistrée pour ce patient.`;
      }
    }
    // Treatment suggestion with Drug-Drug interaction check
    else if (q.includes('traitement') || q.includes('propose') || q.includes('prescrire') || q.includes('ordonnance') || q.includes('suggestion') || q.includes('medicament') || q.includes('recommand')) {
      category = 'TREATMENT_SUGGESTION';
      const interaction = checkDrugInteractions(q, treatments, p.allergies);
      
      let baseSuggestion = '';
      if (q.includes('paludisme') || q.includes('palu')) {
        baseSuggestion = `**Recommandation Paludisme :**\n- *Première intention :* CTA (ex: Artéméther 20mg + Luméfantrine 120mg, 4 comprimés en 2 prises/jour pendant 3 jours au cours des repas).\n- Antipyrétique : Paracétamol 1g toutes les 6h si fièvre > 38.5°C.`;
      } else if (q.includes('angine') || q.includes('pharyngite')) {
        baseSuggestion = safeStr(p.allergies).toLowerCase().includes('penicilline')
          ? `**Recommandation Angine (Allergie Pénicilline) :**\n- Macrolide : Azithromycine 500 mg/jour pendant 3 jours OU Clarithromycine 500 mg x2/jour pendant 5 jours.`
          : `**Recommandation Angine bactérienne :**\n- Amoxicilline 1g x 2/jour pendant 6 jours chez l'adulte.`;
      } else if (q.includes('hta') || q.includes('tension')) {
        baseSuggestion = `**Recommandation HTA :**\n- Bithérapie IEC/ARA2 + Inhibiteur Calcique (ex: Périndopril 5mg / Amlodipine 5mg 1 cp le matin).\n- Bilan rénal + ionogramme à prévoir.`;
      } else {
        baseSuggestion = `**Proposition Thérapeutique personnalisée :**\n- Vérifier la fonction rénale et hépatique.\n- Antalgique de 1ère intention : Paracétamol (500mg à 1g par prise, max 3g/jour).\n- Adapter selon le diagnostic clinique retenu.`;
      }

      answerText = `### 💡 Suggestions Thérapeutiques pour **${patientName}**\n\n` +
        `${baseSuggestion}\n\n` +
        `---\n` +
        `**🛡️ Analyse de Sécurité & Interactions Médicamenteuses :**\n` +
        (interaction.has_conflict ? `⚠️ **ALERTE :** ${interaction.details}` : `✅ Aucune interaction majeure ni contre-indication allergique détectée avec les traitements en cours.`);

      speechText = `Voici la suggestion thérapeutique pour ${patientName}. ${interaction.has_conflict ? 'Attention, une interaction a été détectée.' : 'Aucune interaction détectée avec ses traitements.'}`;
      if (interaction.has_conflict) {
        alerts.push({ type: 'INTERACTION', message: interaction.details });
      }
    }
    // General Summary / Résumé query or default dossier overview
    else {
      const lastConsult = consultations[0];
      answerText = `### 📋 Synthèse du Dossier Médical — **${patientName}** (${p.patient_code})\n\n` +
        `- **Profil :** ${p.gender === 'F' ? 'Femme' : 'Homme'}, ${age ? `${age} ans` : 'Âge non précisé'} | Statut : **${p.status_name || 'Interne'}**\n` +
        `- **Allergies :** ${allergies}\n` +
        `- **Antécédents :** ${antecedents}\n` +
        `- **Traitements en cours (${treatments.length}) :** ${treatments.length > 0 ? treatments.map(t => `\n  • ${t.medication_name} : ${t.dosage || 'posologie usuelle'}`).join('') : 'Aucun traitement actif'}\n` +
        `- **Dernière consultation :** ${lastConsult ? `${new Date(lastConsult.consultation_date).toLocaleDateString('fr-FR')} pour "${lastConsult.reason || 'Consultation'}" (Diagnostic : ${lastConsult.diagnosis || 'Non spécifié'})` : 'Aucune consultation antérieure enregistrée'}`;
      speechText = `Voici la synthèse pour ${patientName}, ${age ? `${age} ans` : ''}. Allergies : ${allergies}. Traitements en cours : ${treatments.length} médicament(s). Dernière consultation le ${lastConsult ? new Date(lastConsult.consultation_date).toLocaleDateString('fr-FR') : 'inconnue'}.`;
    }
  }

  // --------------------------------------------------------------------------
  // SCENARIO 2: GENERAL MEDICAL QUERY (Or no patient match)
  // --------------------------------------------------------------------------
  if (!answerText) {
    category = 'GENERAL_MEDICAL';

    if (q.includes('paludisme grave') || (q.includes('palu') && (q.includes('grave') || q.includes('femme enceinte')))) {
      const p = CLINICAL_KNOWLEDGE.PROTOCOLS.paludisme_grave;
      answerText = `### 🔬 ${p.title}\n\n` +
        `- **Traitement d'attaque d'urgence :** ${p.first_line}\n` +
        `- **Grossesse :** ${p.femme_enceinte}\n` +
        `- **Relais oral :** ${p.relais}\n` +
        `- **Mesures associées :** Voie veineuse, surveillance diurèse, glycémie (dépistage hypoglycémie sous quinine/artésunate), température et état neurologique.`;
      speechText = `Protocole du paludisme grave : Artésunate injectable 2.4 mg par kg à H0, H12, et H24, autorisé chez la femme enceinte. Relais par CTA orale dès amélioration.`;
    } else if (q.includes('amoxicilline') && (q.includes('enfant') || q.includes('pediatrie') || q.includes('kg') || q.includes('posologie'))) {
      // Calculate pediatric dosage if weight mentioned
      const weightMatch = q.match(/(\d+)\s*kg/i);
      let calc = '';
      if (weightMatch) {
        const weight = parseInt(weightMatch[1], 10);
        const dailyMin = weight * 50;
        const dailyMax = weight * 80;
        calc = `\n\n**Calcul personnalisé pour un enfant de ${weight} kg :**\n- Dose totale : **${dailyMin} mg à ${dailyMax} mg par jour**\n- Soit environ **${Math.round(dailyMin/3)} mg à ${Math.round(dailyMax/3)} mg par prise** (3 fois par jour) pendant 6 à 8 jours.`;
      }
      answerText = `### 💊 Posologie Pédiatrique de l'Amoxicilline\n\n` +
        `- **Dose standard :** 50 à 80 mg/kg/jour en 2 à 3 prises journalières.\n` +
        `- **Infections sévères / OMA récidivante :** jusqu'à 80-100 mg/kg/jour.${calc}`;
      speechText = `La posologie d'amoxicilline chez l'enfant est de 50 à 80 mg par kg et par jour, répartie en 3 prises.` + (weightMatch ? ` Pour un enfant de ${weightMatch[1]} kg, cela représente environ ${Math.round(parseInt(weightMatch[1])*50/3)} mg par prise.` : '');
    } else if (q.includes('methotrexate')) {
      answerText = `### 💊 Pharmacologie & Surveillance du Méthotrexate\n\n` +
        `- **Prise :** Prise **hebdomadaire STRICTE** (1 seul jour par semaine) dans les pathologies inflammatoires/rhumatologiques.\n` +
        `- **Supplémentation :** Acide folique obligatoire 48h après la prise de méthotrexate pour réduire la toxicité hématologique.\n` +
        `- **Effets indésirables majeurs :** Cytopénies (neutropénie, thrombopénie), hépatotoxicité, pneumopathie interstitielle, ulcérations buccales.\n` +
        `- **Surveillance :** NFS, bilan hépatique (ALAT/ASAT) et créatininémie réguliers. Contre-indiqué chez la femme enceinte (tératogène).`;
      speechText = `Le méthotrexate se prend impérativement une seule fois par semaine avec supplémentation en acide folique. Surveillance NFS et bilan hépatique indispensable.`;
    } else if (q.includes('hta') || q.includes('hypertension')) {
      const p = CLINICAL_KNOWLEDGE.PROTOCOLS.hta_guidelines;
      answerText = `### 🩺 ${p.title}\n\n` +
        `- **Recommandation initiale :** ${p.first_line}\n` +
        `- **Cibles tensionnelles :** ${p.target}\n` +
        `- **Règles hygiéno-diététiques :** Réduction sodée (< 5g/j), activité physique régulière, contrôle pondéral.`;
      speechText = `Pour l'hypertension artérielle, la bithérapie initiale IEC ou ARA2 avec inhibiteur calcique est recommandée, avec une cible inférieure à 130 sur 80.`;
    } else {
      answerText = `### 🤖 Assistant Clinique Médical SoftMed\n\n` +
        `J'ai bien analysé votre question concernant : *"${prompt}"*.\n\n` +
        `**Recommandations de bonne pratique :**\n` +
        `- Veillez à confronter les symptômes au contexte épidémiologique et aux antécédents du patient.\n` +
        `- En cas de doute thérapeutique, reportez-vous aux protocoles nationaux (MSAS) et aux référentiels OMS/HAS.\n` +
        `- N'hésitez pas à ouvrir le dossier d'un patient pour obtenir une analyse ciblée sur ses allergies et traitements actifs.`;
      speechText = `J'ai bien pris en compte votre question médicale. Vous pouvez également ouvrir le dossier d'un patient pour une aide personnalisée.`;
    }
  }

  // Quick Action Chips suggestions
  if (dossier) {
    suggestions.push(`Vérifier les allergies de ${dossier.patient.first_name}`);
    suggestions.push(`Dernières constantes vitales`);
    suggestions.push(`Proposer ordonnance adaptée`);
  } else {
    suggestions.push(`Protocole paludisme grave`);
    suggestions.push(`Posologie amoxicilline enfant 15kg`);
    suggestions.push(`Interactions AINS et anticoagulants`);
  }

  return {
    category,
    response_markdown: answerText,
    response_speech: speechText,
    alerts,
    quick_suggestions: suggestions
  };
}

function checkDrugInteractions(prompt, currentTreatments = [], patientAllergies = '') {
  const p = (prompt || '').toLowerCase();
  const allergies = safeStr(patientAllergies).toLowerCase();
  
  // Check against active patient treatments
  for (const rule of CLINICAL_KNOWLEDGE.DRUG_INTERACTIONS) {
    const hasPromptDrug = rule.drugs.some(d => p.includes(d));
    const hasCurrentDrug = currentTreatments.some(t => {
      const name = safeStr(t.medication_name).toLowerCase();
      return rule.drugs.some(d => name.includes(d));
    });

    if (hasPromptDrug && hasCurrentDrug) {
      return {
        has_conflict: true,
        severity: rule.severity,
        details: `${rule.description} Recommandation : ${rule.recommendation}`
      };
    }
  }

  // Check against known allergies
  if (allergies && allergies !== 'aucune' && allergies !== 'néant' && allergies !== 'aucune allergie connue répertoriée') {
    if (p.includes('amoxicilline') || p.includes('augmentin') || p.includes('pénicilline') || p.includes('penicilline')) {
      if (allergies.includes('penicilline') || allergies.includes('amoxicilline') || allergies.includes('bétalactamine') || allergies.includes('betalactamine')) {
        return {
          has_conflict: true,
          severity: 'DANGER ALLERGIE',
          details: `Le patient présente une ALLERGIE CONNUE aux pénicillines/bêtalactamines (${safeStr(patientAllergies)}). Risque de choc anaphylactique.`
        };
      }
    }
  }

  return { has_conflict: false };
}

function parseMedicalDictation(rawText, patient) {
  const text = rawText.trim();
  const lines = text.split(/[.;\n]+/).map(s => s.trim()).filter(Boolean);

  let reason = '';
  let diagnosis = '';
  let examination = '';
  const prescriptions = [];
  const vitals = {};

  // Extract BP
  const bpMatch = text.match(/tension\s*(?:à|de)?\s*(\d{2,3}[\/.,]\d{1,2})/i);
  if (bpMatch) vitals.blood_pressure = bpMatch[1].replace(',', '/').replace('.', '/');

  // Extract Temperature
  const tempMatch = text.match(/température\s*(?:à|de)?\s*(\d{2}(?:[.,]\d)?)/i);
  if (tempMatch) vitals.temperature = parseFloat(tempMatch[1].replace(',', '.'));

  // Extract Weight
  const weightMatch = text.match(/poids\s*(?:de)?\s*(\d{1,3})\s*kg/i);
  if (weightMatch) vitals.weight = parseFloat(weightMatch[1]);

  // Keyword extraction heuristic
  for (const line of lines) {
    const l = line.toLowerCase();
    if (!reason && (l.includes('motif') || l.includes('consulte pour') || l.includes('vient pour') || l.includes('présente depuis') || l.includes('céphalées') || l.includes('fièvre') || l.includes('douleur'))) {
      reason = line.replace(/^(motif|motif de consultation\s*:?)/i, '').trim();
    } else if (!diagnosis && (l.includes('diagnostic') || l.includes('conclusion') || l.includes('accès') || l.includes('paludisme') || l.includes('gastro') || l.includes('angine') || l.includes('bronchite') || l.includes('hypertension') || l.includes('diabète'))) {
      diagnosis = line.replace(/^(diagnostic|conclusion\s*:?)/i, '').trim();
    } else if (l.includes('ordonnance') || l.includes('prescris') || l.includes('traitement') || l.includes('comprimé') || l.includes('gélule') || l.includes('sirop') || l.includes('injectable') || l.includes('mg') || l.includes('paracétamol') || l.includes('amoxicilline')) {
      prescriptions.push(line.replace(/^(ordonnance|prescription|traitement\s*:?)/i, '').trim());
    } else {
      if (examination) examination += ' ';
      examination += line;
    }
  }

  if (!reason) reason = 'Consultation de médecine générale';
  if (!diagnosis) diagnosis = reason;
  if (!examination) examination = text;

  return {
    reason,
    diagnosis,
    examination,
    vitals,
    prescriptions: prescriptions.length > 0 ? prescriptions : ['Paracétamol 1g : 1 comprimé si douleur/fièvre (max 3g/jour)']
  };
}

const { callLLM } = require('../utils/llmClient');

// Auto-migrate AI configuration table
async function ensureAIConfigsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ai_llm_configs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
        provider_name VARCHAR(50) NOT NULL DEFAULT 'openrouter',
        api_key TEXT NOT NULL,
        model_name VARCHAR(100) NOT NULL DEFAULT 'deepseek/deepseek-chat',
        base_url TEXT,
        is_active BOOLEAN DEFAULT false,
        temperature NUMERIC(3,2) DEFAULT 0.7,
        max_tokens INTEGER DEFAULT 1500,
        system_prompt TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } catch (err) {
    console.error('Error ensuring ai_llm_configs table:', err.message);
  }
}
ensureAIConfigsTable();

// Helper to fetch active LLM config
async function getActiveLLMConfig(tenantId) {
  try {
    const res = await pool.query(
      `SELECT * FROM ai_llm_configs WHERE (tenant_id = $1 OR tenant_id IS NULL) AND is_active = true ORDER BY (tenant_id = $1) DESC, updated_at DESC LIMIT 1`,
      [tenantId]
    );
    if (res.rowCount > 0) return res.rows[0];
  } catch (e) {}
  return null;
}

// ----------------------------------------------------------------------------
// AI Configuration Endpoints
// ----------------------------------------------------------------------------

const getAIConfig = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const result = await pool.query(
      `SELECT id, provider_name, model_name, base_url, is_active, temperature, max_tokens, system_prompt, 
              CASE WHEN api_key IS NOT NULL AND length(api_key) > 6 
                   THEN substring(api_key from 1 for 4) || '••••••••' || substring(api_key from length(api_key)-2) 
                   ELSE '' END as masked_key,
              updated_at
       FROM ai_llm_configs 
       WHERE tenant_id = $1 OR tenant_id IS NULL
       ORDER BY (tenant_id = $1) DESC, updated_at DESC LIMIT 1`,
      [tenantId]
    );

    if (result.rowCount === 0) {
      return res.json({
        configured: false,
        config: {
          provider_name: 'openrouter',
          model_name: 'deepseek/deepseek-chat',
          base_url: '',
          is_active: false,
          temperature: 0.7,
          max_tokens: 1500,
          system_prompt: 'Tu es un assistant médical IA expert et bienveillant pour la plateforme de santé SoftMed. Tu rédiges en français clair, précis et professionnel.'
        }
      });
    }

    return res.json({
      configured: true,
      config: result.rows[0]
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const saveAIConfig = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { provider_name, api_key, model_name, base_url, is_active, temperature, max_tokens, system_prompt } = req.body;

    if (!provider_name) {
      return res.status(400).json({ error: 'Le fournisseur IA est obligatoire.' });
    }

    // Check existing config
    const existRes = await pool.query(`SELECT id, api_key FROM ai_llm_configs WHERE tenant_id = $1 LIMIT 1`, [tenantId]);

    let finalKey = api_key;
    if (existRes.rowCount > 0 && (!api_key || api_key.includes('••••'))) {
      finalKey = existRes.rows[0].api_key; // Keep existing key if not modified
    }

    if (!finalKey || !finalKey.trim()) {
      return res.status(400).json({ error: 'La clé API est requise.' });
    }

    let saved;
    if (existRes.rowCount > 0) {
      saved = await pool.query(
        `UPDATE ai_llm_configs 
         SET provider_name = $1, api_key = $2, model_name = $3, base_url = $4, is_active = $5, 
             temperature = $6, max_tokens = $7, system_prompt = $8, updated_at = NOW()
         WHERE id = $9
         RETURNING id, provider_name, model_name, is_active, updated_at`,
        [provider_name, finalKey.trim(), model_name || 'deepseek/deepseek-chat', base_url || '', is_active !== false, parseFloat(temperature) || 0.7, parseInt(max_tokens || 1500, 10), system_prompt || '', existRes.rows[0].id]
      );
    } else {
      saved = await pool.query(
        `INSERT INTO ai_llm_configs (tenant_id, provider_name, api_key, model_name, base_url, is_active, temperature, max_tokens, system_prompt)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id, provider_name, model_name, is_active, updated_at`,
        [tenantId, provider_name, finalKey.trim(), model_name || 'deepseek/deepseek-chat', base_url || '', is_active !== false, parseFloat(temperature) || 0.7, parseInt(max_tokens || 1500, 10), system_prompt || '']
      );
    }

    return res.json({
      success: true,
      message: 'Configuration IA enregistrée avec succès !',
      config: saved.rows[0]
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const testAIConnection = async (req, res) => {
  const startTime = Date.now();
  try {
    const tenantId = req.user.tenant_id;
    let { provider_name, api_key, model_name, base_url } = req.body;

    if (!api_key || api_key.includes('••••')) {
      const existRes = await pool.query(`SELECT api_key FROM ai_llm_configs WHERE tenant_id = $1 LIMIT 1`, [tenantId]);
      if (existRes.rowCount > 0) {
        api_key = existRes.rows[0].api_key;
      }
    }

    if (!api_key) {
      return res.status(400).json({ success: false, error: 'Veuillez saisir une clé API valide pour tester.' });
    }

    const testPrompt = [
      { role: 'system', content: 'Tu es le moteur IA de SoftMed. Réponds en une seule phrase courte.' },
      { role: 'user', content: 'Présente-toi brièvement et confirme que la liaison fonctionne.' }
    ];

    const result = await callLLM({
      provider: provider_name || 'openrouter',
      apiKey: api_key,
      model: model_name || 'deepseek/deepseek-chat',
      baseUrl: base_url,
      messages: testPrompt,
      temperature: 0.5,
      maxTokens: 100
    });

    const latency = Date.now() - startTime;

    return res.json({
      success: true,
      latency_ms: latency,
      provider: result.provider,
      model: result.model,
      reply: result.content.trim(),
      message: `Connexion réussie avec ${result.provider} (${result.model}) en ${latency} ms !`
    });
  } catch (err) {
    const latency = Date.now() - startTime;
    return res.status(400).json({
      success: false,
      latency_ms: latency,
      error: err.message
    });
  }
};

const toggleAI = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { is_active } = req.body;

    const result = await pool.query(
      `UPDATE ai_llm_configs 
       SET is_active = $1, updated_at = NOW()
       WHERE tenant_id = $2
       RETURNING id, is_active, provider_name, model_name`,
      [is_active === true, tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Aucune configuration IA trouvée. Enregistrez une clé API d\'abord.' });
    }

    return res.json({
      success: true,
      is_active: result.rows[0].is_active,
      message: result.rows[0].is_active ? 'Intelligence Artificielle activée !' : 'Intelligence Artificielle désactivée (Mode Règles Locales actif).'
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  handleCopilotQuery,
  handleDictationConsultation,
  getAIConfig,
  saveAIConfig,
  testAIConnection,
  toggleAI,
  getActiveLLMConfig
};

