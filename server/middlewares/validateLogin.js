export default function validateLogin(req, res, next) {
    const errors = {}

    const { 
        email, 
        password 
    } = req.body

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email == null || typeof email !== "string" || email.trim() === "") {
        errors.email = "Email is required"
    } else if (!emailRegex.test(email.trim())) {
        errors.email = "Invalid email address"
    }

    if (password == null || typeof password !== "string" || password.trim() === "") {
        errors.password = "Password is required"
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        })
    }
    
    next()
}