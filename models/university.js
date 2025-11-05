import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    logo: {
        url: String,
        publicId: String
    },
    campusImage: {
        url: String,
        publicId: String
    },
    name: { type: String, required: true },
    location: { type: String, required: true },
    tuitionFees: String,
    programLength: String,
    blogUrl: String,
    yearlyData: [{
        year: Number,
        eu: {
            seats: Number,
            seatsLeft: Number,
            cutOffRounds: [Number],
            finalCutOff: Number
        },
        nonEu: {
            seats: Number,
            finalCutOff: Number,
            rankingPdfUrl: String
        }
    }],
}, { timestamps: true });

const University = mongoose.model('University', universitySchema);

export default University;