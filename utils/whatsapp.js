// Envoi de messages WhatsApp pour les rappels de rendez-vous. Sans fournisseur
// configuré (WHATSAPP_PROVIDER absent de .env, ex: WhatsApp Business API via Meta
// ou Twilio), on simule l'envoi : le message est journalisé côté serveur - même
// convention que utils/sms.js et sendPasswordResetEmail dans utils/mailer.js.
async function sendWhatsapp(phoneNumber, message) {
  const provider = process.env.WHATSAPP_PROVIDER;

  if (!provider) {
    console.log(`[WHATSAPP-SIMULATOR] À ${phoneNumber} : ${message}`);
    return {
      success: true,
      simulated: true,
      note: "Aucun fournisseur WhatsApp configuré (WHATSAPP_PROVIDER) : le message est journalisé côté serveur uniquement."
    };
  }

  // Point d'extension pour un vrai fournisseur (WhatsApp Business API, Twilio...)
  // le jour où ce prototype sort du cadre local.
  throw new Error(`Fournisseur WhatsApp "${provider}" non implémenté`);
}

module.exports = { sendWhatsapp };
