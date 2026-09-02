import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        profilePhoto: {
            type: String,
            default: "https://res.cloudinary.com/hribndmg/image/upload/v1788348918/default-avatar.png",
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            trim: true        
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { 
        timestamps: {
            currentTime: () => Date.now()
        } 
    }
)

const User = mongoose.model("User", userSchema)

export default User