import { cloudinary } from "../config/cloudinary.js"

export default async function deleteMultipleFromCloudinary(publicIds) {
    return await cloudinary.api.delete_resources(publicIds)
}