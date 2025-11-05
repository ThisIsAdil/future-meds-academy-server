import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    testimonial: { type: String, required: true },
    score: { type: Number, required: true },
    stars: { type: Number, required: true },
}, { timestamps: true });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;