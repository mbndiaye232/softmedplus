// Envoi de SMS pour le portail patient (code de double authentification).
// Sans fournisseur configuré (SMS_PROVIDER absent de .env), on simule l'envoi :
// le message est journalisé côté serveur et renvoyé dans la réponse HTTP en clair
// (simulated:true) pour permettre les tests locaux sans passer par un vrai réseau
// mobile - même convention que sendPasswordResetEmail dans utils/mailer.js.
async function sendSms(phoneNumber, message) {
  const provider = process.env.SMS_PROVIDER;

  if (!provider) {
    console.log(`[SMS-SIMULATOR] À ${phoneNumber} : ${message}`);
    return {
      success: true,
      simulated: true,
      note: "Aucun fournisseur SMS configuré (SMS_PROVIDER) : le message est journalisé côté serveur uniquement."
    };
  }

  // Point d'extension pour un vrai fournisseur (Twilio, Orange SMS API,
  // Africa's Talking...) le jour où ce prototype sort du cadre local.
  throw new Error(`Fournisseur SMS "${provider}" non implémenté`);
}

module.exports = { sendSms };
