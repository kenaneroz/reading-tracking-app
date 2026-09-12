import jwt from "jsonwebtoken"
import AppError from "../errors/AppError.js"
import { AUTH_ERRORS } from "../../shared/constants/errorMessages.js"

export default function verifyToken(req, res, next) {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return next(new AppError(AUTH_ERRORS.INVALID_OR_EXPIRED_TOKEN, 401))
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        req.userId = decoded.userId
     
        next()
    } catch (error) {
        return next(new AppError(AUTH_ERRORS.INVALID_OR_EXPIRED_TOKEN, 401))
    }
}