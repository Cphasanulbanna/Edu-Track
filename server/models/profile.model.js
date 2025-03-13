import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  mobile_number: {
    type: String,
    min: 10,
    max: 10,
  },
  avatar: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
