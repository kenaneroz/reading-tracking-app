import Book from "../models/Book.js"
import AppError from "../errors/AppError.js"

import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js"
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"

export async function getBookService(id, userId) {
    const book = await Book.findOne({ _id: id, userId: userId})

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    return book
}
export async function getBooksService(userId) {
    const books = await Book.find({ userId: userId })

    return books
}

export async function updateBookCoverService(id, userId, file) {
    const book = await Book.findOne({ _id: id, userId: userId })

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    const uploadResult = await uploadToCloudinary(file.buffer, "covers", "bookCover")

    if (book.cover && !book.cover.includes("default")) {
        try {
            await deleteFromCloudinary("covers", book.cover)
        } catch (error) {
            console.error(error)
        }
    }

    book.cover = uploadResult.secure_url
    await book.save()

    return book
}
export async function createBookService(data) {
    const {
        userId,
        title, 
        author,
        genre,
        cover,
        currentPage,
        totalPages,
        rating,
        format
    } = data

    const cleanTitle = title?.trim()
    const existingBook = await Book.findOne({
        userId,
        title: { $regex: `^${cleanTitle}$`, $options: "i" }
    })
    if (existingBook) {
        throw new AppError(
            "This book is already in your library", 
            409,
            { title: "This book is already in your library" }
        )
    }

    const startingPage = currentPage ?? 0

    const readingActivity = 
        startingPage > 0
        ? [{
            previousPage: 0,
            currentPage: startingPage
        }]
        : []

    const newBook = await Book.create({ 
        userId,
        title: cleanTitle, 
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

export async function updateBookService(id, userId, data) {
    const book = await Book.findOne({ _id: id, userId: userId })

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
        format
    } = data

    const currentPage_ = currentPage ?? book.currentPage
    const totalPages_ = totalPages ?? book.totalPages

    if (currentPage_ > totalPages_) {
        throw new AppError(
            "Validation failed",
            400,
            {
                currentPage: "Current page cannot exceed total pages"
            }
        )
    }

    if (currentPage_ < book.currentPage) {
        throw new AppError(
            "Validation failed",
            400,
            {
                currentPage: "Current page cannot be less than the previous page"
            }
        )
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

    if (
        currentPage !== undefined &&
        currentPage !== book.currentPage
    ) {
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

export async function deleteBookService(id, userId) {
    const deletedBook = await Book.findOneAndDelete({ _id: id, userId: userId })

    if (!deletedBook) {
        throw new AppError("Book not found", 404)
    }

    if (deletedBook.cover && !deletedBook.cover.includes("default")) {
        try {
            await deleteFromCloudinary("covers", deletedBook.cover)
        } catch (error) {
            console.error("Cloudinary cover deletion failed:", error)
        }
    }

    return deletedBook
}