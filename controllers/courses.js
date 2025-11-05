import Course from "../models/courses.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
// ...existing code...

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id).populate("instructors");
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createCourse = async (req, res) => {
    const courseData = req.body;
    const thumbnail = req.file;

    try {
        if (thumbnail?.path) {
            const cloudinaryResponse = await uploadToCloudinary(thumbnail.path, "courseThumbnails");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            courseData.thumbnail = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        const newCourse = await Course.create(courseData);
        const populatedCourse = await Course.findById(newCourse._id);

        res.status(201).json({ success: true, data: populatedCourse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const editCourse = async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;
    const thumbnail = req.file;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (thumbnail?.path) {
            // delete existing thumbnail from Cloudinary if present
            if (course?.thumbnail?.publicId) {
                await deleteFromCloudinary(course.thumbnail.publicId);
            }

            const cloudinaryResponse = await uploadToCloudinary(thumbnail.path, "courseThumbnails");
            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }
            courseData.thumbnail = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        Object.assign(course, courseData);
        await course.save();

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findById(id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (deletedCourse.thumbnail?.publicId) {
            await deleteFromCloudinary(deletedCourse.thumbnail.publicId);
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};