// Worker Cloudflare : sert le frontend statique de public/ et relaie /api/*
// vers le backend Render.
//
// Pourquoi un Worker et pas un simple projet Pages : le fichier _redirects de
// Pages ne sait relayer que des chemins internes au site. « Proxying will only
// support relative URLs on your site. You cannot proxy external domains. »
// Or l'application appelle /api sur sa propre origine, ce qui est necessaire
// pour que le cookie de session accompagne les <img> et les liens de
// telechargement servis par /api/files.
//
// L'adresse du backend se configure par la variable BACKEND_URL du Worker, et
// non dans ce fichier.
export default {
  // Reveil periodique du backend. Sur le plan gratuit de Render, le service
  // s'endort apres 15 minutes sans trafic - et un service endormi n'execute
  // aucune tache planifiee : les rappels de rendez-vous ne partaient donc que
  // si quelqu'un utilisait l'application au bon moment.
  //
  // La plage horaire de la tache cron est volontairement limitee (voir
  // wrangler.toml) : maintenir le service eveille 24h/24 consommerait la
  // quasi-totalite des 750 heures mensuelles offertes par Render.
  async scheduled(event, env, ctx) {
    const backend = (env.BACKEND_URL || '').replace(/\/$/, '');
    if (!backend) return;
    ctx.waitUntil(
      fetch(`${backend}/`, { method: 'GET' })
        .then((r) => console.log(`Reveil du backend : ${r.status}`))
        .catch((e) => console.log(`Reveil du backend impossible : ${e}`))
    );
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith('/api/')) {
      // Filet de securite : avec run_worker_first limite a /api/*, les autres
      // chemins ne passent normalement pas par ici.
      return env.ASSETS.fetch(request);
    }

    const backend = (env.BACKEND_URL || '').replace(/\/$/, '');
    if (!backend) {
      return Response.json(
        { error: "BACKEND_URL n'est pas configuree sur ce Worker." },
        { status: 503 }
      );
    }

    const cible = new URL(url.pathname + url.search, backend);

    // La requete est relayee telle quelle : methode, corps, en-tetes, cookies.
    // La reponse repart telle quelle : c'est ainsi que le Set-Cookie du backend
    // se rattache au domaine public, et non a celui de Render.
    try {
      return await fetch(new Request(cible, request));
    } catch (err) {
      // Backend injoignable : l'application attend du JSON sur /api, une page
      // d'erreur HTML ne lui apprendrait rien.
      return Response.json(
        { error: "Le serveur d'application est injoignable. Réessayez dans un instant.", detail: String(err) },
        { status: 502 }
      );
    }
  },
};
