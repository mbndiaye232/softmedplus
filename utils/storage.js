const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Lazy-load S3 Client to handle cases where dependencies are still installing or not loaded
let S3Client, PutObjectCommand;
try {
  const s3Sdk = require('@aws-sdk/client-s3');
  S3Client = s3Sdk.S3Client;
  PutObjectCommand = s3Sdk.PutObjectCommand;
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

module.exports = {
  uploadFile,
  isR2Configured
};
