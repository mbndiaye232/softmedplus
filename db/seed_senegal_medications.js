const pool = require('../config/db');

// Catalogue officiel des médicaments courants du marché sénégalais classés par spécialité médicale
const SENEGAL_MEDICATIONS = [
  // =========================================================================
  // 1. MÉDECINE GÉNÉRALE & SOINS GÉNÉRAUX / ANTALGIQUES / ANTIBIOTIQUES USUELS (GENERAL / MED-GEN)
  // Disponibles pour TOUTES les spécialités (Cardiologie, Pédiatrie, Gynécologie, etc.)
  // =========================================================================
  {
    sku: 'PARA-1G-CP',
    name: 'Paracétamol 1g (Doliprane / Efferalgan)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé toutes les 8h si douleur/fièvre',
    minimum_threshold_alert: 20,
    unit_cost_price: 800,
    selling_price: 1200,
    quantity: 150
  },
  {
    sku: 'PARA-500-CP',
    name: 'Paracétamol 500mg comprimé',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 à 2 comprimés toutes les 6h',
    minimum_threshold_alert: 15,
    unit_cost_price: 500,
    selling_price: 800,
    quantity: 120
  },
  {
    sku: 'IBU-400-CP',
    name: 'Ibuprofène 400mg (Advil / Antarène)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé au cours des repas (max 3/jour)',
    minimum_threshold_alert: 15,
    unit_cost_price: 1200,
    selling_price: 1800,
    quantity: 80
  },
  {
    sku: 'SPAS-80-CP',
    name: 'Spasfon (Phloroglucinol 80mg)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '2 comprimés au moment des crises spasmodiques',
    minimum_threshold_alert: 15,
    unit_cost_price: 1500,
    selling_price: 2200,
    quantity: 90
  },
  {
    sku: 'TRAM-50-GEL',
    name: 'Tramadol 50mg (Topalgic)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 gélule matin et soir en cas de douleur intense',
    minimum_threshold_alert: 10,
    unit_cost_price: 2000,
    selling_price: 3000,
    quantity: 50
  },
  {
    sku: 'AMOX-1G-CP',
    name: 'Amoxicilline 1g (Clamoxyl)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé matin et soir pendant 7 jours',
    minimum_threshold_alert: 20,
    unit_cost_price: 1800,
    selling_price: 2800,
    quantity: 100
  },
  {
    sku: 'AUGM-1G-CP',
    name: 'Augmentin 1g/125mg (Amox + Acide Clavulanique)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé matin et soir au début des repas',
    minimum_threshold_alert: 15,
    unit_cost_price: 4500,
    selling_price: 6500,
    quantity: 60
  },
  {
    sku: 'CIPRO-500-CP',
    name: 'Ciprofloxacine 500mg (Ciflox)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé 2 fois par jour pendant 5 à 7 jours',
    minimum_threshold_alert: 12,
    unit_cost_price: 2200,
    selling_price: 3500,
    quantity: 55
  },
  {
    sku: 'AZITH-500-CP',
    name: 'Azithromycine 500mg (Zithromax)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour pendant 3 jours',
    minimum_threshold_alert: 10,
    unit_cost_price: 2800,
    selling_price: 4200,
    quantity: 45
  },
  {
    sku: 'FLAG-500-CP',
    name: 'Métronidazole 500mg (Flagyl)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé 3 fois par jour pendant 7 jours',
    minimum_threshold_alert: 15,
    unit_cost_price: 900,
    selling_price: 1500,
    quantity: 75
  },
  {
    sku: 'COART-80-CP',
    name: 'Coartem 80/480mg (Artéméther / Luméfantrine Adulte)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 cp matin et soir pendant 3 jours au repas',
    minimum_threshold_alert: 25,
    unit_cost_price: 2500,
    selling_price: 3800,
    quantity: 110
  },
  {
    sku: 'OMEP-20-GEL',
    name: 'Oméprazole 20mg (Mopral)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 gélule le matin à jeun pendant 14 à 28 jours',
    minimum_threshold_alert: 15,
    unit_cost_price: 1600,
    selling_price: 2600,
    quantity: 85
  },
  {
    sku: 'GAVIS-SACHET',
    name: 'Gaviscon suspension buvable en sachet',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 sachet après les repas et au coucher',
    minimum_threshold_alert: 12,
    unit_cost_price: 2100,
    selling_price: 3200,
    quantity: 65
  },
  {
    sku: 'ZYRTEC-10-CP',
    name: 'Cétirizine 10mg (Zyrtec / Alairgix)',
    category: 'MEDICATION',
    target_specialty: 'GENERAL',
    unit: 'BOITE',
    default_dosage: '1 comprimé le soir au coucher',
    minimum_threshold_alert: 10,
    unit_cost_price: 1400,
    selling_price: 2200,
    quantity: 50
  },
  {
    sku: 'SERUM-SAL-500',
    name: 'Sérum Salé Isotonique 0.9% 500ml',
    category: 'CONSUMABLE',
    target_specialty: 'GENERAL',
    unit: 'FLACON',
    default_dosage: 'En perfusion intraveineuse selon prescription',
    minimum_threshold_alert: 30,
    unit_cost_price: 700,
    selling_price: 1200,
    quantity: 200
  },
  {
    sku: 'SERUM-GLUC-500',
    name: 'Sérum Glucosé 5% 500ml',
    category: 'CONSUMABLE',
    target_specialty: 'GENERAL',
    unit: 'FLACON',
    default_dosage: 'En perfusion intraveineuse selon protocole',
    minimum_threshold_alert: 30,
    unit_cost_price: 700,
    selling_price: 1200,
    quantity: 180
  },
  {
    sku: 'BETA-DERM-125',
    name: 'Bétadine dermique 10% 125ml',
    category: 'CONSUMABLE',
    target_specialty: 'GENERAL',
    unit: 'FLACON',
    default_dosage: 'Antisepsie cutanée locale pure ou diluée',
    minimum_threshold_alert: 15,
    unit_cost_price: 1600,
    selling_price: 2400,
    quantity: 70
  },

  // =========================================================================
  // 2. CARDIOLOGIE & HYPERTENSION / CARDIOVASCULAIRE (CARDIO)
  // =========================================================================
  {
    sku: 'AMLO-5-CP',
    name: 'Amlodipine 5mg (Amlor)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le matin au réveil',
    minimum_threshold_alert: 20,
    unit_cost_price: 1600,
    selling_price: 2500,
    quantity: 95
  },
  {
    sku: 'AMLO-10-CP',
    name: 'Amlodipine 10mg (Amlor)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour le matin',
    minimum_threshold_alert: 15,
    unit_cost_price: 2200,
    selling_price: 3500,
    quantity: 80
  },
  {
    sku: 'BIPRET-5-CP',
    name: 'Bi-Preterax 5mg/1.25mg (Périndopril + Indapamide)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour le matin à jeun',
    minimum_threshold_alert: 10,
    unit_cost_price: 10500,
    selling_price: 14500,
    quantity: 40
  },
  {
    sku: 'COVER-5-CP',
    name: 'Coversyl 5mg (Périndopril arginine)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le matin avant le repas',
    minimum_threshold_alert: 10,
    unit_cost_price: 6800,
    selling_price: 9800,
    quantity: 50
  },
  {
    sku: 'KARD-75-SACH',
    name: 'Kardégic 75mg (Acétylsalicylate de lysine sachet)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 sachet par jour dissous dans un verre d\'eau',
    minimum_threshold_alert: 25,
    unit_cost_price: 1800,
    selling_price: 2800,
    quantity: 120
  },
  {
    sku: 'KARD-160-SACH',
    name: 'Kardégic 160mg (Acétylsalicylate de lysine sachet)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 sachet par jour au milieu du repas',
    minimum_threshold_alert: 20,
    unit_cost_price: 2000,
    selling_price: 3100,
    quantity: 90
  },
  {
    sku: 'LASI-40-CP',
    name: 'Lasilix 40mg (Furosémide comprimé)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le matin (diurétique)',
    minimum_threshold_alert: 20,
    unit_cost_price: 1200,
    selling_price: 1900,
    quantity: 110
  },
  {
    sku: 'BISO-5-CP',
    name: 'Bisoprolol 5mg (Cardensiel)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le matin',
    minimum_threshold_alert: 15,
    unit_cost_price: 2800,
    selling_price: 4500,
    quantity: 70
  },
  {
    sku: 'ATEN-50-CP',
    name: 'Aténolol 50mg (Ténormine)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour le matin',
    minimum_threshold_alert: 12,
    unit_cost_price: 2000,
    selling_price: 3200,
    quantity: 60
  },
  {
    sku: 'TAHOR-20-CP',
    name: 'Atorvastatine 20mg (Tahor)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le soir au coucher (hypolipémiant)',
    minimum_threshold_alert: 15,
    unit_cost_price: 5800,
    selling_price: 8500,
    quantity: 65
  },
  {
    sku: 'PLAVIX-75-CP',
    name: 'Plavix 75mg (Clopidogrel)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour au cours ou hors repas',
    minimum_threshold_alert: 10,
    unit_cost_price: 8900,
    selling_price: 12500,
    quantity: 45
  },
  {
    sku: 'ALDACT-25-CP',
    name: 'Aldactone 25mg (Spironolactone)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour le matin',
    minimum_threshold_alert: 10,
    unit_cost_price: 2700,
    selling_price: 4200,
    quantity: 50
  },
  {
    sku: 'CORDA-200-CP',
    name: 'Cordarone 200mg (Amiodarone antiarythmique)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour selon schéma cardiologique',
    minimum_threshold_alert: 8,
    unit_cost_price: 3600,
    selling_price: 5400,
    quantity: 35
  },
  {
    sku: 'XAREL-20-CP',
    name: 'Xarelto 20mg (Rivaroxaban Anticoagulant direct)',
    category: 'MEDICATION',
    target_specialty: 'CARDIO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour au repas du soir',
    minimum_threshold_alert: 6,
    unit_cost_price: 21000,
    selling_price: 28000,
    quantity: 25
  },

  // =========================================================================
  // 3. PÉDIATRIE & SOINS DE L'ENFANT (PED)
  // =========================================================================
  {
    sku: 'DIPER-SIROP',
    name: 'Doliprane sirop pédiatrique 2.4% (flacon 100ml)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'FLACON',
    default_dosage: '1 dose-kilo toutes les 6 heures si fièvre > 38.5°C',
    minimum_threshold_alert: 25,
    unit_cost_price: 900,
    selling_price: 1400,
    quantity: 130
  },
  {
    sku: 'AMOX-PED-SIROP',
    name: 'Amoxicilline suspension buvable 250mg/5ml',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'FLACON',
    default_dosage: '80mg/kg/jour en 3 prises pendant 7 jours',
    minimum_threshold_alert: 20,
    unit_cost_price: 1300,
    selling_price: 2100,
    quantity: 90
  },
  {
    sku: 'AUGM-PED-SIROP',
    name: 'Augmentin suspension buvable enfant (Amox-Clav 100mg/ml)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'FLACON',
    default_dosage: '1 dose-poids matin et soir pendant les repas',
    minimum_threshold_alert: 15,
    unit_cost_price: 3600,
    selling_price: 5200,
    quantity: 60
  },
  {
    sku: 'COART-DISP-PED',
    name: 'Coartem Dispersible pédiatrique (Artéméther 20mg/120mg)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'BOITE',
    default_dosage: 'Délier le cp dans un peu d\'eau, 2 fois/jour pdt 3 jours',
    minimum_threshold_alert: 25,
    unit_cost_price: 1600,
    selling_price: 2500,
    quantity: 100
  },
  {
    sku: 'SRO-SACHET',
    name: 'Soluté de Réhydratation Orale (SRO sachet OMS)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'SACHET',
    default_dosage: '1 sachet dilué dans 1L d\'eau propre à boire à volonté',
    minimum_threshold_alert: 50,
    unit_cost_price: 250,
    selling_price: 500,
    quantity: 300
  },
  {
    sku: 'CELES-GOUTTES',
    name: 'Célestène 0.05% gouttes buvables (Bétaméthasone)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'FLACON',
    default_dosage: '40 gouttes/10kg le matin pendant 3 jours max',
    minimum_threshold_alert: 15,
    unit_cost_price: 1900,
    selling_price: 2800,
    quantity: 70
  },
  {
    sku: 'ZYMAD-GOUTTES',
    name: 'ZymaD 10 000 UI/ml gouttes (Vitamine D3)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'FLACON',
    default_dosage: '3 à 4 gouttes par jour chez le nourrisson',
    minimum_threshold_alert: 20,
    unit_cost_price: 1300,
    selling_price: 2000,
    quantity: 85
  },
  {
    sku: 'SERUM-PHY-UNIDOSE',
    name: 'Sérum Physiologique stérile (Boîte de 20 unidoses 5ml)',
    category: 'CONSUMABLE',
    target_specialty: 'PED',
    unit: 'BOITE',
    default_dosage: 'Lavage de nez 2 à 3 fois par jour avant les biberons',
    minimum_threshold_alert: 20,
    unit_cost_price: 1600,
    selling_price: 2500,
    quantity: 110
  },
  {
    sku: 'DEBR-PED-SIROP',
    name: 'Débridat suspension buvable enfant (Trimébutine)',
    category: 'MEDICATION',
    target_specialty: 'PED',
    unit: 'FLACON',
    default_dosage: '1 graduation pour 5kg, 3 fois par jour avant les repas',
    minimum_threshold_alert: 12,
    unit_cost_price: 2000,
    selling_price: 3100,
    quantity: 55
  },

  // =========================================================================
  // 4. GYNÉCOLOGIE-OBSTÉTRIQUE & MATERNITÉ (GYN-OBS)
  // =========================================================================
  {
    sku: 'ACID-FOL-5-CP',
    name: 'Acide Folique 5mg (Vitamine B9)',
    category: 'MEDICATION',
    target_specialty: 'GYN-OBS',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour en pré-conception et T1',
    minimum_threshold_alert: 25,
    unit_cost_price: 700,
    selling_price: 1200,
    quantity: 140
  },
  {
    sku: 'TARDY-B9-CP',
    name: 'Tardyferon B9 (Fer 50mg + Acide Folique 0.35mg)',
    category: 'MEDICATION',
    target_specialty: 'GYN-OBS',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour avant le repas pendant la grossesse',
    minimum_threshold_alert: 30,
    unit_cost_price: 2200,
    selling_price: 3400,
    quantity: 150
  },
  {
    sku: 'PROGEST-200-CAPS',
    name: 'Progestan 200mg (Progestérone naturelle micronisée)',
    category: 'MEDICATION',
    target_specialty: 'GYN-OBS',
    unit: 'BOITE',
    default_dosage: '1 capsule par voie vaginale le soir au coucher',
    minimum_threshold_alert: 15,
    unit_cost_price: 5200,
    selling_price: 7500,
    quantity: 50
  },
  {
    sku: 'POLYGYN-CAPS',
    name: 'Polygynax capsules vaginales (Nystatine + Néomycine)',
    category: 'MEDICATION',
    target_specialty: 'GYN-OBS',
    unit: 'BOITE',
    default_dosage: '1 capsule vaginale au coucher pendant 6 à 12 soirs',
    minimum_threshold_alert: 15,
    unit_cost_price: 3300,
    selling_price: 4800,
    quantity: 65
  },
  {
    sku: 'MONURIL-3G-SACH',
    name: 'Monuril 3g (Fosfomycine trométamol sachet unidose)',
    category: 'MEDICATION',
    target_specialty: 'GYN-OBS',
    unit: 'BOITE',
    default_dosage: '1 sachet en prise unique le soir à jeun vessie vide',
    minimum_threshold_alert: 12,
    unit_cost_price: 4000,
    selling_price: 5800,
    quantity: 45
  },
  {
    sku: 'GESTAR-G3-CAPS',
    name: 'Gestarelle G3 Grossesse & Allaitement (Multi-vitamines + DHA)',
    category: 'MEDICATION',
    target_specialty: 'GYN-OBS',
    unit: 'BOITE',
    default_dosage: '1 capsule par jour au milieu du déjeuner',
    minimum_threshold_alert: 10,
    unit_cost_price: 6400,
    selling_price: 8900,
    quantity: 40
  },

  // =========================================================================
  // 5. DERMATOLOGIE & SOINS CUTANÉS (DERMA)
  // =========================================================================
  {
    sku: 'DIPROS-005-CR',
    name: 'Diprosone 0.05% crème 30g (Bétaméthasone dermocorticoïde)',
    category: 'MEDICATION',
    target_specialty: 'DERMA',
    unit: 'TUBE',
    default_dosage: '1 application locale par jour en couche mince',
    minimum_threshold_alert: 15,
    unit_cost_price: 2100,
    selling_price: 3200,
    quantity: 60
  },
  {
    sku: 'FUCID-2-CR',
    name: 'Fucidine 2% crème 15g (Acide fusidique antibactérien)',
    category: 'MEDICATION',
    target_specialty: 'DERMA',
    unit: 'TUBE',
    default_dosage: '1 à 2 applications par jour après nettoyage de la lésion',
    minimum_threshold_alert: 15,
    unit_cost_price: 2500,
    selling_price: 3800,
    quantity: 70
  },
  {
    sku: 'ECONA-1-CR',
    name: 'Éconazole 1% crème antifongique 30g',
    category: 'MEDICATION',
    target_specialty: 'DERMA',
    unit: 'TUBE',
    default_dosage: '2 applications par jour pendant 2 à 3 semaines',
    minimum_threshold_alert: 15,
    unit_cost_price: 1500,
    selling_price: 2400,
    quantity: 80
  },
  {
    sku: 'DEXER-250-CR',
    name: 'Dexeryl crème émolliente 250g (Peaux sèches & atopiques)',
    category: 'MEDICATION',
    target_specialty: 'DERMA',
    unit: 'TUBE',
    default_dosage: '1 à 2 applications quotidiennes sur tout le corps',
    minimum_threshold_alert: 12,
    unit_cost_price: 3100,
    selling_price: 4500,
    quantity: 50
  },
  {
    sku: 'KETOD-2-GEL',
    name: 'Kétoderm 2% gel sachet (Kétoconazole antifongique)',
    category: 'MEDICATION',
    target_specialty: 'DERMA',
    unit: 'BOITE',
    default_dosage: 'Application sur cuir chevelu/corps 2 fois/semaine pdt 4 sem',
    minimum_threshold_alert: 10,
    unit_cost_price: 3200,
    selling_price: 4600,
    quantity: 40
  },

  // =========================================================================
  // 6. OPHTALMOLOGIE (OPHTA)
  // =========================================================================
  {
    sku: 'TOBRAD-COLL',
    name: 'Tobradex collyre 5ml (Tobramycine + Dexaméthasone)',
    category: 'MEDICATION',
    target_specialty: 'OPHTA',
    unit: 'FLACON',
    default_dosage: '1 goutte dans l\'œil atteint 4 fois par jour pendant 7 jours',
    minimum_threshold_alert: 15,
    unit_cost_price: 2800,
    selling_price: 4200,
    quantity: 65
  },
  {
    sku: 'TOBREX-COLL',
    name: 'Tobrex collyre 0.3% 5ml (Tobramycine antibiotique)',
    category: 'MEDICATION',
    target_specialty: 'OPHTA',
    unit: 'FLACON',
    default_dosage: '1 goutte 3 à 4 fois par jour pendant 5 jours',
    minimum_threshold_alert: 15,
    unit_cost_price: 2100,
    selling_price: 3100,
    quantity: 55
  },
  {
    sku: 'LACRIF-GEL-OPH',
    name: 'Lacrifluid 0.13% gel ophtalmique (Larmes artificielles)',
    category: 'MEDICATION',
    target_specialty: 'OPHTA',
    unit: 'BOITE',
    default_dosage: '1 goutte 2 à 4 fois par jour en cas de sécheresse oculaire',
    minimum_threshold_alert: 12,
    unit_cost_price: 2400,
    selling_price: 3500,
    quantity: 50
  },
  {
    sku: 'XALAT-COLL',
    name: 'Xalatan 0.005% collyre (Latanoprost - Glaucome)',
    category: 'MEDICATION',
    target_specialty: 'OPHTA',
    unit: 'FLACON',
    default_dosage: '1 goutte par œil atteint 1 fois par jour le soir',
    minimum_threshold_alert: 8,
    unit_cost_price: 8800,
    selling_price: 12500,
    quantity: 30
  },

  // =========================================================================
  // 7. GASTRO-ENTÉROLOGIE (GASTRO)
  // =========================================================================
  {
    sku: 'INEX-40-CP',
    name: 'Inexium 40mg (Ésoméprazole)',
    category: 'MEDICATION',
    target_specialty: 'GASTRO',
    unit: 'BOITE',
    default_dosage: '1 comprimé par jour le matin à jeun pendant 4 semaines',
    minimum_threshold_alert: 15,
    unit_cost_price: 5400,
    selling_price: 7800,
    quantity: 70
  },
  {
    sku: 'SMECTA-SACH',
    name: 'Smecta sachet suspension buvable (Diosmectite)',
    category: 'MEDICATION',
    target_specialty: 'GASTRO',
    unit: 'BOITE',
    default_dosage: '1 sachet 3 fois par jour délayé dans un demi-verre d\'eau',
    minimum_threshold_alert: 25,
    unit_cost_price: 1800,
    selling_price: 2800,
    quantity: 110
  },
  {
    sku: 'IMOD-2-GEL',
    name: 'Imodium 2mg (Lopéramide antidiarrhéique)',
    category: 'MEDICATION',
    target_specialty: 'GASTRO',
    unit: 'BOITE',
    default_dosage: '2 gélules d\'emblée puis 1 après chaque selle non moulée',
    minimum_threshold_alert: 15,
    unit_cost_price: 1200,
    selling_price: 1900,
    quantity: 80
  },
  {
    sku: 'METEO-CAPS',
    name: 'Météospasmyl capsules (Alvérine + Siméticone)',
    category: 'MEDICATION',
    target_specialty: 'GASTRO',
    unit: 'BOITE',
    default_dosage: '1 capsule 2 à 3 fois par jour au début des repas',
    minimum_threshold_alert: 12,
    unit_cost_price: 2900,
    selling_price: 4200,
    quantity: 60
  },
  {
    sku: 'DUPHAL-SIROP',
    name: 'Duphalac sirop 200ml (Lactulose laxatif doux)',
    category: 'MEDICATION',
    target_specialty: 'GASTRO',
    unit: 'FLACON',
    default_dosage: '1 à 3 cuillères à soupe par jour en une prise au petit-déjeuner',
    minimum_threshold_alert: 15,
    unit_cost_price: 2400,
    selling_price: 3600,
    quantity: 50
  },

  // =========================================================================
  // 8. OTO-RHINO-LARYNGOLOGIE (ORL)
  // =========================================================================
  {
    sku: 'SOLUP-20-CP',
    name: 'Solupred 20mg (Prednisolone comprimé orodispersible)',
    category: 'MEDICATION',
    target_specialty: 'ORL',
    unit: 'BOITE',
    default_dosage: '1mg/kg/jour en une prise matinale pendant 5 jours',
    minimum_threshold_alert: 20,
    unit_cost_price: 2300,
    selling_price: 3500,
    quantity: 85
  },
  {
    sku: 'NASONEX-SPRAY',
    name: 'Nasonex 50mcg spray nasal (Mométasone)',
    category: 'MEDICATION',
    target_specialty: 'ORL',
    unit: 'FLACON',
    default_dosage: '2 pulvérisations dans chaque narine le matin',
    minimum_threshold_alert: 10,
    unit_cost_price: 6200,
    selling_price: 8900,
    quantity: 45
  },
  {
    sku: 'POLYDEXA-AURIC',
    name: 'Polydexa gouttes auriculaires 10.5ml',
    category: 'MEDICATION',
    target_specialty: 'ORL',
    unit: 'FLACON',
    default_dosage: '4 gouttes dans l\'oreille 2 fois par jour pendant 7 jours',
    minimum_threshold_alert: 15,
    unit_cost_price: 2200,
    selling_price: 3400,
    quantity: 65
  },
  {
    sku: 'OTIPAX-AURIC',
    name: 'Otipax gouttes auriculaires antalgiques 15ml',
    category: 'MEDICATION',
    target_specialty: 'ORL',
    unit: 'FLACON',
    default_dosage: '4 gouttes dans le conduit auditif 2 à 3 fois par jour',
    minimum_threshold_alert: 15,
    unit_cost_price: 1900,
    selling_price: 2900,
    quantity: 70
  },

  // =========================================================================
  // 9. TRAUMATOLOGIE, RHUMATOLOGIE & CHIRURGIE (TRAUMA-ORTHO & CHIR-GEN)
  // =========================================================================
  {
    sku: 'VOLT-75-INJ',
    name: 'Voltarène 75mg/3ml injectable (Diclofénac)',
    category: 'MEDICATION',
    target_specialty: 'TRAUMA-ORTHO',
    unit: 'BOITE',
    default_dosage: '1 ampoule en intramusculaire profonde par jour pdt 2 à 3 j',
    minimum_threshold_alert: 15,
    unit_cost_price: 2100,
    selling_price: 3200,
    quantity: 75
  },
  {
    sku: 'PROFEN-100-CP',
    name: 'Profénid 100mg (Kétoprofène)',
    category: 'MEDICATION',
    target_specialty: 'TRAUMA-ORTHO',
    unit: 'BOITE',
    default_dosage: '1 comprimé matin et soir au cours du repas',
    minimum_threshold_alert: 15,
    unit_cost_price: 2700,
    selling_price: 4100,
    quantity: 65
  },
  {
    sku: 'APRA-550-CP',
    name: 'Apranax 550mg (Naproxène sodique)',
    category: 'MEDICATION',
    target_specialty: 'TRAUMA-ORTHO',
    unit: 'BOITE',
    default_dosage: '1 comprimé matin et soir avec un grand verre d\'eau',
    minimum_threshold_alert: 12,
    unit_cost_price: 3200,
    selling_price: 4800,
    quantity: 55
  },
  {
    sku: 'MIOREL-4-GEL',
    name: 'Miorel 4mg (Thiocolchicoside myorelaxant)',
    category: 'MEDICATION',
    target_specialty: 'TRAUMA-ORTHO',
    unit: 'BOITE',
    default_dosage: '2 gélules matin et soir pendant 5 à 7 jours max',
    minimum_threshold_alert: 15,
    unit_cost_price: 2600,
    selling_price: 3900,
    quantity: 60
  },
  {
    sku: 'CLEX-4000-INJ',
    name: 'Clexane 4000 UI / 0.4ml (Énoxaparine injectable sous-cutanée)',
    category: 'MEDICATION',
    target_specialty: 'CHIR-GEN',
    unit: 'BOITE',
    default_dosage: '1 injection sous-cutanée par jour en prévention thromboembolique',
    minimum_threshold_alert: 10,
    unit_cost_price: 13500,
    selling_price: 18500,
    quantity: 35
  },
  {
    sku: 'SUTUR-VICR-20',
    name: 'Fil de suture résorbable Vicryl 2/0 avec aiguille',
    category: 'SURGICAL',
    target_specialty: 'CHIR-GEN',
    unit: 'UNITE',
    default_dosage: 'Usage chirurgical stérile',
    minimum_threshold_alert: 20,
    unit_cost_price: 2200,
    selling_price: 3500,
    quantity: 100
  },

  // =========================================================================
  // 10. NEUROLOGIE & PSYCHIATRIE (NEURO)
  // =========================================================================
  {
    sku: 'DEPAK-500-CP',
    name: 'Dépakine Chrono 500mg (Valproate de sodium antiépileptique)',
    category: 'MEDICATION',
    target_specialty: 'NEURO',
    unit: 'BOITE',
    default_dosage: '1 comprimé matin et soir selon dosage sanguin',
    minimum_threshold_alert: 12,
    unit_cost_price: 4600,
    selling_price: 6800,
    quantity: 50
  },
  {
    sku: 'TEGRET-200-CP',
    name: 'Tégrétol 200mg (Carbamazépine)',
    category: 'MEDICATION',
    target_specialty: 'NEURO',
    unit: 'BOITE',
    default_dosage: '1 comprimé 2 fois par jour au cours des repas',
    minimum_threshold_alert: 10,
    unit_cost_price: 3000,
    selling_price: 4500,
    quantity: 40
  },
  {
    sku: 'LAROX-25-CP',
    name: 'Laroxyl 25mg (Amitriptyline antidépresseur & douleurs neuropathiques)',
    category: 'MEDICATION',
    target_specialty: 'NEURO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le soir au coucher',
    minimum_threshold_alert: 10,
    unit_cost_price: 2100,
    selling_price: 3200,
    quantity: 45
  },
  {
    sku: 'SEROPL-10-CP',
    name: 'Séroplex 10mg (Escitalopram anxiolytique/antidépresseur)',
    category: 'MEDICATION',
    target_specialty: 'NEURO',
    unit: 'BOITE',
    default_dosage: '1 comprimé le matin au réveil',
    minimum_threshold_alert: 10,
    unit_cost_price: 5800,
    selling_price: 8500,
    quantity: 40
  }
];

