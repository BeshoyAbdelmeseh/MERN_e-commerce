import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, trim: true, lowercase:true},
    password: {type: String, required: true}
})

export default mongoose.models.users || mongoose.model('users', userSchema);