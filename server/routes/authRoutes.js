import express from "express"

import { 
    getUser,
    register, 
    login,
    deleteUser
} from "../controllers/authController.js"

import validateRegister from "../middlewares/validateRegister.js"
import validateLogin from "../middlewares/validateLogin.js"

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


export default router