import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
import bookRoutes from "./routes/bookRoutes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"

// APP 
const PORT = process.env.PORT
const app = express()

// MIDDLEWARES
app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use("/books", bookRoutes)
app.use(errorMiddleware)

// CONNECTION
try {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
} catch (error) {
    console.error(error)
}







