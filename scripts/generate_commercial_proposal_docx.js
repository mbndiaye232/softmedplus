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
    spacing: { before: 480, after: 240 },
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
    spacing: { after: 130, line: 280 }
  });
}

function createFeatureCard(title, benefit, description) {
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
                    text: title + ' ',
                    bold: true,
                    size: 22,
                    font: 'Segoe UI',
                    color: '0D2B45'
                  }),
                  new TextRun({
                    text: `[${benefit}]`,
                    bold: true,
                    size: 20,
                    font: 'Segoe UI',
                    color: '059669'
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: description,
                    size: 21,
                    font: 'Segoe UI',
                    color: '334155'
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
              left: { style: BorderStyle.SINGLE, size: 16, color: '1D4ED8' },
              top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
              right: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' }
            },
            margins: { top: 120, bottom: 120, left: 180, right: 150 }
          })
        ]
      })
    ]
  });
}

function createHighlightBox(title, text) {
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
                    text: title,
                    bold: true,
                    size: 22,
                    font: 'Segoe UI',
                    color: '0D2B45'
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: text,
                    size: 21,
                    font: 'Segoe UI',
                    color: '1E293B'
                  })
                ],
                spacing: { before: 80 }
              })
            ],
            shading: {
              type: ShadingType.CLEAR,
              fill: 'EFF6FF'
            },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 20, color: '1D4ED8' },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE }
            },
            margins: { top: 140, bottom: 140, left: 200, right: 160 }
          })
        ]
      })
    ]
  });
}

