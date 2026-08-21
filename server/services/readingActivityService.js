import Book from "../models/Book.js"
import AppError from "../errors/AppError.js"

export async function updateLatestReadingActivityService(id, userId, data) {
    const book = await Book.findOne({ _id: id, userId: userId})

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

    if (
        book.readingActivity.length === 1 &&
        currentPage === latestActivity.previousPage
    ) {
        book.readingActivity = []
        book.currentPage = currentPage

        const updatedBook = await book.save()

        return updatedBook
    }

    if (currentPage < latestActivity.previousPage) {
        throw new AppError(
            "Validation failed",
            400,
            {
                currentPage: "Current page cannot be less than the previous page"
            }
        )
    }

    if (currentPage > book.totalPages) {
        throw new AppError(
            "Validation failed",
            400,
            {
                currentPage: "Current page cannot exceed total pages"
            }
        )
    }

    latestActivity.currentPage = currentPage
    book.currentPage = currentPage

    const updatedBook = await book.save()

    return updatedBook
}

export async function deleteLatestReadingActivityService(id, userId) {
    const book = await Book.findOne({ _id: id, userId: userId})

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