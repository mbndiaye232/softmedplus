const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  ImageRun
} = require('docx');

const softmedLogoPath = path.join(__dirname, '..', 'logo_softmed_clean.png');
const sstLogoPath = path.join(__dirname, '..', 'logo_sst_clean.png');

const hasSoftmedLogo = fs.existsSync(softmedLogoPath);
const hasSstLogo = fs.existsSync(sstLogoPath);

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 460, after: 220 },
    border: {
      bottom: {
        color: '0D2B45',
        space: 6,
        value: 'single',
        size: 18
      }
    }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 140 }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 90 }
  });
}

function createParagraph(text, bold = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: 22,
        font: 'Segoe UI',
        bold: bold,
        color: '1E293B'
      })
    ],
    spacing: { after: 120, line: 280 }
  });
}

function createStep(number, title, description) {
  return new Paragraph({
    children: [
      new TextRun({
        text: `Étape ${number} : ${title} — `,
        bold: true,
        size: 22,
        font: 'Segoe UI',
        color: '1D4ED8'
      }),
      new TextRun({
        text: description,
        size: 22,
        font: 'Segoe UI',
        color: '334155'
      })
    ],
    spacing: { before: 90, after: 110, line: 280 },
    indent: { left: 360 }
  });
}

function createScreenshotBox(description) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `📷 [Capture d'écran : ${description}]`,
                    bold: true,
                    size: 20,
                    font: 'Segoe UI',
                    color: '0D2B45'
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `(Insérer ici la capture d'écran correspondante de l'interface)`,
                    italics: true,
                    size: 18,
                    font: 'Segoe UI',
                    color: '64748B'
                  })
                ],
                spacing: { before: 60 }
              })
            ],
            shading: {
              type: ShadingType.CLEAR,
              fill: 'F8FAFC'
            },
            borders: {
              top: { style: BorderStyle.DASHED, size: 6, color: '94A3B8' },
              bottom: { style: BorderStyle.DASHED, size: 6, color: '94A3B8' },
              left: { style: BorderStyle.DASHED, size: 6, color: '94A3B8' },
              right: { style: BorderStyle.DASHED, size: 6, color: '94A3B8' }
            },
            margins: {
              top: 160,
              bottom: 160,
              left: 200,
              right: 200
            }
          })
        ]
      })
    ]
  });
}

function createTipBox(text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: '💡 Conseil Pratique : ',
                    bold: true,
                    size: 20,
                    font: 'Segoe UI',
                    color: '0369A1'
                  }),
                  new TextRun({
                    text: text,
                    size: 20,
                    font: 'Segoe UI',
                    color: '0C4A6E'
                  })
                ]
              })
            ],
            shading: {
              type: ShadingType.CLEAR,
              fill: 'E0F2FE'
            },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 18, color: '0284C7' },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE }
            },
            margins: { top: 130, bottom: 130, left: 220, right: 160 }
          })
        ]
      })
    ]
  });
}

function createWarningBox(text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: '⚠️ Point de Vigilance / Important : ',
                    bold: true,
                    size: 20,
                    font: 'Segoe UI',
                    color: 'B45309'
                  }),
                  new TextRun({
                    text: text,
                    size: 20,
                    font: 'Segoe UI',
                    color: '78350F'
                  })
                ]
              })
            ],
            shading: {
              type: ShadingType.CLEAR,
              fill: 'FEF3C7'
            },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 18, color: 'D97706' },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE }
            },
            margins: { top: 130, bottom: 130, left: 220, right: 160 }
          })
        ]
      })
    ]
  });
}

