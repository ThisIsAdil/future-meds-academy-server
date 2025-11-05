import mongoose from "mongoose";

const previousYearQuestionSchema = new mongoose.Schema({
    exam: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    documents: {
        question: String,
        answer: String,
    },
},
    {
        timestamps: true,
    });

const PreviousYearQuestion = mongoose.model("PreviousYearQuestion", previousYearQuestionSchema);

export default PreviousYearQuestion;