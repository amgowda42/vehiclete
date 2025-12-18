import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env;

cloudinary.config({
  api_key: CLOUDINARY_API_KEY ?? '',
  api_secret: CLOUDINARY_API_SECRET ?? '',
  cloud_name: CLOUDINARY_CLOUD_NAME ?? '',
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const storage = multer.memoryStorage();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const upload = multer({
  fileFilter: (req, file, cb) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (file.mimetype.startsWith('image/')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      cb(null, true);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  storage: storage,
});

export const uploadToCloudinary = (buffer: Buffer): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        folder: 'bikes',

        transformation: [
          { crop: 'limit', height: 800, width: 1200 },
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export { cloudinary };
