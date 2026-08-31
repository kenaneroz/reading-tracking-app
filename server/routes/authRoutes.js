import express from "express"

import { 
    getUser,
    register, 
    login,
    updateUser,
    requestDeleteAccount,
    confirmDeleteAccount,
    forgotPassword,
    resetPassword,
} from "../controllers/authController.js"

import validateRegister from "../middlewares/validateRegister.js"
import validateLogin from "../middlewares/validateLogin.js"
import validateUpdateProfile from "../middlewares/validateUpdateProfile.js"
import validateUpdateEmail from "../middlewares/validateUpdateEmail.js"
import validateUpdatePassword from "../middlewares/validateUpdatePassword.js"
import validateForgotPassword from "../middlewares/validateForgotPassword.js"
import validateResetPassword from "../middlewares/validateResetPassword.js"
import { uploadSingleImage } from "../middlewares/upload.js"

import verifyToken from "../middlewares/verifyToken.js"
import verifyResetToken from "../middlewares/verifyResetToken.js"
import verifyDeleteAccountToken from "../middlewares/verifyDeleteAccountToken.js"


const router = express.Router()

router
    .post("/register", 
        validateRegister, 
        register
    )
    .post("/login", 
        validateLogin, 
        login
    )
    .get("/me",
        verifyToken,
        getUser
    )
    .post("/request-delete-account",
        verifyToken,
        requestDeleteAccount
    )
    .get("/confirm-delete-account/verify-token", verifyDeleteAccountToken)
    .delete("/confirm-delete-account",
        verifyToken,
        confirmDeleteAccount
    )
    .patch("/me",
        verifyToken,
        uploadSingleImage("profilePhoto"),
        validateUpdateProfile,
        updateUser
    )
    .patch("/me/email",
        verifyToken,
        validateUpdateEmail,
        updateUser
    )
    .patch("/me/password",
        verifyToken,
        validateUpdatePassword,
        updateUser
    )
    .post("/forgot-password", 
        validateForgotPassword,
        forgotPassword
    )
    .get("/reset-password/verify-token", verifyResetToken)
    .patch("/reset-password", 
        validateResetPassword,
        resetPassword
    )


export default router