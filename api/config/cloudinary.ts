import type { Request } from 'express';

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env;

cloudinary.config({
  api_key: CLOUDINARY_API_KEY ?? '',
  api_secret: CLOUDINARY_API_SECRET ?? '',
  cloud_name: CLOUDINARY_CLOUD_NAME ?? '',
});

// Memory storage for multer
const storage = multer.memoryStorage();

// Multer configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Upload buffer to Cloudinary
export const uploadToCloudinary = (
  buffer: Buffer,
  folderName: string = 'bikes'
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    console.log('☁️ Uploading to Cloudinary, buffer size:', buffer.length);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        folder: folderName,
        transformation: [
          { crop: 'limit', height: 800, width: 1200 },
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('✅ Cloudinary upload success:', result?.secure_url);
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

export { cloudinary };
