import { cloudinary } from "../config/cloudinary.js"
import streamifier from "streamifier"
import { extractPublicId } from "cloudinary-build-url"

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

export async function deleteFromCloudinary(url) {
    try {
        if (!url) return null

        const publicIdWithPath = extractPublicId(url)
        if (!publicIdWithPath) return null

        return await cloudinary.uploader.destroy(publicIdWithPath)
    } catch (error) {
        console.error("Cloudinary single delete error:", error)
        throw error
    }
}

export async function deleteMultipleFromCloudinary(urls) {
    try {
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return null
        }

        const publicIdsWithPath = urls
            .map(url => extractPublicId(url))
            .filter(Boolean)

        if (publicIdsWithPath.length === 0) {
            return null
        }

        return await cloudinary.api.delete_resources(publicIdsWithPath)
    } catch (error) {
        console.error("Cloudinary multiple delete error:", error)
        throw error
    }
}