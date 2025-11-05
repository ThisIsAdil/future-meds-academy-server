import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;