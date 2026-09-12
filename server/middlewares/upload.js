import multer from "multer"
import AppError from "../errors/AppError.js"
import { FILE_ERRORS } from "../../shared/constants/errorMessages.js"

const storage = multer.memoryStorage()

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

const multerInstance = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new AppError(FILE_ERRORS.INVALID_FORMAT, 400), false)
        }
    }
})

export function uploadSingleImage(fieldName) {
    return function (req, res, next) {
        const upload = multerInstance.single(fieldName)

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        success: false,
                        message: "Validation failed",
                        errors: {
                            [fieldName]: FILE_ERRORS.SIZE_EXCEEDED
                        }
                    })
                }

                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: {
                        [fieldName]: err.message
                    }
                })
            } else if (err) {
                return res.status(err.statusCode || 400).json({
                    success: false,
                    message: "Validation failed",
                    errors: {
                        [fieldName]: err.message
                    }
                })
            }

            next()
        })
    }
}