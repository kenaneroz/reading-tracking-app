import jwt from "jsonwebtoken"
import AppError from "../errors/AppError.js"

export default function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("No token provided", 401))
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
     
        next()
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401))
    }
}