async function buildUserGuide() {
  console.log('Construction du Guide d\'Utilisation Word avec logos officiels et proportions 1:1...');

  // Running header with strict 1:1 aspect ratios
  const headerCells = [
    new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: hasSoftmedLogo ? [
            new ImageRun({
              data: fs.readFileSync(softmedLogoPath),
              transformation: { width: 44, height: 44 }
            }),
            new TextRun({ text: '  SoftMed', bold: true, size: 18, color: '0D2B45' })
          ] : [new TextRun({ text: 'SoftMed', bold: true, size: 18, color: '0D2B45' })]
        })
      ],
      borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 6, color: '1D4ED8' }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
      margins: { bottom: 60 }
    }),
    new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: hasSstLogo ? [
            new TextRun({ text: 'Soft Services Technologiques  ', size: 15, color: '64748B', italics: true }),
            new ImageRun({
              data: fs.readFileSync(sstLogoPath),
              transformation: { width: 40, height: 40 }
            })
          ] : [new TextRun({ text: 'Soft Services Technologiques', size: 15, color: '64748B' })]
        })
      ],
      borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 6, color: '1D4ED8' }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
      margins: { bottom: 60 }
    })
  ];

  const runningHeaderTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ children: headerCells })]
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Segoe UI',
            size: 22,
            color: '1E293B'
          }
        }
      },
      heading1: {
        run: {
          font: 'Segoe UI',
          size: 30,
          bold: true,
          color: '0D2B45'
        }
      },
      heading2: {
        run: {
          font: 'Segoe UI',
          size: 24,
          bold: true,
          color: '1D4ED8'
        }
      },
      heading3: {
        run: {
          font: 'Segoe UI',
          size: 22,
          bold: true,
          color: '0F766E'
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1400, right: 1400 }
          }
        },
        headers: {
          default: new Header({
            children: [runningHeaderTable]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.SPACE_BETWEEN,
                children: [
                  new TextRun({
                    text: 'Soft Services Technologiques • SoftMed v2.0 • Usage Interne',
                    size: 16,
                    color: '94A3B8'
                  }),
                  new TextRun({
                    children: ['Page ', PageNumber.CURRENT, ' sur ', PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: '94A3B8',
                    bold: true
                  })
                ]
              })
            ]
          })
        },
        children: [
          // ==================== PAGE DE GARDE PREMIUM ====================
          new Paragraph({ text: '', spacing: { before: 150 } }),

          // Cover Top Dual Branding with 1:1 ratio
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      hasSoftmedLogo ? new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new ImageRun({
                            data: fs.readFileSync(softmedLogoPath),
                            transformation: { width: 110, height: 110 }
                          })
                        ]
                      }) : new Paragraph({ text: 'SoftMed', size: 36, bold: true, color: '0D2B45' })
                    ],
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                  }),
                  new TableCell({
                    children: [
                      hasSstLogo ? new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new ImageRun({
                            data: fs.readFileSync(sstLogoPath),
                            transformation: { width: 95, height: 95 }
                          })
                        ]
                      }) : new Paragraph({ text: 'SST', size: 28, bold: true, color: '1D4ED8', alignment: AlignmentType.RIGHT })
                    ],
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                  })
                ]
              })
            ]
          }),

          new Paragraph({
            text: '',
            spacing: { before: 200, after: 200 },
            border: { bottom: { color: '1D4ED8', size: 24, value: 'single' } }
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'GUIDE D\'UTILISATION OFFICIEL',
                size: 38,
                bold: true,
                color: '0D2B45'
              })
            ],
            spacing: { before: 250, after: 120 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Manuel Opérationnel & Procédures Pas-à-Pas',
                size: 24,
                color: '1D4ED8',
                bold: true
              })
            ],
            spacing: { after: 180 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Guide complet pour Équipes d\'Accueil, Soignants, Praticiens, Caissiers, Gestionnaires et Administrateurs',
                size: 22,
                color: '475569',
                italics: true
              })
            ],
            spacing: { after: 350 }
          }),

          createScreenshotBox('Vue générale du Tableau de Bord et Menu Navigation SoftMed'),

          new Paragraph({ text: '', spacing: { before: 350 } }),

          // Metadata Card on Cover
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Éditeur : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'Soft Services Technologiques (SST)\n' }),
                          new TextRun({ text: 'Solution : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'SoftMed — Version 2.0 Cloud Multi-Tenant\n' }),
                          new TextRun({ text: 'Date de publication : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: '2026\n' }),
                          new TextRun({ text: 'Support & Assistance : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'support@sst.best | contact@sst.best' })
                        ],
                        spacing: { line: 300 }
                      })
                    ],
                    shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
                    borders: {
                      left: { style: BorderStyle.SINGLE, size: 16, color: '0D2B45' },
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    },
                    margins: { top: 120, bottom: 120, left: 180, right: 150 }
                  })
                ]
              })
            ]
          }),

          // ==================== SOMMAIRE ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('Table des Matières'),
          createParagraph('1. Introduction & Prise en Main du Logiciel'),
          createParagraph('2. Connexion & Sécurité d\'Accès'),
          createParagraph('3. Module 1 : Agenda, Calendrier & Prise de Rendez-Vous'),
          createParagraph('4. Module 2 : Dossier Patient Informatisé (DPI 360°) & Consultations'),
          createParagraph('5. Module 3 : Ordonnances Médicales Sécurisées & Anti-Fraude'),
          createParagraph('6. Module 4 : Bulletins d\'Analyses, Imagerie & Numérisation (Scans)'),
          createParagraph('7. Module 5 : Hospitalisation & Gestion des Lits'),
          createParagraph('8. Module 6 : Caisse, Facturation & Prises en Charge IPM (Tiers-Payant)'),
          createParagraph('9. Module 7 : Envoi des Factures et Pièces Jointes par Email (Patients & IPM)'),
          createParagraph('10. Module 8 : Pharmacie & Gestion des Stocks'),
          createParagraph('11. Module 9 : Structure Médicale, Praticiens & Spécialités'),
          createParagraph('12. Module 10 : Administration, Droits d\'Accès & Configuration des Serveurs SMTP'),
          createParagraph('13. Fiches Mémo Pratiques par Rôle Métier'),

          // ==================== CHAPITRE 1 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('1. Introduction & Prise en Main'),
          createHeading2('1.1. Objectifs & Utilité du Système'),
          createParagraph('SoftMed est une solution médicale et hospitalière développée par Soft Services Technologiques (SST). Elle est conçue pour être utilisable facilement par tout le personnel soignant et administratif, sans nécessiter d\'expertise informatique.'),
          createParagraph('Ses objectifs principaux sont :'),
          createParagraph('• Supprimer la perte de dossiers et fluidifier le parcours du patient de l\'accueil jusqu\'à sa sortie.'),
          createParagraph('• Sécuriser les prescriptions médicales avec code QR anti-contrefaçon.'),
          createParagraph('• Automatiser le calcul des factures en tiers-payant (IPM, Assurances, Mutuelles) et éliminer les erreurs de caisse.'),
          createParagraph('• Archiver numériquement tous les examens et bilans de santé pour une consultation instantanée.'),
          createParagraph('• Transmettre directement les factures et justificatifs par courrier électronique sécurisé.'),

          createHeading2('1.2. Organisation Visuelle de l\'Écran'),
          createParagraph('L\'écran est divisé en 3 parties claires :'),
          createParagraph('1. Le Menu de Gauche (Bleu Nuit) : Permet de choisir le service où vous travaillez (Tableau de Bord, Agenda, Patients & DPI, Caisse, Pharmacie, Paramètres...).'),
          createParagraph('2. Le Bandeau Supérieur : Affiche le nom de la clinique active et votre profil connecté.'),
          createParagraph('3. La Zone de Travail Centrale : Affiche les fiches, dossiers et tableaux avec de grands boutons bien visibles.'),

          createScreenshotBox('Vue d\'ensemble de l\'écran SoftMed avec le menu de gauche et la zone centrale'),

          // ==================== CHAPITRE 2 ====================
          createHeading1('2. Connexion & Sécurité d\'Accès'),
          createHeading2('2.1. Comment se connecter à SoftMed'),
          createStep(1, 'Ouvrir le navigateur web', 'Lancez Google Chrome, Microsoft Edge ou Safari sur votre ordinateur ou tablette.'),
          createStep(2, 'Saisir l\'adresse de connexion', 'Tapez l\'adresse web de votre établissement (ex : http://localhost:5000 ou l\'adresse fournie par l\'administrateur).'),
          createStep(3, 'Entrer l\'Identifiant Clinique (Slug)', 'Saisissez le code de votre clinique (ex : "espoir" ou "paix").'),
          createStep(4, 'Saisir vos identifiants personnels', 'Tapez votre adresse email et votre mot de passe secret.'),
          createStep(5, 'Cliquer sur Connexion', 'Cliquez sur le bouton bleu « Accéder à ma clinique ».'),

          createScreenshotBox('Écran de connexion avec les champs Identifiant Clinique, Email et Mot de passe'),

          createTipBox('Ajoutez la page d\'accueil à vos Favoris (raccourci clavier Ctrl + D) pour y accéder en un seul clic chaque matin.'),
          createWarningBox('Ne donnez jamais vos identifiants à une autre personne. Chaque ordonnance rédigée ou encaissement réalisé est enregistré avec le nom de l\'utilisateur connecté.'),

          // ==================== CHAPITRE 3 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('3. Agenda & Prise de Rendez-Vous'),
          createHeading2('3.1. Objectifs & Utilité'),
          createParagraph('L\'Agenda permet d\'enregistrer les rendez-vous pris au guichet ou par téléphone, de visualiser les disponibilités des médecins et de réduire le temps d\'attente des patients.'),

          createHeading2('3.2. Comment planifier un Rendez-Vous en 4 étapes'),
          createStep(1, 'Ouvrir l\'Agenda', 'Dans le menu de gauche, cliquez sur « Agenda & RDV ».'),
          createStep(2, 'Choisir le Médecin', 'Dans le menu déroulant en haut, sélectionnez le médecin demandé.'),
          createStep(3, 'Sélectionner le Patient et l\'Acte', 'Tapez le nom du patient et choisissez le type de consultation (Générale, Spécialisée, Échographie...).'),
          createStep(4, 'Fixer l\'Heure et Enregistrer', 'Indiquez la date et l\'heure puis cliquez sur « Enregistrer le RDV ».'),

          createScreenshotBox('Calendrier hebdomadaire et formulaire d\'enregistrement de rendez-vous'),

          // ==================== CHAPITRE 4 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('4. Dossier Patient Informatisé (DPI 360°) & Consultations'),
          createHeading2('4.1. Objectifs & Utilité'),
          createParagraph('Le Dossier Patient Informatisé (DPI 360°) rassemble toute la vie médicale du patient dans un espace unique : antécédents, examens, ordonnances, bilans de santé et prises en charge.'),

          createHeading2('4.2. Créer une nouvelle fiche Patient'),
          createStep(1, 'Aller dans Patients & DPI', 'Cliquez sur « Patients & DPI » dans le menu vertical.'),
          createStep(2, 'Cliquer sur Nouveau Patient', 'Cliquez sur le bouton bleu « + Nouveau Patient ».'),
          createStep(3, 'Remplir les coordonnées', 'Indiquez le nom, prénom, numéro de téléphone, date de naissance, groupe sanguin et adresse.'),
          createStep(4, 'Rattacher à une IPM / Assurance', 'Si le patient a une prise en charge (IPM SONATEL, AXA...), sélectionnez son organisme et notez son numéro de police.'),
          createStep(5, 'Enregistrer', 'Cliquez sur « Créer le dossier patient ». Le numéro de dossier (ex : PAT-2026-00048) est créé.'),

          createScreenshotBox('Registre des patients et formulaire de création de dossier'),

          createHeading2('4.3. Consulter le Dossier Médical Partagé (DPI 360°)'),
          createParagraph('Cliquez sur le bouton vert « Dossier DPI 360° » pour accéder aux 4 onglets :'),
          createParagraph('• Onglet 1 - Synthèse & Constantes : Poids, taille, tension artérielle, IMC, statut (Ambulatoire, Hospitalisé).'),
          createParagraph('• Onglet 2 - Antécédents & Allergies : Diabète, hypertension, allergies médicamenteuses signalées en rouge.'),
          createParagraph('• Onglet 3 - Analyses & Examens : Liste des examens demandés et accès direct aux scans de laboratoire.'),
          createParagraph('• Onglet 4 - Consultations & Ordonnances : Historique complet avec séparation distincte des consultations et ordonnances.'),

          createScreenshotBox('Dossier DPI 360° ouvert avec les 4 onglets médicaux interactifs'),

          createHeading2('4.4. Rédiger une Consultation avec Dictée Vocale IA'),
          createStep(1, 'Cliquer sur Nouvelle Consultation', 'Dans l\'onglet 4 du dossier, cliquez sur « + Nouvelle Consultation ».'),
          createStep(2, 'Dicter ou taper les observations', 'Tapez le texte ou cliquez sur « 🎙️ Démarrer Dictée » pour parler directement dans le micro.'),
          createStep(3, 'Prescrire les médicaments', 'Indiquez les produits prescrits et leurs posologies.'),
          createStep(4, 'Enregistrer', 'Cliquez sur « Enregistrer la Consultation ». L\'ordonnance officielle est générée.'),

          createScreenshotBox('Formulaire de consultation avec bouton de dictée vocale intelligente'),

          // ==================== CHAPITRE 5 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('5. Ordonnances Médicales Sécurisées & Anti-Fraude'),
          createHeading2('5.1. Objectifs & Utilité'),
          createParagraph('Chaque ordonnance émise comporte une empreinte cryptographique de sécurité et un QR code officiel qui protège la clinique contre la contrefaçon de prescriptions.'),

          createHeading2('5.2. Imprimer et Renouveler une Ordonnance'),
          createStep(1, 'Cliquer sur Imprimer', 'Sur l\'ordonnance dans le dossier, cliquez sur « Imprimer ». L\'ordonnance s\'affiche au premier plan.'),
          createStep(2, 'Choisir le format', 'Imprimez en A4 ou A5 sur votre imprimante de cabinet.'),
          createStep(3, 'Renouvellement en 1 clic', 'Pour un patient sous traitement chronique, cliquez sur « Renouveler / Dupliquer » : le traitement précédent est rechargé sans ressaisie.'),

          createScreenshotBox('Ordonnance imprimable haute définition avec QR Code de validation et cachet'),

          // ==================== CHAPITRE 6 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('6. Analyses Médicales, Imagerie & Numérisation (Scans)'),
          createHeading2('6.1. Objectifs & Utilité'),
          createParagraph('Permet de photographier ou numériser les bilans papier apportés par les patients pour qu\'ils ne soient plus jamais perdus.'),

          createHeading2('6.2. Procédure de numérisation pas-à-pas'),
          createStep(1, 'Aller dans l\'onglet Analyses', 'Dans le dossier du patient, cliquez sur l\'onglet 3 « Analyses & Examens ».'),
          createStep(2, 'Cliquer sur Saisir Résultats & Scan', 'En face de l\'analyse concernée, cliquez sur le bouton.'),
          createStep(3, 'Sélectionner le document ou Prendre une photo', 'Cliquez sur « 📁 Choisir un fichier » (PDF/Image jusqu\'à 25 Mo) ou sur « 📷 Scanner via Caméra » pour prendre une photo directe du document.'),
          createStep(4, 'Valider', 'Cliquez sur « Enregistrer les Résultats & le Scan ».'),
          createStep(5, 'Consulter', 'Cliquez sur « 👁️ Consulter le Scan » pour ouvrir le document dans la visionneuse plein écran intégrée.'),

          createScreenshotBox('Visionneuse plein écran de documents médicaux et fenêtre d\'upload avec caméra'),

          // ==================== CHAPITRE 7 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('7. Hospitalisation & Gestion des Lits'),
          createHeading2('7.1. Objectifs & Utilité'),
          createParagraph('Permet de visualiser instantanément les lits libres et occupés, de gérer les admissions et d\'assurer le suivi des séjours.'),

          createHeading2('7.2. Procédure d\'admission et de décharge'),
          createStep(1, 'Ouvrir Hospitalisation', 'Cliquez sur « Hospitalisation » dans le menu.'),
          createStep(2, 'Repérer un lit vert (Libre)', 'Visualisez la liste des chambres et lits disponibles.'),
          createStep(3, 'Enregistrer l\'admission', 'Cliquez sur « + Nouvelle Admission », sélectionnez le patient et le médecin traitant.'),
          createStep(4, 'Prononcer la sortie', 'À la fin de l\'hospitalisation, cliquez sur « Décharger / Sortie » pour libérer le lit.'),

          createScreenshotBox('Tableau de bord des lits avec code couleur vert (libre) et rouge (occupé)'),

          // ==================== CHAPITRE 8 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('8. Caisse, Facturation & Prises en Charge IPM (Tiers-Payant)'),
          createHeading2('8.1. Objectifs & Utilité'),
          createParagraph('Calcule automatiquement la part prise en charge par l\'IPM et la part restant due par le patient (ticket modérateur), réduisant à zéro les erreurs de calcul.'),

          createHeading2('8.2. Émettre une Facture et Encaisser'),
          createStep(1, 'Ouvrir la session de caisse', 'Saisissez le montant en caisse au démarrage le matin.'),
          createStep(2, 'Sélectionner le patient', 'Si le patient a une IPM, le système applique directement son taux de couverture (ex : 80%).'),
          createStep(3, 'Ajouter les prestations', 'Choisissez les actes médicaux dans la liste déroulante.'),
          createStep(4, 'Encaisser le règlement', 'Sélectionnez le mode de paiement (Espèces, Wave, Orange Money, Chèque) et enregistrez.'),
          createStep(5, 'Imprimer les reçus', 'Imprimez la « Facture Patient » pour le reçu ou la « Facture IPM » pour le remboursement.'),

          createScreenshotBox('Facturation automatique avec ventilation Tiers-Payant et encaissement'),

          // ==================== CHAPITRE 9 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('9. Envoi des Factures et Pièces Jointes par Email (Patients & IPM)'),
          createHeading2('9.1. Objectifs & Utilité'),
          createParagraph('Permet de transmettre en un clic la facture officielle et l\'ensemble des pièces justificatives médicales (ordonnances, scans d\'analyses, reçus) directement dans la boîte mail du patient ou du gestionnaire de l\'IPM.'),

          createHeading2('9.2. Procédure d\'envoi pas-à-pas'),
          createStep(1, 'Cliquer sur le bouton Mail', 'Sur la facture, cliquez sur le bouton bleu « ✉️ Mail » ou « Envoyer par Mail ».'),
          createStep(2, 'Choisir le Destinataire', 'Cliquez sur « 👤 Patient » ou « 🏢 IPM / Assurance » : l\'email et l\'objet officiel se remplissent automatiquement.'),
          createStep(3, 'Sélectionner l\'Expéditeur', 'Choisissez l\'adresse email de votre clinique (ex : Service Facturation).'),
          createStep(4, 'Cocher les justificatifs à joindre', 'Cochez la facture, les ordonnances et les scans d\'analyses du dossier.'),
          createStep(5, 'Ajouter un document complémentaire (facultatif)', 'Téléversez un bon de prise en charge avec « + Uploader Fichier / Scan ».'),
          createStep(6, 'Envoyer', 'Cliquez sur « Envoyer la Facture et les Pièces Jointes ».'),

          createScreenshotBox('Modale d\'envoi d\'email avec sélection du compte expéditeur et des pièces justificatives'),

          // ==================== CHAPITRE 10 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('10. Pharmacie & Gestion des Stocks'),
          createHeading2('10.1. Objectifs & Utilité'),
          createParagraph('Contrôle les stocks de médicaments, avertit des risques de péremption et décompte automatiquement les consommables utilisés.'),

          createHeading2('10.2. Enregistrer une entrée de stock'),
          createStep(1, 'Ouvrir Pharmacie & Stocks', 'Cliquez sur « Pharmacie & Stocks » dans le menu.'),
          createStep(2, 'Créer ou sélectionner le produit', 'Indiquez la désignation et le seuil d\'alerte.'),
          createStep(3, 'Saisir le lot fournisseur', 'Indiquez le numéro de lot, la date d\'expiration et la quantité reçue.'),
          createStep(4, 'Surveiller les alertes', 'Consultez la liste des produits en rouge pour réapprovisionner.'),

          createScreenshotBox('Tableau de bord de la pharmacie et suivi des lots avec alertes de péremption'),

          // ==================== CHAPITRE 11 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('11. Structure Médicale, Praticiens & Spécialités'),
          createHeading2('11.1. Objectifs & Utilité'),
          createParagraph('Permet de gérer l\'équipe médicale, les spécialités, les tarifs conventionnés et les plannings d\'intervention.'),

          createHeading2('11.2. Ajouter un Praticien'),
          createStep(1, 'Aller dans Structure & Équipe Médicale', 'Cliquez sur le module dans le menu vertical.'),
          createStep(2, 'Ajouter un médecin', 'Renseignez son nom, sa spécialité, son tarif de consultation et ses coordonnées.'),
          createStep(3, 'Valider', 'Le praticien apparaît aussitôt dans l\'agenda et les ordonnances.'),

          createScreenshotBox('Annuaire des praticiens et pôles de spécialités médicales'),

          // ==================== CHAPITRE 12 ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('12. Administration, Droits d\'Accès & Comptes SMTP'),
          createHeading2('12.1. Gestion des Utilisateurs & Matrice des Droits (RBAC)'),
          createParagraph('Dans « Paramètres & Configuration », les administrateurs peuvent créer les comptes d\'accès et définir précisément les droits de chaque collaborateur (Voir, Créer, Modifier, Supprimer) module par module.'),

          createScreenshotBox('Matrice fine des permissions d\'accès par utilisateur et par module'),

          createHeading2('12.2. Configuration des Serveurs de Messagerie SMTP (OVH, Gmail, etc.)'),
          createParagraph('Pour envoyer les factures depuis vos propres adresses emails officielles :'),
          createStep(1, 'Ouvrir Paramètres & Configuration', 'Cliquez sur « Paramètres & Configuration » dans le menu.'),
          createStep(2, 'Cliquer sur Nouveau Compte SMTP', 'Dans la section « 📧 Serveurs & Comptes Expéditeurs SMTP », cliquez sur le bouton bleu.'),
          createStep(3, 'Utiliser le préréglage', 'Cliquez sur « OVH Mail » (remplit automatiquement ssl0.ovh.net et le port 465 SSL).'),
          createStep(4, 'Entrer vos identifiants', 'Saisissez votre email complet et votre mot de passe.'),
          createStep(5, 'Tester la connexion', 'Cliquez sur « Test » pour valider la liaison avec le serveur SMTP.'),
          createStep(6, 'Enregistrer', 'Cochez « Définir par défaut » et enregistrez.'),

          createScreenshotBox('Formulaire d\'ajout de compte SMTP avec bouton de test de connexion en direct'),

          // ==================== FICHES MÉMO ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('13. Fiches Mémo Pratiques par Rôle Métier'),

          createHeading2('📋 Fiche Mémo 1 : Agent d\'Accueil / Réceptionniste'),
          createParagraph('• Patient entrant : Chercher son nom dans « Patients & DPI ». Créer sa fiche si nouveau.'),
          createParagraph('• Prise de rendez-vous : Choisir le médecin et le créneau dans « Agenda & RDV ».'),
          createParagraph('• Orientation : Noter le statut (Ambulatoire / Hospitalisé) et guider le patient.'),

          createHeading2('🩺 Fiche Mémo 2 : Médecin / Praticien'),
          createParagraph('• Consultation : Ouvrir le « Dossier DPI 360° » et cliquer sur « + Nouvelle Consultation ».'),
          createParagraph('• Saisie : Utiliser le micro « 🎙️ » pour dicter les observations médicales.'),
          createParagraph('• Ordonnance : Ajouter les médicaments et imprimer l\'ordonnance sécurisée avec QR code.'),
          createParagraph('• Analyses : Consulter l\'onglet 3 pour voir les scans des examens de laboratoire.'),

          createHeading2('💵 Fiche Mémo 3 : Caissier / Agent de Facturation'),
          createParagraph('• Début de journée : Ouvrir la session de caisse avec le fond initial.'),
          createParagraph('• Facturation : Sélectionner le patient. Le calcul Part Patient / Part IPM est automatique.'),
          createParagraph('• Encaissement : Choisir le mode de paiement et remettre le reçu imprimé.'),
          createParagraph('• Envoi électronique : Cliquer sur « Mail » pour transmettre la facture à l\'IPM ou au patient.'),
          createParagraph('• Fin de journée : Clôturer la caisse et imprimer le rapport récapitulatif.'),

          createHeading2('📦 Fiche Mémo 4 : Pharmacien / Gestionnaire de Stock'),
          createParagraph('• Réception : Enregistrer les lots avec dates d\'expiration.'),
          createParagraph('• Suivi : Contrôler la liste rouge des produits en alerte rupture.'),

          createHeading2('⚙️ Fiche Mémo 5 : Administrateur de la Clinique'),
          createParagraph('• Utilisateurs : Créer les comptes et ajuster les droits d\'accès.'),
          createParagraph('• Paramètres généraux : Vérifier le cachet officiel, le logo et les comptes SMTP.')
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Guide_Utilisation_SoftMed.docx');
  fs.writeFileSync(outputPath, buffer);
  // Also write to old filename for backwards compatibility
  fs.writeFileSync(path.join(__dirname, '..', 'Guide_Utilisation_SoftMed_Enterprise.docx'), buffer);
  console.log(`[SUCCÈS] Guide Word régénéré avec logos préservés dans : ${outputPath}`);
  return outputPath;
}

buildUserGuide().catch(err => {
  console.error('Erreur lors de la génération du guide :', err);
});
