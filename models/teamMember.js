import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  profilePicture: {
    url: String,
    publicId: String
  },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  about: String,
  videoIntroductionUrl: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

teamMemberSchema.virtual('enrolledCourses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'instructors'
});

const Team = mongoose.model('Team-Member', teamMemberSchema);
export default Team;
