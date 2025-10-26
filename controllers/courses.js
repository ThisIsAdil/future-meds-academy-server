import Course from "../models/courses.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createCourse = async (req, res) => {
    const courseData = req.body;
    const thumbnail = req.file;

    try {
        if (thumbnail?.path) {
            // Assume uploadToCloudinary is a utility function to handle uploads
            const cloudinaryResponse = await uploadToCloudinary(thumbnail.path, 'courseThumbnails');
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }
            courseData.thumbnail = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        const newCourse = await Course.create(courseData);
        res.status(201).json({ success: true, data: newCourse, thumbnail });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const editCourse = async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;
    const thumbnail = req.file;

    try {
        if (thumbnail?.path) {
            const cloudinaryResponse = await uploadToCloudinary(thumbnail.path, 'courseThumbnails');
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }
            courseData.thumbnail = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, data: updatedCourse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}