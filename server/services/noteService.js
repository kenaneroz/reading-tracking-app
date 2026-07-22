import Book from "../models/Book.js"
import AppError from "../errors/AppError.js"

export async function createNoteService(id, data) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    const { content, page } = data

    if (page !== undefined && page !== null) {
        if (page > book.totalPages) {
            throw new AppError("Page cannot exceed total pages", 400)
        }
    }

    const newNote = {
        content: content.trim()
    }
    if (page !== undefined) newNote.page = page
    
    book.notes.push(newNote)

    const updatedBook = await book.save()

    return updatedBook.notes[updatedBook.notes.length - 1] 
}

export async function updateNoteService(id, noteId, data) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    const note = book.notes.id(noteId)

    if (!note) {
        throw new AppError("Note not found", 404)
    }

    const { content, page } = data
    
    if (page !== undefined && page !== null) {
        if (page > book.totalPages) {
            throw new AppError("Page cannot exceed total pages", 400)
        }
    }

    if (content !== undefined) note.content = content.trim()
    if (page === null) note.page = null
    else if (page !== undefined) note.page = page 
    
    await book.save()

    return note
}

export async function deleteNoteService(id, noteId) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    const note = book.notes.id(noteId)

    if (!note) {
        throw new AppError("Note not found", 404)
    }

    note.deleteOne()

    await book.save()

    return note
}