import {
    getBooksService,
    getBookService,
    updateBookCoverService,
    createBookService,
    updateBookService,
    deleteBookService,
} from "../services/bookService.js"

import {
    createNoteService,
    updateNoteService,
    deleteNoteService
} from "../services/noteService.js"

import {
  deleteLatestReadingActivityService,
  updateLatestReadingActivityService
} from "../services/readingActivityService.js"

export async function getBook(req, res) {
    const book = await getBookService(req.params.id, req.userId)

    res.json({
        success: true,
        message: "Book found successfully",
        data: book
    })
}

export async function getBooks(req, res) {
    const books = await getBooksService(req.userId)

    res.json({
        success: true,
        message: "Books fetched successfully",
        data: books
    })
}

export async function updateBookCover(req, res) {
    const cover =await updateBookCoverService(
        req.params.id,
        req.userId,
        req.file
    )

    res.status(201).json({
        success: true,
        message: "Cover added successfully",
        data: cover
    })
}
export async function createBook(req, res) {
    const newBook = await createBookService({
        ...req.body,
        userId: req.userId
    })

    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook
    })
}

export async function updateBook(req, res) {
    const updatedBook = await updateBookService(req.params.id, req.userId, req.body)

    return res.json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    })
}

export async function deleteBook (req, res) {
    const deletedBook = await deleteBookService(req.params.id, req.userId)

    res.json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook
    })        
}

export async function createNote(req, res) {
    const newNote = await createNoteService(req.params.id, req.userId, req.body)

    res.status(201).json({
        success: true,
        message: "Note added successfully",
        data: newNote
    })
}

export async function updateNote(req, res) {
    const updatedNote = await updateNoteService(req.params.id, req.userId, req.params.noteId, req.body)

    res.json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote
    })
}

export async function deleteNote(req, res) {
    const deletedNote = await deleteNoteService(req.params.id, req.userId, req.params.noteId)

    res.json({
        success: true,
        message: "Note deleted successfully",
        data: deletedNote
    })
}

export async function updateLatestReadingActivity(req, res) {
    const latestReadingActivity = await updateLatestReadingActivityService(req.params.id, req.userId, req.body)

    res.json({
        success: true,
        message: "Latest reading activity updated successfully",
        data: latestReadingActivity
    })
}

export async function deleteLatestReadingActivity(req, res) {
    const latestReadingActivity = await deleteLatestReadingActivityService(req.params.id, req.userId)

    res.json({
        success: true,
        message: "Latest reading activity deleted successfully",
        data: latestReadingActivity
    })
}