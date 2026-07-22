import {
    getBooksService,
    getBookService,
    createBookService,
    updateBookService,
    deleteBookService
} from "../services/bookService.js"

import {
    createNoteService,
    updateNoteService,
    deleteNoteService
} from "../services/noteService.js"

export async function getBook(req, res) {
    const book = await getBookService(req.params.id)

    res.json({
        success: true,
        message: "Book found successfully",
        data: book
    })
}

export async function getBooks(req, res) {
    const books = await getBooksService()

    res.json({
        success: true,
        message: "Books fetched successfully",
        data: books
    })
}

export async function createBook(req, res) {
    const newBook = await createBookService(req.body)

    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook
    })
}

export async function updateBook(req, res) {
    const updatedBook = await updateBookService(req.params.id, req.body)

    return res.json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    })
}

export async function deleteBook (req, res) {
    const deletedBook = await deleteBookService(req.params.id)

    res.json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook
    })        
}

export async function createNote(req, res) {
    const newNote = await createNoteService(req.params.id, req.body)

    res.status(201).json({
        success: true,
        message: "Note added successfully",
        data: newNote
    })
}

export async function updateNote(req, res) {
    const updatedNote = await updateNoteService(req.params.id, req.params.noteId, req.body)

    res.json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote
    })
}

export async function deleteNote(req, res) {
    const deletedNote = await deleteNoteService(req.params.id, req.params.noteId)

    res.json({
        success: true,
        message: "Note deleted successfully",
        data: deletedNote
    })
}