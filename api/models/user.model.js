import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_picture : {
        type: String,
        default: "https://cdn-icons-png.freepik.com/256/10302/10302971.png",
    },
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;