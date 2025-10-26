import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    shortDescription: { type: String, required: true },
    about: String,
    whyChoose: [{ type: String }],
    syllabus: [{ type: String }],
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team-Member' }],
    enrollment: String,
    faq: [{
        question: String,
        answer: String
    }],
    thumbnail: {
        url: String,
        publicId: String
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;