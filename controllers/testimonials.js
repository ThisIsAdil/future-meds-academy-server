import Testimonial from "../models/testimonial.js";

export const createTestimonial = async (req, res) => {
    try {
        const testimonialData = req.body;

        const newTestimonial = await Testimonial.create(testimonialData);

        res.status(201).json({
            success: true,
            data: newTestimonial,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();

        res.status(200).json({
            success: true,
            data: testimonials,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const testimonialData = req.body;
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, testimonialData, { new: true });

        if (!updatedTestimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({
            success: true,
            data: updatedTestimonial,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}