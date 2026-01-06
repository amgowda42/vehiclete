import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env;

// Validate environment variables
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary environment variables!');
  console.log('CLOUDINARY_CLOUD_NAME:', CLOUDINARY_CLOUD_NAME ? '✓' : '✗');
  console.log('CLOUDINARY_API_KEY:', CLOUDINARY_API_KEY ? '✓' : '✗');
  console.log('CLOUDINARY_API_SECRET:', CLOUDINARY_API_SECRET ? '✓' : '✗');
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME ?? '',
  api_key: CLOUDINARY_API_KEY ?? '',
  api_secret: CLOUDINARY_API_SECRET ?? '',
});

// Memory storage for multer
const storage = multer.memoryStorage();

// Multer configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('📎 File received:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

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
        folder: folderName, // Use the parameter
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
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