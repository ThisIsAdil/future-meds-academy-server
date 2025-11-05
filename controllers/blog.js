import Blog from "../models/blog.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

/* -------------------- GET ALL BLOGS -------------------- */
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/* -------------------- GET SINGLE BLOG -------------------- */
export const getBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* -------------------- CREATE BLOG -------------------- */
export const createBlog = async (req, res) => {
    const blogData = req.body;
    const thumbnail = req.file;

    try {
        if (thumbnail?.path) {
            const cloudinaryResponse = await uploadToCloudinary(thumbnail.path, "blogImages");

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }

            blogData.thumbnail = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        const newBlog = await Blog.create(blogData);
        return res.status(201).json({ success: true, data: newBlog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/* -------------------- UPDATE BLOG -------------------- */
export const editBlog = async (req, res) => {
    const { id } = req.params;
    const thumbnail = req.file;
    const updatedData = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (thumbnail?.path) {
            if (blog?.thumbnail?.publicId) {
                await deleteFromCloudinary(blog.thumbnail.publicId);
            }

            const cloudinaryResponse = await uploadToCloudinary(thumbnail.path, "blogImages");

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: "Image upload failed" });
            }

            updatedData.thumbnail = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
            };
        }

        Object.assign(blog, updatedData);
        await blog.save();

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* -------------------- DELETE BLOG -------------------- */
export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (blog?.thumbnail?.publicId) {
            await deleteFromCloudinary(blog.thumbnail.publicId);
        }

        await Blog.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
