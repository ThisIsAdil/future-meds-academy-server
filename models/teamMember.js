import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  profilePicture: {
    url: String,
    publicId: String
  },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  about: String,
  videoIntroductionUrl: String,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Team = mongoose.model('Team-Member', teamMemberSchema);

export default Team;