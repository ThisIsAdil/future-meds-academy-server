import mongoose from "mongoose";

const featuredImageSchema = new mongoose.Schema({
    public_id: String,
    url: String,
}, { timestamps: true });

export const FeaturedImage = mongoose.model("Featured-Image", featuredImageSchema);

export default FeaturedImage;
