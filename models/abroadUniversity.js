import mongoose from "mongoose";

const abroadUniversitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    tuitionFees: String,
    programLength: String,
    programs: [String],
    admissionInfo: String,
    blogUrl: String,
    logo: {
        url: String,
        publicId: String,
    },
    campusImage: {
        url: String,
        publicId: String,
    },
}, { timestamps: true });

const AbroadUniversity = mongoose.model("AbroadUniversity", abroadUniversitySchema);

export default AbroadUniversity;