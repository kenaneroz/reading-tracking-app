import { Token } from "../models/Token.js"
import AppError from "../errors/AppError.js"
import crypto from "crypto"
import { AUTH_ERRORS } from "../../shared/constants/errorMessages.js"

export default async function verifyDeleteAccountToken(req, res) {
    const { token } = req.query

    if (!token) {
        throw new AppError(
            AUTH_ERRORS.INVALID_OR_EXPIRED_LINK, 
            400,
            {
                link: AUTH_ERRORS.INVALID_OR_EXPIRED_LINK
            }
        )
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const t = await Token.findOne( { type: "delete-account", token: hashedToken })

    if (!t || 
        t.expiresAt < Date.now()
    ) {
        throw new AppError(
            AUTH_ERRORS.INVALID_OR_EXPIRED_LINK, 
            400,
            {
                link: AUTH_ERRORS.INVALID_OR_EXPIRED_LINK
            }
        )    
    }

    res.status(200).json({
        success: true,
        message: "Token validated",
        data: []
    })
}