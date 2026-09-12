import Book from "../models/Book.js"
import AppError from "../errors/AppError.js"
import { BOOK_ERRORS, READING_ACTIVITY_ERRORS, ERRORS } from "../../shared/constants/errorMessages.js"

export async function updateLatestReadingActivityService(id, userId, data) {
    const book = await Book.findOne({ _id: id, userId: userId})

    if (!book) {
        throw new AppError(
            BOOK_ERRORS.NOT_FOUND,
            404
        )
    }

    const latestActivity = book.readingActivity.at(-1)

    if (!latestActivity) {
        throw new AppError(
            READING_ACTIVITY_ERRORS.NOT_FOUND,
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
            ERRORS.VALIDATION_FAILED,
            400,
            {
                currentPage: BOOK_ERRORS.PAGE_BELOW_PREVIOUS
            }
        )
    }

    if (currentPage > book.totalPages) {
        throw new AppError(
            ERRORS.VALIDATION_FAILED,
            400,
            {
                currentPage: BOOK_ERRORS.PAGE_EXCEEDS_TOTAL
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
        throw new AppError(BOOK_ERRORS.NOT_FOUND, 404)
    }

    const latestActivity = book.readingActivity.pop()

    if (!latestActivity) {
        throw new AppError(READING_ACTIVITY_ERRORS.NOT_FOUND, 404)
    }

    book.currentPage = latestActivity.previousPage

    await book.save()

    return book
}