import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "",
    },
    author: {
        type: String,
        default: "Amir Akhtar",
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    youtubeUrl: {
        type: String,
        default: "",
    },
    thumbnail: {
        url: String,
        publicId: String,
    },
},
    {
        timestamps: true,
    });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