async function seedTenantMedications(client, tenantId, tenantName = '') {
  let insertedCount = 0;
  let updatedCount = 0;

  for (const med of SENEGAL_MEDICATIONS) {
    // Check if item already exists by SKU or by Name in this tenant
    const existing = await client.query(
      `SELECT id, current_stock_quantity FROM stock_items WHERE tenant_id = $1 AND (sku = $2 OR LOWER(TRIM(name)) = LOWER($3))`,
      [tenantId, med.sku, med.name]
    );

    let stockItemId;

    if (existing.rowCount === 0) {
      // Insert new stock item with initial quantity
      const insertRes = await client.query(
        `INSERT INTO stock_items (
          tenant_id, sku, name, category, target_specialty, default_dosage,
          unit, minimum_threshold_alert, unit_cost_price, selling_price,
          current_stock_quantity, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true)
        RETURNING id`,
        [
          tenantId,
          med.sku,
          med.name,
          med.category,
          med.target_specialty,
          med.default_dosage,
          med.unit,
          med.minimum_threshold_alert,
          med.unit_cost_price,
          med.selling_price,
          med.quantity
        ]
      );
      stockItemId = insertRes.rows[0].id;
      insertedCount++;

      // Create an active lot for this stock item
      const lotNumber = `LOT-SN-${new Date().getFullYear()}-${med.sku.substring(0, 5)}`;
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 2); // Expiration in 2 years

      await client.query(
        `INSERT INTO stock_lots (tenant_id, stock_item_id, lot_number, expiration_date, quantity_remaining)
         VALUES ($1, $2, $3, $4, $5)`,
        [tenantId, stockItemId, lotNumber, expiryDate.toISOString().split('T')[0], med.quantity]
      );
    } else {
      // Update existing item details (price, target_specialty, default_dosage)
      stockItemId = existing.rows[0].id;
      await client.query(
        `UPDATE stock_items 
         SET name = $1,
             category = $2,
             target_specialty = $3,
             default_dosage = $4,
             unit = $5,
             minimum_threshold_alert = $6,
             unit_cost_price = $7,
             selling_price = $8,
             is_active = true
         WHERE id = $9 AND tenant_id = $10`,
        [
          med.name,
          med.category,
          med.target_specialty,
          med.default_dosage,
          med.unit,
          med.minimum_threshold_alert,
          med.unit_cost_price,
          med.selling_price,
          stockItemId,
          tenantId
        ]
      );
      updatedCount++;
    }
  }

  if (tenantName) {
    console.log(`  [+] Résultat pour ${tenantName} : ${insertedCount} créés, ${updatedCount} mis à jour.`);
  }

  return { insertedCount, updatedCount };
}

