import express from "express"

import { 
    getUser,
    register, 
    login,
    updateUser,
    deleteUser
} from "../controllers/authController.js"

import validateRegister from "../middlewares/validateRegister.js"
import validateLogin from "../middlewares/validateLogin.js"
import validateUpdateUser from "../middlewares/validateUpdateUser.js"

import verifyToken from "../middlewares/verifyToken.js"

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
    .delete("/me",
        verifyToken,
        deleteUser
    )
    .patch("/me",
        verifyToken,
        validateUpdateUser,
        updateUser
    )


export default router