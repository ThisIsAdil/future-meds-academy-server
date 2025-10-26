import fs from "fs/promises"
import Team from "../models/teamMember.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find({});
        res.status(200).json({ success: true, data: teamMembers });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const createTeamMember = async (req, res) => {
    const teamMember = req.body;
    const profilePicture = req.file;
    let cloudinaryResponse = null;

    try {
        if (profilePicture?.path) {
            cloudinaryResponse = await uploadToCloudinary(profilePicture.path, 'teamProfiles');

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
        if (profilePicture?.path) {
            cloudinaryResponse = await uploadToCloudinary(profilePicture.path, 'teamProfiles');

            if (!cloudinaryResponse) {
                return res.status(502).json({ success: false, message: 'Image upload failed' });
            }
            updatedData.profilePicture = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }

        const updatedMember = await Team.findById(id);

        if (!updatedMember) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        Object.assign(updatedMember, updatedData);
        await updatedMember.save();

        res.status(200).json({ success: true, data: updatedMember });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} 