import jwt from "jsonwebtoken"
import AppError from "../errors/AppError.js"

export default function verifyToken(req, res, next) {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return next(new AppError("No token provided", 401))
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        req.userId = decoded.userId
     
        next()
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401))
    }
}