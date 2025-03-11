import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['admin','student','teacher','parent', 'staff']
    }
})

const Role = mongoose.model("Role", roleSchema)
export default Role