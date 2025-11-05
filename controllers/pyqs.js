import PreviousYearQuestion from '../models/pyqs.js';

export const fetchPyqs = async (req, res) => {
    try {
        const pyqs = await PreviousYearQuestion.find({});
        res.status(200).json({ success: true, data: pyqs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addPyq = async (req, res) => {
    const pyqData = req.body;

    try {
        const newPyq = await PreviousYearQuestion.create(pyqData);
        res.status(201).json({ success: true, data: newPyq });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePyq = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedPyq = await PreviousYearQuestion.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPyq) {
            return res.status(404).json({ success: false, message: "PYQ not found" });
        }
        res.status(200).json({ success: true, data: updatedPyq });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePyq = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPyq = await PreviousYearQuestion.findByIdAndDelete(id);
        if (!deletedPyq) {
            return res.status(404).json({ success: false, message: "PYQ not found" });
        }
        res.status(200).json({ success: true, message: "PYQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};