import University from "../models/university.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json({ success: true, data: universities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUniversity = async (req, res) => {
    const { id } = req.params;

    try {
        const university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }

        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createUniversity = async (req, res) => {
    try {
        const universityData = req.body;
        const { logo, campusImage } = req.files || {};

        if (logo && logo.length > 0) {
            const cloudinaryResponse = await uploadToCloudinary(logo[0].path, 'university/logos');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }

            universityData.logo = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        if (campusImage && campusImage.length > 0) {
            const cloudinaryResponse = await uploadToCloudinary(campusImage[0].path, 'university/campusImages');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }

            universityData.campusImage = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        const newUniversity = await University.create(universityData);
        const populatedUniversity = await University.findById(newUniversity._id);

        res.status(201).json({
            success: true, data: populatedUniversity
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUniversity = async (req, res) => {
    const { id } = req.params;
    const universityData = req.body;
    const { logo, campusImage } = req.files || {};

    try {
        const university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }

        // If a new logo is provided, delete the old one from Cloudinary first
        if (logo && logo.length > 0) {
            if (university.logo?.publicId) {
                await deleteFromCloudinary(university.logo.publicId);
            }

            const cloudinaryResponse = await uploadToCloudinary(logo[0].path, 'university/logos');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }

            universityData.logo = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        // If a new campus image is provided, delete the old one from Cloudinary first
        if (campusImage && campusImage.length > 0) {
            if (university.campusImage?.publicId) {
                await deleteFromCloudinary(university.campusImage.publicId);
            }

            const cloudinaryResponse = await uploadToCloudinary(campusImage[0].path, 'university/campusImages');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }

            universityData.campusImage = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        Object.assign(university, universityData);
        const updatedUniversity = await university.save();

        res.status(200).json({
            success: true, data: updatedUniversity
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteUniversity = async (req, res) => {
    const { id } = req.params;

    try {
        const university = await University.findById(id);
        if (!university) {
            return res.status(404).json({ success: false, message: "University not found" });
        }

        if (university.logo?.publicId) {
            await deleteFromCloudinary(university.logo.publicId);
        }

        if (university.campusImage?.publicId) {
            await deleteFromCloudinary(university.campusImage.publicId);
        }

        await University.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "University deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateYearlyData = async (req, res) => {
    const { id } = req.params;
    const { yearlyData } = req.body;

    try {
        const university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }

        university.yearlyData = yearlyData;
        const updatedUniversity = await university.save();

        res.status(200).json({
            success: true,
            data: updatedUniversity
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};