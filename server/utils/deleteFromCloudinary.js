import { cloudinary } from "../config/cloudinary.js"

function extractPublicId(urlOrId) {
    if (!urlOrId) return null

    const lastPart = urlOrId.split("/").pop()

    const dotIndex = lastPart.lastIndexOf(".")
    const publicId = dotIndex !== -1 ? lastPart.substring(0, dotIndex) : lastPart

    return publicId
}

export async function deleteFromCloudinary(folder, urlOrPublicId) {
    try {
        const rawId = extractPublicId(urlOrPublicId)
        if (!rawId) return null

        const fullPublicId = `${folder}/${rawId}`

        const result = await cloudinary.uploader.destroy(fullPublicId)
        return result
    } catch (error) {
        console.error("Cloudinary delete error", error)
        throw error
    }
}