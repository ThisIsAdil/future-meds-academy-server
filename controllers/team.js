import Team from "../models/teamMember.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

export const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find({}).populate('enrolledCourses');
        res.status(200).json({ success: true, data: teamMembers });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const createTeamMember = async (req, res) => {
    const teamMember = req.body;
    const profilePicture = req.file;

    try {
        if (profilePicture?.path) {
            let cloudinaryResponse = await uploadToCloudinary(profilePicture.path, 'teamProfiles');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }
            teamMember.profilePicture = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        const newMember = await Team.create(teamMember);
        return res.status(201).json({ success: true, data: newMember });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const editTeamMember = async (req, res) => {
    const { id } = req.params;
    const profilePicture = req.file;
    const updatedData = req.body;

    let cloudinaryResponse = null;

    try {
        const teamMember = await Team.findById(id);

        if (!teamMember) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        if (profilePicture?.path) {
            if (teamMember?.profilePicture?.publicId) {
                await deleteFromCloudinary(teamMember.profilePicture.publicId);
            }

            cloudinaryResponse = await uploadToCloudinary(profilePicture.path, 'teamProfiles');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }
            updatedData.profilePicture = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }



        Object.assign(teamMember, updatedData);
        await teamMember.save();

        res.status(200).json({ success: true, data: teamMember });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteTeamMember = async (req, res) => {
    const { id } = req.params;

    try {
        const teamMember = await Team.findById(id);

        if (!teamMember) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        if (teamMember?.profilePicture?.publicId) {
            await deleteFromCloudinary(teamMember.profilePicture.publicId);
        }

        await Team.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTeamMember = async (req, res) => {
    const { id } = req.params;

    try {
        const teamMember = await Team.findById(id).populate('enrolledCourses');

        if (!teamMember) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        res.status(200).json({ success: true, data: teamMember });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}