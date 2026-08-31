import multer from "multer"
import AppError from "../errors/AppError.js"

const storage = multer.memoryStorage()

const multerInstance = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true)
        } else {
            cb(new AppError(
                "Only image files are allowed", 
                400,
                {
                    profilePhoto: "Only image files are allowed"
                }
            ), false)
        }
    }
})

export function uploadSingleImage(fieldName) {
    return function (req, res, next) {
        const upload = multerInstance.single(fieldName)

        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        success: false,
                        message: "File size cannot exceed 5MB",
                        errors: {
                            profilePhoto: "File size cannot exceed 5MB"
                        }
                    })
                }
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    errors: {
                        profilePhoto: err.message
                    }
                })
            } else if (err) {
                return res.status(err.statusCode || 400).json({
                    success: false,
                    message: err.message,
                    errors: {
                        profilePhoto: err.message
                    }
                })
            }

            next()
        })
    }
}