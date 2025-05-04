import mongoose from "mongoose";

const UserDetailsScehma = new mongoose.Schema(
    {
        email: { type: String, unique: true}, 
        password: String,
    },
    {
        collection: "UserInfo",
    }
);

const UserInfo = mongoose.model("UserInfo",UserDetailsScehma);

export default UserInfo;