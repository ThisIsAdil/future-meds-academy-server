import TopPerformer from "../models/topPerformer.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const getTopPerformers = async (req, res) => {
    try {
        const topPerformers = await TopPerformer.find({});
        res.status(200).json({ success: true, data: topPerformers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createTopPerformer = async (req, res) => {
    try {
        const performerData = req.body;
        const image = req.file;

        if (image?.path) {
            const cloudinaryResponse = await uploadToCloudinary(image.path, "topPerformers");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            performerData.image = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        const newTopPerformer = await TopPerformer.create(performerData);
        res.status(201).json({ success: true, data: newTopPerformer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const editTopPerformer = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const image = req.file;

    try {
        const performer = await TopPerformer.findById(id);
        if (!performer) {
            return res.status(404).json({ success: false, message: "Top performer not found" });
        }

        if (image?.path) {
            if (performer.image?.publicId) {
                await deleteFromCloudinary(performer.image.publicId);
            }
            const cloudinaryResponse = await uploadToCloudinary(image.path, "topPerformers");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            updatedData.image = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        Object.assign(performer, updatedData);
        await performer.save();

        res.status(200).json({ success: true, data: performer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteTopPerformer = async (req, res) => {
    const { id } = req.params;
    try {
        const performer = await TopPerformer.findById(id);
        if (!performer) {
            return res.status(404).json({ success: false, message: "Top performer not found" });
        }

        if (performer.image?.publicId) {
            await deleteFromCloudinary(performer.image.publicId);
        }

        await TopPerformer.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Top performer deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};