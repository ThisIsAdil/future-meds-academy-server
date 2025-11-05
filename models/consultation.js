import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    preferredDate: { type: String, required: true },
    consultationAbout: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;