async function buildProposalDocx() {
  console.log('Génération de la Proposition Commerciale avec logos officiels et proportions 1:1...');

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
                    text: 'Soft Services Technologiques • SoftMed • Offre Commerciale',
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
          // ==================== PAGE DE GARDE ====================
          new Paragraph({ text: '', spacing: { before: 150 } }),

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
                text: 'PROPOSITION COMMERCIALE & TECHNIQUE',
                size: 36,
                bold: true,
                color: '0D2B45'
              })
            ],
            spacing: { before: 200, after: 120 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Transformation Digitale & Excellence Opérationnelle des Établissements de Santé',
                size: 24,
                color: '1D4ED8',
                bold: true
              })
            ],
            spacing: { after: 250 }
          }),

          createHighlightBox(
            '🌟 L\'Écosystème Médical Intégré Nouvelle Génération',
            'SoftMed réinvente la gestion des cliniques, polycliniques et cabinets médicaux en fusionnant l\'Intelligence Artificielle médicale, la sécurisation anti-fraude des prescriptions, la gestion financière Tiers-Payant (IPM) et la télétransmission automatisée en temps réel.'
          ),

          new Paragraph({ text: '', spacing: { before: 350 } }),

          // Proposal Info Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Destinataire : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'Direction Générale, Médecins-Chefs & Gestionnaires de Cliniques\n' }),
                          new TextRun({ text: 'Émetteur : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'Soft Services Technologiques (SST) — Pôle Santé Numérique\n' }),
                          new TextRun({ text: 'Solution : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'SoftMed — Version 2.0 Cloud Multi-Tenant\n' }),
                          new TextRun({ text: 'Contact : ', bold: true, color: '0D2B45' }),
                          new TextRun({ text: 'contact@sst.best | mbndiaye@sst.best' })
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

          // ==================== EXECUTIVE SUMMARY ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('1. Résumé Exécutif & Vision Stratégique'),
          createParagraph('Dans un environnement médical où les exigences de rapidité, de traçabilité médico-légale et de rigueur financière sont devenues primordiales, les établissements de santé sont confrontés à des défis majeurs :'),
          createParagraph('• Pertes ou dispersion des dossiers médicaux papier et des résultats d\'analyses de laboratoire.'),
          createParagraph('• Complexité et retards massifs dans le recouvrement des factures Tiers-Payant (IPM, Assurances, Mutuelles).'),
          createParagraph('• Risques croissants de fraudes et d\'altérations sur les ordonnances et feuilles de soins.'),
          createParagraph('• Surcharge administrative des médecins lors de la saisie des comptes-rendus de consultation.'),

          createHighlightBox(
            '💡 La Réponse SoftMed',
            'SoftMed apporte une réponse globale, clé en main et immédiatement opérationnelle. Pensé avec et pour les praticiens, il modernise l\'ensemble du parcours patient, décharge le personnel soignant des tâches répétitives et sécurise 100% des revenus de la clinique.'
          ),

          // ==================== VALEUR MÉDICALE ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('2. Ce que SoftMed apporte aux Praticiens & Soignants'),

          createFeatureCard(
            '🩺 Dossier Patient Informatisé 360° (DPI)',
            'Gain de temps clinique : +40%',
            'Accès instantané à l\'historique médical complet du patient en 1 clic : antécédents, allergies médicamenteuses en alerte rouge, suivi des constantes vitales (TA, Pouls, Glycémie, IMC) et historique chronologique de toutes les consultations passées.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '🎙️ Dictée Vocale Intelligente par IA Médicale',
            'Saisie ultra-rapide sans frappe clavier',
            'Le praticien dicte librement ses observations, motifs et diagnostics : notre moteur d\'IA médicale structure automatiquement le compte-rendu et pré-remplit l\'ordonnance sans aucun effort de saisie manuelle.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '🔒 Ordonnances Médicales Sécurisées & Anti-Fraude (QR Code)',
            'Sécurité médico-légale absolue',
            'Chaque ordonnance émise comporte une signature cryptographique et un QR code officiel infalsifiable. Les pharmaciens et organismes payeurs peuvent vérifier l\'authenticité de la prescription instantanément en ligne.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '📋 Renouvellement et Duplication en 1 Clic',
            'Fluidité pour les patients chroniques',
            'Pour les renouvellements d\'ordonnances (HTA, Diabète...), le médecin recharge le traitement précédent en un clic, avec possibilité d\'ajuster les posologies et de réimprimer immédiatement.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '📂 Zéro Perte d\'Analyses : Numérisation & Visionneuse Intégrée',
            'Archivage à vie des bilans et imageries',
            'Finie la perte des résultats papier : numérisez ou prenez en photo les bilans de laboratoire et radiographies (fichiers jusqu\'à 25 Mo). Le praticien consulte les scans directement en plein écran dans le dossier.'
          ),

          // ==================== VALEUR FINANCIÈRE ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('3. Ce que SoftMed apporte à la Direction Financière & Caisse'),

          createFeatureCard(
            '🧾 Facturation Tiers-Payant (IPM / Assurances) Automatisée',
            'Zéro erreur de calcul et zéro rejet',
            'Détection automatique de l\'organisme payeur (IPM SONATEL, AXA, ASKIA...) et calcul instantané de la quote-part : le système ventile avec exactitude le montant couvert par l\'IPM et le reste à charge patient (ticket modérateur).'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '✉️ Télétransmission Immédiate des Factures et Pièces Jointes par Email',
            'Accélération du recouvrement : x3',
            'Envoi électronique en un clic de la facture officielle, des ordonnances, des scans de résultats et des justificatifs médicaux directement à l\'IPM et au patient, réduisant le délai de paiement de plusieurs semaines à quelques jours.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '📧 Envoi avec vos Propres Serveurs SMTP Officiels (OVH / Gmail)',
            'Image de marque et confiance institutionnelle',
            'Chaque clinique configure ses propres comptes de messagerie (ex : facturation@clinique-espoir.sn) avec signature officielle et cachet horodaté pour une crédibilité maximale auprès des assureurs.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '💳 Intégration Native des Paiements Mobile Money (Wave / Orange Money)',
            'Encaissement moderne et sécurisé',
            'Support complet des règlements par Wave, Orange Money, Espèces, Chèques et Virements. Génération de reçus avec QR codes de paiement et traçabilité inviolable contre les écarts de caisse.'
          ),

          // ==================== VALEUR GESTIONNAIRES ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('4. Ce que SoftMed apporte à la Gestion & Logistique'),

          createFeatureCard(
            '🛏️ Gestion Hospitalière & Occupation des Lits en Temps Réel',
            'Optimisation du taux de remplissage',
            'Cartographie visuelle des bâtiments, chambres et lits avec code couleur dynamique (Libre / Occupé / En Entretien), gestion fluide des admissions, transferts et décharges.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '📦 Pharmacie Hospitalière & Traçabilité des Lots',
            'Zéro rupture et zéro produit périmé',
            'Gestion des entrées de stocks, suivi des numéros de lots et des dates d\'expiration, alertes automatiques de seuil critique et décompte automatique lors des soins.'
          ),
          new Paragraph({ text: '', spacing: { after: 100 } }),

          createFeatureCard(
            '🔐 Matrice Fine des Droits d\'Accès (RBAC)',
            'Protection et confidentialité médicale',
            'Définition précise des droits utilisateur par utilisateur (Accueil, Médecin, Caissier, Pharmacien, Admin) avec contrôle strict des actions de visualisation, création, modification et suppression.'
          ),

          // ==================== SOUVERAINETÉ & INFRASTRUCTURE ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('5. Sécurité, Souveraineté & Architecture Technique'),
          createParagraph('La sécurité des données de santé est au cœur de l\'architecture SoftMed :'),
          createParagraph('• Hébergement Haute Disponibilité en Cloud Sécurisé OVH avec chiffrement SSL/TLS de bout en bout.'),
          createParagraph('• Isolation Stricte Multi-Tenant (Row-Level Security) : chaque clinique dispose d\'un espace étanche inaccessible aux tiers.'),
          createParagraph('• Sauvegardes Automatiques Quotidiennes redondées sur plusieurs centres de données sécurisés.'),
          createParagraph('• Conformité Réglementaire : Respect des normes de protection des données personnelles (CDP Loi 2008-12 et standards internationaux).'),
          createParagraph('• Disponibilité 99.9% et accessibilité multi-supports (PC, Mac, Tablettes, Smartphones).'),

          // ==================== OFFRE & ACCOMPAGNEMENT ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('6. Offre de Déploiement & Accompagnement Clé en Main'),
          createParagraph('Soft Services Technologiques (SST) s\'engage à vos côtés pour garantir un déploiement fluide et sans interruption de service :'),

          createHeading2('6.1. Nos Engagements de Service (SLA)'),
          createParagraph('1. Audit & Paramétrage Personnalisé : Intégration de votre logo, cachet officiel, tarifs conventionnés et comptes emails.'),
          createParagraph('2. Formation Interactive des Équipes : Sessions pratiques sur site et à distance pour les soignants, caissiers et secrétaires.'),
          createParagraph('3. Migration & Reprise des Données : Importation sécurisée de votre fichier patient existant.'),
          createParagraph('4. Support Dédié 7j/7 : Assistance téléphonique et télémaintenance réactive prioritaire.'),
          createParagraph('5. Mises à Jour & Évolutions Continues : Bénéficiez automatiquement des nouvelles fonctionnalités sans surcoût.'),

          new Paragraph({ text: '', spacing: { before: 200 } }),

          // Pricing & Proposal Summary Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: 'Prestation / Module', bold: true, color: 'FFFFFF' })],
                    shading: { type: ShadingType.CLEAR, fill: '0D2B45' }
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Inclus dans l\'Offre SoftMed', bold: true, color: 'FFFFFF' })],
                    shading: { type: ShadingType.CLEAR, fill: '0D2B45' }
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Dossier Patient Informatisé (DPI 360°)' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus en illimité', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Dictée Vocale Intelligente par IA Médicale' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus avec transcription temps réel', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Ordonnances Sécurisées avec QR Code Anti-Fraude' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus avec vérification cryptographique', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Numérisation et Visionneuse d\'Analyses & Imagerie' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus (PDF/Images jusqu\'à 25 Mo)', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Facturation Tiers-Payant IPM & Télétransmission Email' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus avec vos propres serveurs SMTP', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Caisse & Paiements Mobiles (Wave / OM / Espèces)' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus avec clôture de caisse infalsifiable', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Hospitalisation, Lits & Pharmacie de Stock' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus avec suivi des péremptions', bold: true, color: '059669' })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Hébergement Cloud OVH, Sauvegardes & Support 7j/7' })] }),
                  new TableCell({ children: [new Paragraph({ text: '✅ Inclus dans l\'abonnement SaaS', bold: true, color: '059669' })] })
                ]
              })
            ]
          }),

          // ==================== CONCLUSION & CONTACT ====================
          new Paragraph({ pageBreakBefore: true }),
          createHeading1('7. Contact & Prochaines Étapes'),
          createParagraph('Pour propulser votre établissement vers l\'excellence médicale et opérationnelle, notre équipe d\'ingénieurs et de consultants médicaux se tient à votre entière disposition pour une démonstration personnalisée et la mise en place d\'un environnement pilote.'),

          new Paragraph({ text: '', spacing: { before: 200 } }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'Soft Services Technologiques (SST)\n', bold: true, size: 24, color: '0D2B45' }),
                          new TextRun({ text: 'Direction Commerciale & Projets Médicaux\n', bold: true, size: 20, color: '1D4ED8' }),
                          new TextRun({ text: '📧 Email : contact@sst.best | mbndiaye@sst.best\n' }),
                          new TextRun({ text: '🌐 Web : www.sst.best\n' }),
                          new TextRun({ text: '📍 Dakar, Sénégal — Déploiements Régionaux UEMOA & Afrique' })
                        ],
                        spacing: { line: 320 }
                      })
                    ],
                    shading: { type: ShadingType.CLEAR, fill: 'EFF6FF' },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 8, color: '1D4ED8' },
                      bottom: { style: BorderStyle.SINGLE, size: 8, color: '1D4ED8' },
                      left: { style: BorderStyle.SINGLE, size: 8, color: '1D4ED8' },
                      right: { style: BorderStyle.SINGLE, size: 8, color: '1D4ED8' }
                    },
                    margins: { top: 180, bottom: 180, left: 200, right: 200 }
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Proposition_Commerciale_SoftMed.docx');
  fs.writeFileSync(outputPath, buffer);
  // Also write to old filename for backwards compatibility
  fs.writeFileSync(path.join(__dirname, '..', 'Proposition_Commerciale_SoftMed_Enterprise.docx'), buffer);
  console.log(`[SUCCÈS] Proposition Commerciale Word régénérée avec logos préservés dans : ${outputPath}`);
  return outputPath;
}

buildProposalDocx().catch(err => {
  console.error('Erreur lors de la génération de la proposition :', err);
});
