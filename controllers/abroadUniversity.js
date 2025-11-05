import AbroadUniversity from "../models/abroadUniversity.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const getAllAbroadUniversities = async (req, res) => {
    try {
        const universities = await AbroadUniversity.find();
        res.status(200).json({ success: true, data: universities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAbroadUniversity = async (req, res) => {
    const { id } = req.params;
    try {
        const university = await AbroadUniversity.findById(id);
        if (!university) {
            return res.status(404).json({ success: false, message: "Abroad university not found" });
        }
        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createAbroadUniversity = async (req, res) => {
    try {
        const universityData = req.body;
        const { logo, campusImage } = req.files || {};

        if (logo && logo.length > 0) {
            const cloudinaryResponse = await uploadToCloudinary(logo[0].path, "abroadUniversity/logos");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            universityData.logo = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        if (campusImage && campusImage.length > 0) {
            const cloudinaryResponse = await uploadToCloudinary(campusImage[0].path, "abroadUniversity/campusImages");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            universityData.campusImage = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        const newUniversity = await AbroadUniversity.create(universityData);
        const populatedUniversity = await AbroadUniversity.findById(newUniversity._id);

        res.status(201).json({ success: true, data: populatedUniversity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAbroadUniversity = async (req, res) => {
    const { id } = req.params;
    const universityData = req.body;
    const { logo, campusImage } = req.files || {};

    try {
        const university = await AbroadUniversity.findById(id);
        if (!university) {
            return res.status(404).json({ success: false, message: "Abroad university not found" });
        }

        if (logo && logo.length > 0) {
            if (university.logo?.publicId) {
                await deleteFromCloudinary(university.logo.publicId);
            }
            const cloudinaryResponse = await uploadToCloudinary(logo[0].path, "abroadUniversity/logos");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            universityData.logo = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        if (campusImage && campusImage.length > 0) {
            if (university.campusImage?.publicId) {
                await deleteFromCloudinary(university.campusImage.publicId);
            }
            const cloudinaryResponse = await uploadToCloudinary(campusImage[0].path, "abroadUniversity/campusImages");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            universityData.campusImage = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        Object.assign(university, universityData);
        const updatedUniversity = await university.save();

        res.status(200).json({ success: true, data: updatedUniversity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteAbroadUniversity = async (req, res) => {
    const { id } = req.params;
    try {
        const university = await AbroadUniversity.findById(id);
        if (!university) {
            return res.status(404).json({ success: false, message: "Abroad university not found" });
        }

        if (university.logo?.publicId) {
            await deleteFromCloudinary(university.logo.publicId);
        }
        if (university.campusImage?.publicId) {
            await deleteFromCloudinary(university.campusImage.publicId);
        }

        await AbroadUniversity.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Abroad university deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};