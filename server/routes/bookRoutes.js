import express from "express"

import { 
    getBooks,
    getBook, 
    createBook, 
    updateBook, 
    deleteBook,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/bookController.js"

import validateCreateBook from "../middlewares/validateCreateBook.js"
import validateUpdateBook from "../middlewares/validateUpdateBook.js"
import validateCreateNote from "../middlewares/validateCreateNote.js"
import validateUpdateNote from "../middlewares/validateUpdateNote.js"

const router = express.Router()

router
    .get("/", getBooks)
    .get("/:id", getBook)
    .post("/", 
        validateCreateBook,
        createBook
    )
    .patch("/:id", 
        validateUpdateBook,
        updateBook
    )
    .delete("/:id", deleteBook)

    .post("/:id/notes/", 
        validateCreateNote,
        createNote
    )
    .patch("/:id/notes/:noteId", 
        validateUpdateNote,
        updateNote
    )
    .delete("/:id/notes/:noteId", deleteNote)

export default router

