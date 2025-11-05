import mongoose from "mongoose";

const topPerformerSchema = new mongoose.Schema({
    image: {
        url: String,
        publicId: String
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    rank: { type: Number, required: true },
    university: { type: String, required: true },
    score: { type: Number, required: true },
}, { timestamps: true });

const TopPerformer = mongoose.model("TopPerformer", topPerformerSchema);

export default TopPerformer;