const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { downloadFile } = require('./storage');

// Plafond cumulé des pièces jointes d'un message. Au-delà, les documents restants
// sont laissés sous forme de liens plutôt que de faire rejeter tout l'email.
const MAX_TOTAL_ATTACHMENT_BYTES = 15 * 1024 * 1024;

/**
 * Creates and returns a nodemailer transporter based on custom tenant config or environment settings.
 */
function getTransporter(customConfig = null) {
  let host, port, user, pass, secure;

  if (customConfig && customConfig.smtp_host && customConfig.smtp_user && customConfig.smtp_password) {
    host = customConfig.smtp_host.trim();
    port = parseInt(customConfig.smtp_port, 10) || 465;
    user = customConfig.smtp_user.trim();
    pass = customConfig.smtp_password;
    secure = customConfig.smtp_secure !== undefined ? !!customConfig.smtp_secure : (port === 465);
  } else {
    host = process.env.SMTP_HOST;
    port = parseInt(process.env.SMTP_PORT, 10) || 587;
    user = process.env.SMTP_USER;
    pass = process.env.SMTP_PASS;
    secure = process.env.SMTP_SECURE === 'true' || port === 465;
  }

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });
  }

  // If SMTP is not configured, return null for simulation
  return null;
}

/**
 * Tests an SMTP connection and sends an optional test email
 */
async function testSmtpConnection(config, testRecipient) {
  const transporter = getTransporter(config);
  if (!transporter) {
    throw new Error('Paramètres SMTP incomplets (Hôte, Utilisateur et Mot de passe requis)');
  }

  // 1. Verify connection
  await transporter.verify();

  // 2. If test recipient provided, send a confirmation test email
  let sendResult = null;
  if (testRecipient && testRecipient.includes('@')) {
    const fromName = config.from_name || 'Clinique SoftMed';
    const fromEmail = config.from_email || config.smtp_user;
    const fromStr = `"${fromName}" <${fromEmail}>`;

    sendResult = await transporter.sendMail({
      from: fromStr,
      to: testRecipient,
      subject: `[Test Réussi] Validation du compte SMTP ${config.account_name || fromEmail}`,
      html: `
        <div style="font-family:sans-serif; max-width:600px; margin:0 auto; padding:20px; border:1px solid #e2e8f0; border-radius:8px;">
          <h2 style="color:#2563eb;">✅ Connexion SMTP Opérationnelle</h2>
          <p>Félicitations ! Vos paramètres d'envoi d'emails pour la clinique sont correctement configurés.</p>
          <ul style="color:#334155; font-size:14px; line-height:1.6;">
            <li><strong>Nom du compte :</strong> ${config.account_name || 'Compte Principal'}</li>
            <li><strong>Adresse d'expédition :</strong> ${fromEmail}</li>
            <li><strong>Serveur SMTP :</strong> ${config.smtp_host}:${config.smtp_port}</li>
            <li><strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR')}</li>
          </ul>
          <div style="background:#eff6ff; padding:10px 15px; border-radius:6px; font-size:13px; color:#1e40af; margin-top:15px;">
            Vos factures, ordonnances et justificatifs médicaux seront désormais envoyés aux patients et aux IPM avec ce compte de confiance.
          </div>
        </div>
      `
    });
  }

  return {
    success: true,
    message: 'Connexion au serveur SMTP réussie avec succès !',
    messageId: sendResult ? sendResult.messageId : null
  };
}

/**
 * Formats a currency amount in XOF (FCFA)
 */
function formatFCFA(amount) {
  return (parseFloat(amount) || 0).toLocaleString('fr-FR') + ' FCFA';
}

/**
 * Generates rich HTML email template for Invoices with Attached Justifications
 */
