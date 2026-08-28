import { Token } from "../models/Token.js"
import AppError from "../errors/AppError.js"
import crypto from "crypto"

export default async function verifyResetToken(req, res) {
    const { token } = req.query

    if (!token) {
        throw new AppError(
            "Invalid or expired link", 
            400,
            {
                link: "Invalid or expired link"
            }
        )
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const t = await Token.findOne( { type: "reset-password", token: hashedToken })

    if (!t || 
        t.expiresAt < Date.now()
    ) {
        throw new AppError(
            "Invalid or expired link", 
            400,
            {
                link: "Invalid or expired link"
            }
        )    
    }

    res.status(200).json({
        success: true,
        message: "Token validated",
        data: []
    })
}