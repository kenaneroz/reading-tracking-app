import Book from "../models/Book.js"
import AppError from "../errors/AppError.js"

export async function updateLatestReadingActivityService(id, data) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError(
            "Book not found", 
            404
        )
    }

    const latestActivity = book.readingActivity.at(-1)

    if (!latestActivity) {
        throw new AppError(
            "No reading activity found", 
            404
        )
    }

    const { currentPage } = data

    if (currentPage < latestActivity.previousPage) {
        throw new AppError(
            "Current page cannot be less than the previous page of the latest reading activity",
            400
        )
    }

    if (currentPage > book.totalPages) {
        throw new AppError(
            "Current page cannot exceed total pages",
            400
        )
    }

    latestActivity.currentPage = currentPage
    book.currentPage = currentPage

    const updatedBook = await book.save()

    return updatedBook
}

export async function deleteLatestReadingActivityService(id) {
    const book = await Book.findById(id)

    if (!book) {
        throw new AppError("Book not found", 404)
    }

    const latestActivity = book.readingActivity.pop()

    if (!latestActivity) {
        throw new AppError("No reading activity found", 404)
    }

    book.currentPage = latestActivity.previousPage

    await book.save()

    return book
}