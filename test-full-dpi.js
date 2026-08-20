const http = require('http');

function request(method, path, data, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(`http://localhost:5000${path}`);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ status: res.statusCode, body: parsed });
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject({ status: res.statusCode, body });
          }
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTest() {
  console.log('=== STARTING 360° DPI & PATIENT STATUS INTEGRATION TEST ===');
  
  // 1. Tenant Signup & Login
  console.log('1. Registering / Logging in test clinic...');
  const clinicSlug = 'test-dpi-' + Date.now();
  const signupRes = await request('POST', '/api/auth/register-tenant', {
    tenant_name: 'Clinique Test 360',
    tenant_slug: clinicSlug,
    first_name: 'Mamadou',
    last_name: 'Ndiaye',
    email: `admin@${clinicSlug}.sn`,
    password: 'Password123!',
    phone_number: '+221770000000'
  });
  const token = signupRes.token;
  console.log('-> Tenant created and logged in:', signupRes.tenant.name, 'Token acquired.');

  // 2. Patient Statuses
  console.log('\n2. Fetching patient statuses...');
  const statuses = await request('GET', '/api/patient-statuses', null, token);
  console.log(`-> Retrieved ${statuses.length} statuses:`, statuses.map(s => `${s.name} (${s.code})`).join(', '));

  console.log('2b. Creating a custom status...');
  const newStatus = await request('POST', '/api/patient-statuses', {
    name: 'Soins Intensifs Test',
    code: 'SOINS_INT_TEST',
    color_code: '#9b59b6',
    is_default: false
  }, token);
  console.log('-> Created custom status:', newStatus.name, 'ID:', newStatus.id);

  // 3. Register Patient with Status, Height, Weight, Observations
  console.log('\n3. Registering a patient with metrics...');
  const patientCode = 'PAT-' + Date.now().toString().slice(-4);
  const patient = await request('POST', '/api/patients', {
    first_name: 'Mamadou',
    last_name: 'Diallo',
    phone_number: '+22177' + Math.floor(1000000 + Math.random() * 9000000),
    gender: 'M',
    date_of_birth: '1988-04-15',
    blood_group: 'O+',
    height_cm: 180,
    weight_kg: 78,
    observations: 'Patient diabétique de type 2 sous metformine. Allergie aux sulfamides.',
    allergies: ['Sulfamides', 'Arachides'],
    status_id: newStatus.id,
    status: newStatus.name
  }, token);
  console.log('-> Registered patient:', patient.first_name, patient.last_name, 'ID:', patient.id);

  // 4. Update Patient
  console.log('\n4. Updating patient weight & observations...');
  const updatedPat = await request('PUT', `/api/patients/${patient.id}`, {
    weight_kg: 76.5,
    observations: 'Diabète type 2 équilibré. Poids en légère baisse. Bon moral.'
  }, token);
  console.log('-> Patient updated successfully. New weight:', updatedPat.weight_kg);

  // 5. Prescribe Treatment & Record Results Obtained
  console.log('\n5. Prescribing treatment with clinical outcome...');
  const treatment = await request('POST', `/api/patients/${patient.id}/treatments`, {
    treatment_name: 'Protocole Antipaludique CTA + Antipyrétique',
    treatment_type: 'Médicamenteux',
    start_date: '2026-08-15',
    end_date: '2026-08-18',
    dosage_instructions: 'Artéméther/Luméfantrine 20/120mg : 4 cp matin et soir pendant 3 jours + Paracétamol 1g si T° > 38.5°C',
    status: 'TERMINE',
    results_obtained: 'Apyrétique à H+36. Goutte épaisse de contrôle négative à J+3. Récupération complète sans effet secondaire.'
  }, token);
  console.log('-> Treatment created with outcome. ID:', treatment.id);

  // 6. Prescribe Lab Order & Record Results
  console.log('\n6. Prescribing and validating Lab Order...');
  const labOrder = await request('POST', `/api/patients/${patient.id}/lab-orders`, {
    test_name: 'Bilan Métabolique & HbA1c',
    category: 'Biochimie',
    priority: 'NORMALE',
    clinical_notes: 'Contrôle trimestriel diabète de type 2'
  }, token);
  console.log('-> Prescribed lab order:', labOrder.test_name, 'ID:', labOrder.id);

  console.log('6b. Validating lab results...');
  const validatedLab = await request('PUT', `/api/patients/lab-orders/${labOrder.id}`, {
    status: 'TERMINE',
    results_text: 'Glycémie à jeun: 1.05 g/L (Norme: 0.70-1.10)\nHbA1c: 6.2 % (Objectif < 7.0 %)\nCréatinine: 9.2 mg/L\nConclusion: Excellent équilibre glycémique sous traitement.',
    document_url: 'https://storage.softmed.sn/lab/bilan-diallo-2026.pdf'
  }, token);
  console.log('-> Lab results validated. Status:', validatedLab.status);

  // 7. Record Consultation
  console.log('\n7. Recording Consultation & Ordonnance...');
  const practitioners = await request('GET', '/api/practitioners', null, token);
  const practitionerId = practitioners[0].id;
  const consult = await request('POST', '/api/clinical/consultations', {
    patient_id: patient.id,
    practitioner_id: practitionerId,
    reason_for_visit: 'Consultation de suivi diabète et contrôle post-paludisme',
    diagnosis_text: 'Diabète type 2 équilibré, paludisme guéri',
    icd10_diagnosis_codes: ['E11.9', 'B54'],
    confidential_notes: 'Patient observant, continue le régime hygiéno-diététique.',
    vital_signs: {
      bp_systolic: 125,
      bp_diastolic: 80,
      temperature_c: 36.8
    },
    prescription: {
      items: [
        { drug_name: 'Metformine 850mg', dosage: '1 cp', frequency: '2 fois/jour', duration_days: 30, instructions: 'Au milieu des repas' }
      ]
    }
  }, token);
  console.log('-> Consultation created with Prescription code:', consult.prescription ? consult.prescription.prescription_code : 'N/A');

  // 8. Fetch Full 360° Dossier
  console.log('\n8. Fetching complete 360° DPI Dossier...');
  const dossier = await request('GET', `/api/patients/${patient.id}/dossier`, null, token);
  console.log('-> 360° Dossier loaded successfully!');
  console.log('   - Patient:', dossier.patient.first_name, dossier.patient.last_name, '| Statut:', dossier.patient.status_name);
  console.log('   - Constantes:', `${dossier.patient.height_cm}cm / ${dossier.patient.weight_kg}kg`);
  console.log('   - Traitements:', dossier.treatments.length, 'traitement(s)');
  console.log('   - Analyses:', dossier.labOrders.length, 'examen(s)');
  console.log('   - Consultations:', dossier.consultations.length, 'consultation(s)');
  console.log('   - RDV:', dossier.appointments.length, '| Séjours:', dossier.hospitalizations.length);

  console.log('\n=== ALL INTEGRATION TESTS PASSED 100% SUCCESSFULLY! ===');
}

runTest().catch(err => {
  console.error('TEST ERROR:', err);
  process.exit(1);
});
