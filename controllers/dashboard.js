import FeaturedImage from "../models/featuredImages.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

export const fetchFeaturedImages = async (req, res) => {
    try {
        const images = await FeaturedImage.find({})
        res.status(200).json({
            success: true,
            data: images,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const addFeaturedImage = async (req, res) => {
    const featuredImage = req.file;

    let cloudinaryResponse = null;
    try {
        if (featuredImage?.path) {
            cloudinaryResponse = await uploadToCloudinary(featuredImage.path, 'featuredImages');
        }

        const newImage = await FeaturedImage.create({
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        });

        return res.status(201).json({ success: true, data: newImage });
    } catch (error) {
        // final cleanup attempt if something went wrong
        if (featuredImage?.path) {
            try { await fs.unlink(featuredImage.path); } catch (_) { }
        }
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteFeaturedImage = async (req, res) => {
    const { id } = req.params;

    try {
        const image = await FeaturedImage.findById(id);
        if (!image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        await deleteFromCloudinary(image.public_id);
        await FeaturedImage.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}