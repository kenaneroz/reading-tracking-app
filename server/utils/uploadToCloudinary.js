import { cloudinary } from "../config/cloudinary.js"
import streamifier from "streamifier"

const UPLOAD_PRESETS = {
    pp: {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "auto" 
    },
    bookCover: {
        width: 500,
        height: 800,
        crop: "fill",
        gravity: "auto"
    }
}

export function uploadToCloudinary(fileBuffer, folder, type = "pp") {
    const selectedPreset = UPLOAD_PRESETS[type] || UPLOAD_PRESETS.pp

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                transformation: [
                    selectedPreset,
                    { quality: "auto", fetch_format: "auto" }
                ]
            },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        )
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}