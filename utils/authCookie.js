// Le jeton est aussi depose en cookie HttpOnly, en plus de la reponse JSON.
// Raison : une balise <img> ou un lien de telechargement ne peut pas porter
// d'en-tete Authorization. C'est ce cookie que lit la route /api/files, qui
// sert les documents depuis R2 sans jamais exposer le bucket publiquement.
const COOKIE_NAME = 'softmed_token';
const DUREE_MS = 7 * 24 * 60 * 60 * 1000; // aligne sur expiresIn du JWT

const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: DUREE_MS,
    path: '/',
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
};

module.exports = { COOKIE_NAME, setAuthCookie, clearAuthCookie };
