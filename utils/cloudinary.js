import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder
        });

        return result;
    } catch (error) {
        throw error;
    } finally {
        try {
            await fs.unlink(filePath);
        } catch (unlinkErr) {
            console.error('Failed to remove temp file:', unlinkErr);
        }
    }
}

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw error;
    }
}

export { cloudinary };