function generateInvoiceEmailHtml({
  tenant,
  invoice,
  patient,
  insurance,
  lines = [],
  payments = [],
  recipientType = 'PATIENT',
  customMessage = '',
  attachedFiles = []
}) {
  const clinicName = tenant?.name || 'Clinique Médicale';
  const clinicAddress = tenant?.address || '';
  const clinicPhone = tenant?.phone_number || '';
  const clinicEmail = tenant?.email || '';
  const clinicNinea = tenant?.ninea_rc ? `NINEA/RC: ${tenant.ninea_rc}` : '';

  const patientName = `${patient?.first_name || ''} ${patient?.last_name || ''}`.trim() || 'Patient';
  const patientCode = patient?.patient_code || 'SM-0000';
  const invoiceNum = invoice.invoice_number || `FAC-${invoice.id.substring(0, 8).toUpperCase()}`;
  const issueDateStr = invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR');
  const dueDateStr = invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('fr-FR') : 'À réception';

  const grossAmount = parseFloat(invoice.total_amount_gross || 0);
  const discountAmount = parseFloat(invoice.discount_amount || 0);
  const netAmount = parseFloat(invoice.total_amount_net || 0);
  const patientShare = parseFloat(invoice.patient_share_amount || 0);
  const insuranceShare = parseFloat(invoice.insurance_share_amount || 0);
  const patientPaid = parseFloat(invoice.patient_paid_amount || 0);
  const insurancePaid = parseFloat(invoice.insurance_paid_amount || 0);
  const totalPaid = patientPaid + insurancePaid;
  const remainingBalance = Math.max(0, netAmount - totalPaid);

  const statusLabel = invoice.status === 'PAID' ? 'RÉGLÉE / PAYÉE' : (invoice.status === 'PARTIALLY_PAID' ? 'PARTIELLEMENT RÉGLÉE' : (invoice.status === 'OVERDUE' ? 'EN RETARD' : 'ÉMISE / EN ATTENTE'));
  const statusBg = invoice.status === 'PAID' ? '#10b981' : (invoice.status === 'PARTIALLY_PAID' ? '#3b82f6' : (invoice.status === 'OVERDUE' ? '#ef4444' : '#f59e0b'));

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 25px 30px; }
    .clinic-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; margin: 0; color: #ffffff; }
    .clinic-sub { font-size: 13px; color: #bfdbfe; margin-top: 4px; }
    .content { padding: 25px 30px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; }
    .card-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 15px; }
    .box-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .box-val { font-size: 14px; font-weight: 600; color: #1e293b; }
    table.data-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
    table.data-table th { background: #f1f5f9; color: #475569; font-weight: 700; text-align: left; padding: 10px 12px; border-bottom: 2px solid #cbd5e1; }
    table.data-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #334155; }
    .totals-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-top: 20px; }
    .attachments-section { margin-top: 25px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; }
    .att-item { display: flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px solid #dbeafe; margin-top: 6px; font-size: 13px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 30px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <table style="width: 100%;">
        <tr>
          <td>
            <h1 class="clinic-title">${clinicName}</h1>
            <div class="clinic-sub">${clinicAddress ? `${clinicAddress} • ` : ''}${clinicPhone ? `Tél: ${clinicPhone}` : ''}</div>
            ${clinicNinea ? `<div class="clinic-sub" style="font-size:11px;">${clinicNinea}</div>` : ''}
          </td>
          <td style="text-align: right; vertical-align: top;">
            <div style="font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">FACTURE MÉDICALE</div>
            <div style="font-size: 13px; color: #93c5fd; margin-top: 2px;">N° ${invoiceNum}</div>
            <div style="margin-top: 8px;"><span class="badge" style="background: ${statusBg};">${statusLabel}</span></div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div class="content">
      ${customMessage ? `
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px 16px; margin-bottom:20px; font-size:13px; color:#166534;">
          <strong>Message de la clinique :</strong><br />
          ${customMessage.replace(/\n/g, '<br />')}
        </div>
      ` : ''}

      <!-- Identity Grid -->
      <table style="width: 100%; margin-bottom: 15px;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 10px;">
            <div class="card-box">
              <div class="box-title">Destinataire / Patient</div>
              <div class="box-val">${patientName}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 3px;">
                Identifiant : <strong>${patientCode}</strong><br />
                ${patient?.phone_number ? `Tél : ${patient.phone_number}<br />` : ''}
                ${patient?.email ? `Email : ${patient.email}` : ''}
              </div>
            </div>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 10px;">
            <div class="card-box">
              <div class="box-title">Organisme Tiers-Payant / IPM</div>
              <div class="box-val">${insurance?.name ? insurance.name : 'Règlement Direct Patient (Comptant)'}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 3px;">
                ${insurance?.code ? `Code IPM : <strong>${insurance.code}</strong><br />` : ''}
                ${invoice.policy_number ? `N° Police/Adhérent : ${invoice.policy_number}<br />` : ''}
                Date d'émission : ${issueDateStr}<br />
                Date d'échéance : ${dueDateStr}
              </div>
            </div>
          </td>
        </tr>
      </table>

      <!-- Invoice Lines Table -->
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 50%;">Prestation / Acte Médical</th>
            <th style="text-align: center; width: 15%;">Qté</th>
            <th style="text-align: right; width: 17%;">Prix Unitaire</th>
            <th style="text-align: right; width: 18%;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${lines.map(l => `
            <tr>
              <td>
                <strong>${l.description || l.service_name || 'Acte Médical'}</strong>
                ${l.service_code ? `<br /><span style="font-size:11px; color:#64748b;">Code: ${l.service_code}</span>` : ''}
              </td>
              <td style="text-align: center;">${l.quantity || 1}</td>
              <td style="text-align: right;">${formatFCFA(l.unit_price)}</td>
              <td style="text-align: right; font-weight: 600;">${formatFCFA(l.total_line_amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Totals & Co-Payment Split -->
      <table style="width: 100%; margin-top: 20px;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 15px;">
            ${payments && payments.length > 0 ? `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px;">
                <div class="box-title" style="color:#059669;">Historique des Règlements</div>
                ${payments.map(p => `
                  <div style="font-size:12px; color:#334155; padding:3px 0; border-bottom:1px dashed #e2e8f0;">
                    • ${new Date(p.payment_date).toLocaleDateString('fr-FR')} : <strong>${formatFCFA(p.amount)}</strong> (${p.payment_method}${p.transaction_reference ? ` - Ref: ${p.transaction_reference}` : ''})
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </td>
          <td style="width: 50%; vertical-align: top;">
            <div class="totals-box">
              <table style="width: 100%; font-size: 13px; color: #475569;">
                <tr><td>Montant Brut :</td><td style="text-align:right; font-weight:600;">${formatFCFA(grossAmount)}</td></tr>
                ${discountAmount > 0 ? `<tr><td style="color:#ef4444;">Remise accordée :</td><td style="text-align:right; color:#ef4444; font-weight:600;">- ${formatFCFA(discountAmount)}</td></tr>` : ''}
                <tr><td style="font-weight:700; color:#1e293b; padding-top:4px;">Total Net à Payer :</td><td style="text-align:right; font-weight:700; color:#1e293b; padding-top:4px;">${formatFCFA(netAmount)}</td></tr>
                ${insuranceShare > 0 ? `
                  <tr style="color:#2563eb; font-weight:600;"><td style="padding-top:4px;">Part Prise en Charge IPM :</td><td style="text-align:right; padding-top:4px;">${formatFCFA(insuranceShare)}</td></tr>
                  <tr style="color:#059669; font-weight:600;"><td>Part Ticket Modérateur Patient :</td><td style="text-align:right;">${formatFCFA(patientShare)}</td></tr>
                ` : ''}
                <tr style="border-top: 1px solid #cbd5e1; font-weight:700; color:#16a34a;"><td style="padding-top:6px;">Total Déjà Réglé :</td><td style="text-align:right; padding-top:6px;">${formatFCFA(totalPaid)}</td></tr>
                <tr style="font-size:15px; font-weight:800; color:${remainingBalance > 0 ? '#b91c1c' : '#15803d'};">
                  <td style="padding-top:6px;">Solde Restant Dû :</td>
                  <td style="text-align:right; padding-top:6px;">${formatFCFA(remainingBalance)}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <!-- Attached Justifications & Medical Documents Section -->
      ${attachedFiles && attachedFiles.length > 0 ? `
        <div class="attachments-section">
          <div style="font-weight: 700; font-size: 14px; color: #1e40af; margin-bottom: 8px;">
            📎 Justificatifs Médicaux (${attachedFiles.length}) :
          </div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
            ${attachedFiles.some(a => a.attached)
              ? 'Les documents marqués « Pièce jointe » sont joints à cet email. Les autres restent accessibles par lien sécurisé.'
              : 'Les documents suivants sont accessibles par lien sécurisé :'}
          </div>
          ${attachedFiles.map(att => `
            <div class="att-item">
              <span style="font-size:16px;">📄</span>
              <div style="flex:1;">
                <strong>${att.name || 'Document Médical'}</strong>
                ${att.type ? `<span style="font-size:11px; color:#64748b; margin-left:6px;">(${att.type})</span>` : ''}
              </div>
              ${att.attached
                ? `<span style="color:#15803d; font-weight:600; font-size:12px;">Pièce jointe</span>`
                : (att.url ? `<a href="${att.url}" target="_blank" style="color:#2563eb; text-decoration:none; font-weight:600; font-size:12px;">Consulter / Télécharger</a>` : '')}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <!-- Footer -->
    <div class="footer">
      <div>Ce document est généré de manière sécurisée par le système médical <strong>${clinicName}</strong>.</div>
      <div style="margin-top: 4px;">Pour toute question concernant cette facture ou les prises en charge IPM, contactez le service comptabilité au <strong>${clinicPhone || clinicEmail || 'standard'}</strong>.</div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends an email with the invoice and attached medical justification files
 */
async function sendInvoiceEmail({
  tenant,
  invoice,
  patient,
  insurance,
  lines,
  payments,
  recipientEmail,
  recipientType = 'PATIENT',
  customSubject = '',
  customMessage = '',
  attachedDocuments = [],
  smtpAccount = null
}) {
  if (!recipientEmail) {
    throw new Error('Adresse email du destinataire obligatoire');
  }

  const invoiceNum = invoice.invoice_number || `FAC-${invoice.id.substring(0, 8).toUpperCase()}`;
  const clinicName = tenant?.name || 'Clinique Médicale';
  const defaultSubject = recipientType === 'IPM'
    ? `[Bordereau & Facture IPM] ${clinicName} - Facture N° ${invoiceNum} (Patient: ${patient?.first_name} ${patient?.last_name})`
    : `[Facture Médicale] ${clinicName} - Facture N° ${invoiceNum}`;

  const subject = customSubject.trim() || defaultSubject;

  const transporter = getTransporter(smtpAccount);

  // Constitution des pièces jointes réelles : les documents médicaux sont téléchargés
  // depuis leur lieu de stockage (R2 ou disque local) et attachés au message.
  // Les entrées marquées `link_only` (ex. lien de vérification d'ordonnance) ne
  // correspondent à aucun fichier et restent de simples liens dans le corps du mail.
  const mailAttachments = [];
  let totalBytes = 0;

  for (const doc of attachedDocuments) {
    doc.attached = false;

    if (doc.link_only) continue;

    if (doc.path && fs.existsSync(doc.path)) {
      const stat = fs.statSync(doc.path);
      if (totalBytes + stat.size > MAX_TOTAL_ATTACHMENT_BYTES) {
        console.warn(`[MAIL] ${doc.name} non joint : plafond de ${MAX_TOTAL_ATTACHMENT_BYTES} octets atteint.`);
        continue;
      }
      totalBytes += stat.size;
      mailAttachments.push({ filename: doc.name || path.basename(doc.path), path: doc.path });
      doc.attached = true;
      continue;
    }

    if (!doc.url) continue;

    const file = await downloadFile(doc.url);
    if (!file) {
      console.warn(`[MAIL] ${doc.name || doc.url} introuvable : envoyé sous forme de lien.`);
      continue;
    }
    if (totalBytes + file.buffer.length > MAX_TOTAL_ATTACHMENT_BYTES) {
      console.warn(`[MAIL] ${doc.name} non joint : plafond de ${MAX_TOTAL_ATTACHMENT_BYTES} octets atteint.`);
      continue;
    }

    totalBytes += file.buffer.length;
    mailAttachments.push({
      filename: doc.name || path.basename(new URL(doc.url).pathname) || 'document',
      content: file.buffer,
      ...(file.contentType ? { contentType: file.contentType } : {})
    });
    doc.attached = true;
  }

  // Le corps du message est généré APRÈS la constitution des pièces jointes, afin
  // d'annoncer exactement ce qui est réellement joint et ce qui reste un lien.
  const html = generateInvoiceEmailHtml({
    tenant,
    invoice,
    patient,
    insurance,
    lines,
    payments,
    recipientType,
    customMessage,
    attachedFiles: attachedDocuments
  });

  const attachedCount = mailAttachments.length;
  const linkedCount = attachedDocuments.length - attachedCount;

  // Determine sender display and address
  let fromAddress;
  if (smtpAccount && smtpAccount.from_email) {
    const senderName = smtpAccount.from_name || clinicName;
    fromAddress = `"${senderName}" <${smtpAccount.from_email}>`;
  } else {
    fromAddress = process.env.SMTP_FROM || `"${clinicName}" <${tenant?.email || 'facturation@softmed.sn'}>`;
  }

  if (transporter) {
    console.log(`[MAIL] Sending invoice ${invoiceNum} via SMTP (${smtpAccount?.from_email || 'Default'}) to ${recipientEmail} — ${attachedCount} pièce(s) jointe(s) réelle(s) (${Math.round(totalBytes / 1024)} Ko), ${linkedCount} lien(s)...`);
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      ...(smtpAccount?.reply_to_email ? { replyTo: smtpAccount.reply_to_email } : {}),
      subject,
      html,
      attachments: mailAttachments
    });

    // accepted / rejected / response = verdict réel du serveur SMTP, indispensable pour
    // distinguer « le serveur a accepté le message » de « rien n'est parti ».
    console.log(`[MAIL] Sent. MessageId: ${info.messageId} | accepted: ${JSON.stringify(info.accepted)} | rejected: ${JSON.stringify(info.rejected)} | response: ${info.response}`);
    return {
      success: true,
      messageId: info.messageId,
      simulated: false,
      sender: fromAddress,
      recipient: recipientEmail,
      accepted: info.accepted || [],
      rejected: info.rejected || [],
      response: info.response || null,
      attachedCount,
      linkedCount,
      attachmentsBytes: totalBytes
    };
  } else {
    // Aucun transport utilisable (hôte, utilisateur ou mot de passe manquant) : RIEN n'est envoyé.
    // L'appelant doit traiter ce cas comme un échec, jamais comme un succès.
    console.warn(`[MAIL-SIMULATOR] Aucun transport SMTP utilisable — email NON envoyé (destinataire: ${recipientEmail}, sujet: "${subject}").`);
    return {
      success: false,
      messageId: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      simulated: true,
      sender: fromAddress,
      recipient: recipientEmail,
      accepted: [],
      rejected: [recipientEmail],
      attachedCount,
      linkedCount,
      note: "Aucun email n'a réellement été envoyé : les paramètres SMTP (hôte, utilisateur, mot de passe) sont incomplets. Configurez le compte dans Paramètres → Comptes de messagerie."
    };
  }
}

/**
 * Sends a Password Reset Link email to a user
 */
async function sendPasswordResetEmail({ recipientEmail, userName, resetUrl, tenantName, customConfig }) {
  const transporter = getTransporter(customConfig);
  const clinicName = tenantName || 'SoftMed Santé';
  const subject = `Réinitialisation de votre mot de passe — ${clinicName}`;

  let fromAddress;
  if (customConfig && customConfig.from_email) {
    const senderName = customConfig.from_name || clinicName;
    fromAddress = `"${senderName}" <${customConfig.from_email}>`;
  } else {
    fromAddress = process.env.SMTP_FROM || `"${clinicName}" <support@softmed.sn>`;
  }

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #1e40af, #2563eb); color: #ffffff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    .intro { font-size: 14.5px; color: #475569; margin-bottom: 24px; }
    .btn-container { text-align: center; margin: 30px 0; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35); }
    .link-alt { word-break: break-all; font-size: 12px; color: #64748b; background: #f1f5f9; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 20px; }
    .alert-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 13px; color: #92400e; margin: 24px 0; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SoftMed</h1>
      <p>${clinicName} — Sécurité & Gestion Médicale</p>
    </div>
    <div class="content">
      <div class="greeting">Bonjour ${userName || 'Utilisateur'},</div>
      <p class="intro">
        Une demande de réinitialisation du mot de passe de votre compte SoftMed associé à <strong>${clinicName}</strong> a été initiée.
      </p>
      
      <div class="btn-container">
        <a href="${resetUrl}" class="btn" target="_blank">Réinitialiser mon mot de passe</a>
      </div>

      <div class="alert-box">
        <strong>⚠️ Important :</strong> Ce lien sécurisé est valable pendant <strong>1 heure</strong>. Une fois ce délai dépassé, vous devrez renouveler votre demande.
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 20px;">
        Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :
      </p>
      <div class="link-alt">
        <a href="${resetUrl}" style="color:#2563eb; text-decoration:none;">${resetUrl}</a>
      </div>

      <p style="font-size: 12.5px; color: #94a3b8; margin-top: 25px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
        Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité. Votre mot de passe actuel restera inchangé.
      </p>
    </div>
    <div class="footer">
      SoftMed Enterprise • Solution de Gestion Médicale Multi-Tenant<br>
      Plateforme sécurisée conforme aux normes de protection des données de santé.
    </div>
  </div>
</body>
</html>
  `;

  if (transporter) {
    console.log(`[MAIL] Sending password reset email to ${recipientEmail}...`);
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject,
      html
    });
    console.log(`[MAIL] Password reset email sent. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId, simulated: false };
  } else {
    console.log(`[MAIL-SIMULATOR] Password reset email dispatched to ${recipientEmail} with reset link: ${resetUrl}`);
    return {
      success: true,
      messageId: `sim-reset-${Date.now()}`,
      simulated: true,
      resetUrl,
      note: 'Simulation email active (aucun serveur SMTP externe requis en dev).'
    };
  }
}

module.exports = {
  getTransporter,
  testSmtpConnection,
  generateInvoiceEmailHtml,
  sendInvoiceEmail,
  sendPasswordResetEmail
};
