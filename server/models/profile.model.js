import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:true
    },
      last_name: {
        type: String,
        required:true
    },
    dob: {
        type: Date,
        required: true
    },
    mobile_number: {
        type: Number,
        min: 10,
        max: 10
    }
})

const Profile = mongoose.model('Profile', profileSchema)
export default Profile