async function seedSenegalMedications() {
  console.log('================================================================');
  console.log('   SOFTMED - SEEDING MÉDICAMENTS DU MARCHÉ SÉNÉGALAIS           ');
  console.log('================================================================');

  const client = await pool.connect();

  try {
    // 1. Ajouter les colonnes target_specialty et default_dosage si manquantes
    console.log('1. Mise à jour du schéma de table `stock_items`...');
    await client.query(`
      ALTER TABLE stock_items 
      ADD COLUMN IF NOT EXISTS target_specialty VARCHAR(50) DEFAULT 'GENERAL';

      ALTER TABLE stock_items 
      ADD COLUMN IF NOT EXISTS default_dosage VARCHAR(255);
    `);
    console.log('-> Colonnes `target_specialty` et `default_dosage` vérifiées/créées.');

    // 2. Récupérer toutes les cliniques (tenants)
    const tenantsRes = await client.query('SELECT id, name, slug FROM tenants WHERE is_active = true');
    console.log(`2. Cliniques trouvées : ${tenantsRes.rowCount}`);

    for (const tenant of tenantsRes.rows) {
      console.log(`\n==> Remplissage du stock pour : "${tenant.name}" (${tenant.slug})`);
      // Les politiques RLS s'appliquent aussi a ce script des lors que le role
      // de connexion n'est ni superuser ni BYPASSRLS : sans contexte, chaque
      // INSERT est rejete par "new row violates row-level security policy".
      // On pose la clinique en cours plutot qu'un bypass global, pour que le
      // script ne puisse ecrire que dans celle qu'il traite.
      await client.query('SELECT set_config($1, $2, false)', ['app.current_tenant_id', tenant.id]);
      await seedTenantMedications(client, tenant.id, tenant.name);
    }

    await client.query('SELECT set_config($1, $2, false)', ['app.current_tenant_id', '']);

    console.log('\n================================================================');
    console.log('✅ SEEDING TERMINÉ AVEC SUCCÈS POUR TOUTES LES CLINIQUES !');
    console.log('================================================================');
  } catch (err) {
    console.error('Erreur lors du seeding des médicaments:', err);
  } finally {
    client.release();
    pool.end();
  }
}

if (require.main === module) {
  seedSenegalMedications();
}

module.exports = { seedSenegalMedications, seedTenantMedications, SENEGAL_MEDICATIONS };

