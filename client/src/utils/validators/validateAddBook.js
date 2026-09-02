export default function validateAddBook(formData, books = []) {
    const errors = {}

    const cleanTitle = formData.title?.trim()
    if (!cleanTitle) {
        errors.title = "Title is required"
    } else {
        const isExist = books.some(
            book => book.title?.trim().toLowerCase() === cleanTitle.toLowerCase()
        )
        if (isExist) {
            errors.title = "This book is already in your library"
        }
    }

    if (!formData.author || formData.author.trim() === "") {
        errors.author = "Author is required"
    }

    if (!formData.genre || formData.genre.trim() === "") {
        errors.genre = "Genre is required"
    }

    if (!formData.format || formData.format.trim() === "") {
        errors.format = "Format is required"
    }

    const totalNum = Number(formData.totalPages)
    if (formData.totalPages === null || formData.totalPages === "" || formData.totalPages === undefined) {
        errors.totalPages = "Total pages is required"
    } else if (!Number.isFinite(totalNum)) {
        errors.totalPages = "Total pages must be a valid number"
    } else if (totalNum < 1) {
        errors.totalPages = "Total pages must be at least 1"
    }

    if (formData.currentPage !== null && formData.currentPage !== "" && formData.currentPage !== undefined) {
        const currentNum = Number(formData.currentPage)

        if (!Number.isFinite(currentNum)) {
            errors.currentPage = "Current page must be a valid number"
        } else if (currentNum < 0) {
            errors.currentPage = "Current page cannot be negative"
        } else if (!errors.totalPages && currentNum > totalNum) {
            errors.currentPage = "Current page cannot exceed total pages"
        }
    }

    return errors
}