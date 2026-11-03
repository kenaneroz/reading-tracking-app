import { rateLimit } from "express-rate-limit"

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Too many attempts from this IP, please try again after 15 minutes.",
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            statusCode: options.statusCode,
            message: options.message,
            errors: { general: options.message }
        })
    }
})