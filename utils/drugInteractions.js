// Référentiel de démonstration : paires d'interactions médicamenteuses connues et
// cliniquement significatives. Couverture volontairement limitée et non exhaustive
// (une douzaine de paires courantes) - un déploiement réel nécessiterait un
// référentiel certifié et maintenu (ex: Thesaurus ANSM, DrugBank) tenu à jour par
// un pharmacien, pas une liste statique en dur dans le code. À ne présenter au
// personnel soignant que comme une aide indicative, jamais comme une source
// médicale certifiée exhaustive.
const INTERACTION_PAIRS = [
  { drugs: ['warfarine', 'aspirine'], severity: 'DANGER', description: "Risque hémorragique majoré (anticoagulant + antiagrégant plaquettaire)." },
  { drugs: ['warfarine', 'ibuprofène'], severity: 'DANGER', description: "Risque hémorragique digestif majoré (AINS + anticoagulant)." },
  { drugs: ['warfarine', 'diclofénac'], severity: 'DANGER', description: "Risque hémorragique digestif majoré (AINS + anticoagulant)." },
  { drugs: ['énalapril', 'spironolactone'], severity: 'CAUTION', description: "Risque d'hyperkaliémie (IEC + diurétique épargneur de potassium)." },
  { drugs: ['lisinopril', 'spironolactone'], severity: 'CAUTION', description: "Risque d'hyperkaliémie (IEC + diurétique épargneur de potassium)." },
  { drugs: ['amlodipine', 'bi-preterax'], severity: 'CAUTION', description: "Risque d'hypotension marquée (association de deux antihypertenseurs)." },
  { drugs: ['simvastatine', 'clarithromycine'], severity: 'DANGER', description: "Risque de rhabdomyolyse (inhibition du métabolisme de la statine)." },
  { drugs: ['simvastatine', 'érythromycine'], severity: 'DANGER', description: "Risque de rhabdomyolyse (inhibition du métabolisme de la statine)." },
  { drugs: ['tramadol', 'fluoxétine'], severity: 'DANGER', description: "Risque de syndrome sérotoninergique (opioïde + ISRS)." },
  { drugs: ['tramadol', 'sertraline'], severity: 'DANGER', description: "Risque de syndrome sérotoninergique (opioïde + ISRS)." },
  { drugs: ['digoxine', 'furosémide'], severity: 'CAUTION', description: "L'hypokaliémie induite par le diurétique augmente le risque de toxicité digitalique." },
  { drugs: ['méthotrexate', 'aspirine'], severity: 'DANGER', description: "Réduction de l'élimination rénale du méthotrexate, risque de toxicité." },
  { drugs: ['allopurinol', 'azathioprine'], severity: 'DANGER', description: "Risque de toxicité hématologique sévère (inhibition du métabolisme de l'azathioprine)." }
];

const normalize = (s) => (s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Correspondance par inclusion (normalisée) plutôt qu'égalité stricte : les noms
// saisis en pratique varient (dosage accolé, nom commercial vs DCI...), une
// égalité stricte manquerait la plupart des cas réels.
function findPairInteraction(drugA, drugB) {
  const a = normalize(drugA);
  const b = normalize(drugB);
  if (!a || !b) return null;
  return INTERACTION_PAIRS.find(pair => {
    const [x, y] = pair.drugs.map(normalize);
    return (a.includes(x) && b.includes(y)) || (a.includes(y) && b.includes(x));
  }) || null;
}

module.exports = { findPairInteraction, normalize, INTERACTION_PAIRS };
