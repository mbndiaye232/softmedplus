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
const uploadFile = async (fileBuffer, originalName, mimeType) => {
  const ext = path.extname(originalName);
  const randomName = `${crypto.randomUUID()}${ext}`;
  const client = getS3Client();

  if (client && PutObjectCommand) {
    try {
      console.log(`Uploading ${originalName} to Cloudflare R2 bucket ${R2_BUCKET_NAME}...`);
      await client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: randomName,
          Body: fileBuffer,
          ContentType: mimeType,
        })
      );
      
      const baseUrl = R2_PUBLIC_URL || `${R2_ENDPOINT.replace(/\/$/, '')}/${R2_BUCKET_NAME}`;
      return `${baseUrl.replace(/\/$/, '')}/${randomName}`;
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
const downloadFile = async (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== 'string') return null;

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
  isR2Configured
};
