const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Lazy-load S3 Client to handle cases where dependencies are still installing or not loaded
let S3Client, PutObjectCommand, GetObjectCommand;
try {
  const s3Sdk = require('@aws-sdk/client-s3');
  S3Client = s3Sdk.S3Client;
  PutObjectCommand = s3Sdk.PutObjectCommand;
  GetObjectCommand = s3Sdk.GetObjectCommand;
} catch (e) {
  console.warn('AWS SDK Client S3 not loaded yet. Local storage will be used.');
}

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

const isR2Configured = !!(R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_ENDPOINT && R2_BUCKET_NAME);

let s3Client = null;

const getS3Client = () => {
  if (s3Client) return s3Client;
  if (!S3Client) {
    try {
      const s3Sdk = require('@aws-sdk/client-s3');
      S3Client = s3Sdk.S3Client;
      PutObjectCommand = s3Sdk.PutObjectCommand;
      GetObjectCommand = s3Sdk.GetObjectCommand;
    } catch (e) {
      return null;
    }
  }
  if (isR2Configured) {
    s3Client = new S3Client({
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
      region: 'auto',
    });
    return s3Client;
  }
  return null;
};

/**
 * Uploads a file buffer to storage (Cloudflare R2 or local disk fallback)
 * @param {Buffer} fileBuffer 
 * @param {string} originalName 
 * @param {string} mimeType 
 * @returns {Promise<string>} The public URL of the uploaded file
 */
const uploadFile = async (fileBuffer, originalName, mimeType, tenantId = null) => {
  const ext = path.extname(originalName);
  const randomName = `${crypto.randomUUID()}${ext}`;
  // Les fichiers deposes par une clinique connectee sont ranges sous sa propre
  // cle : c'est ce prefixe que la route de lecture compare au jeton, pour qu'un
  // utilisateur d'une clinique ne puisse pas lire le fichier d'une autre meme
  // s'il en connait l'identifiant. Les depots anonymes (logo a l'inscription,
  // QR code de paiement) restent sous public/ et sont lisibles sans jeton.
  const key = tenantId ? `t/${tenantId}/${randomName}` : `public/${randomName}`;
  const client = getS3Client();

  if (client && PutObjectCommand) {
    try {
      console.log(`Uploading ${originalName} to Cloudflare R2 bucket ${R2_BUCKET_NAME}...`);
      await client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
          Body: fileBuffer,
          ContentType: mimeType,
        })
      );

      // Le bucket reste prive : on renvoie l'adresse de la route applicative,
      // qui verifie le jeton avant de servir l'objet, et non une URL R2 directe.
      return `/api/files/${key}`;
    } catch (err) {
      console.error('R2 upload failed, falling back to local storage:', err.message);
    }
  }

  // Local storage fallback
  console.log(`Saving ${originalName} to local public/uploads directory...`);
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const localPath = path.join(uploadsDir, randomName);
  fs.writeFileSync(localPath, fileBuffer);
  
  return `/uploads/${randomName}`;
};

/**
 * Récupère le contenu binaire d'un fichier stocké, quel que soit son emplacement :
 * disque local (`/uploads/...`), URL publique R2/HTTP, ou objet R2 privé (repli via l'API S3).
 * Sert notamment à joindre réellement les documents médicaux aux emails.
 * @param {string} fileUrl URL publique ou chemin `/uploads/...`
 * @returns {Promise<{buffer: Buffer, contentType: string|null}|null>} null si le fichier est introuvable
 */
/**
 * Lit un objet R2 par sa cle (`public/...` ou `t/<tenant>/...`).
 * @returns {Promise<{buffer: Buffer, contentType: string|null}|null>}
 */
const downloadByKey = async (key) => {
  const client = getS3Client();
  if (!client || !GetObjectCommand || !key) return null;
  try {
    const obj = await client.send(new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    const chunks = [];
    for await (const chunk of obj.Body) chunks.push(chunk);
    return { buffer: Buffer.concat(chunks), contentType: obj.ContentType || null };
  } catch (err) {
    console.warn(`Lecture R2 de la cle ${key} impossible : ${err.message}`);
    return null;
  }
};

const downloadFile = async (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== 'string') return null;

  // 0. Fichier servi par la route applicative : lecture directe dans R2.
  if (fileUrl.startsWith('/api/files/')) {
    return downloadByKey(decodeURIComponent(fileUrl.slice('/api/files/'.length)));
  }

  // 1. Fichier servi depuis le disque local
  if (fileUrl.startsWith('/uploads/')) {
    const localPath = path.join(__dirname, '..', 'public', fileUrl);
    if (fs.existsSync(localPath)) {
      return { buffer: fs.readFileSync(localPath), contentType: null };
    }
    return null;
  }

  if (!/^https?:\/\//i.test(fileUrl)) return null;

  // 2. Téléchargement HTTP (bucket R2 public ou domaine personnalisé)
  try {
    const res = await fetch(fileUrl);
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      return { buffer, contentType: res.headers.get('content-type') };
    }
    console.warn(`Téléchargement de ${fileUrl} : réponse HTTP ${res.status}`);
  } catch (err) {
    console.warn(`Téléchargement HTTP de ${fileUrl} impossible : ${err.message}`);
  }

  // 3. Repli : lecture directe dans R2 si le bucket n'est pas public
  const client = getS3Client();
  if (client && GetObjectCommand) {
    try {
      const key = decodeURIComponent(new URL(fileUrl).pathname.split('/').filter(Boolean).pop() || '');
      if (!key) return null;
      const obj = await client.send(new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
      const chunks = [];
      for await (const chunk of obj.Body) chunks.push(chunk);
      return { buffer: Buffer.concat(chunks), contentType: obj.ContentType || null };
    } catch (err) {
      console.warn(`Lecture R2 de ${fileUrl} impossible : ${err.message}`);
    }
  }

  return null;
};

module.exports = {
  uploadFile,
  downloadFile,
  downloadByKey,
  isR2Configured
};
