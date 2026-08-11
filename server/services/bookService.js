import Book from "../models/Book.js"
import AppError from "../errors/AppError.js"

export async function getBookService(id) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    return book
}
export async function getBooksService() {
    const books = await Book.find()

    return books
}

export async function createBookService(data) {
    const {
        title, 
        author,
        genre,
        cover,
        currentPage,
        totalPages,
        rating,
        format
    } = data

    const startingPage = currentPage ?? 0

    const readingActivity = 
        startingPage > 0
        ? [{
            previousPage: 0,
            currentPage: startingPage
        }]
        : []

    const newBook = await Book.create({ 
        title, 
        author,
        genre,
        cover,
        currentPage: startingPage,
        totalPages,
        rating,
        format,
        readingActivity
    })
    
    return newBook
}

export async function updateBookService(id, data) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    const {
        title, 
        author,
        genre,
        cover,
        currentPage,
        totalPages,
        rating,
        format,
        readingActivity
    } = data

    const currentPage_ = currentPage ?? book.currentPage
    const totalPages_ = totalPages ?? book.totalPages

    if (currentPage_ > totalPages_) {
        throw new AppError("Current page cannot exceed total pages", 400)
    }

    if (currentPage_ < book.currentPage) {
        throw new AppError("Current page cannot be less than the previous page", 400)
    }

    if (title !== undefined) {
        book.title = title.trim()
    }

    if (author !== undefined) {
        book.author = author.trim()
    }

    if (genre !== undefined) {
        book.genre = genre
    }

    if (cover !== undefined) {
        book.cover = cover.trim()
    }

    if (format !== undefined) {
        book.format = format.trim()
    }

    if(currentPage !== undefined && currentPage !== book.currentPage) {
        book.readingActivity.push({
            previousPage: book.currentPage,
            currentPage: currentPage_
        })
    }

    if (currentPage !== undefined) {
        book.currentPage = currentPage
    }

    if (totalPages !== undefined) {
        book.totalPages = totalPages
    }

    if (rating !== undefined) {
        book.rating = rating
    }

    const updatedBook = await book.save()

    return updatedBook
}

export async function deleteBookService(id) {
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
        throw new AppError("Book not found", 404)
    }

    return deletedBook
}