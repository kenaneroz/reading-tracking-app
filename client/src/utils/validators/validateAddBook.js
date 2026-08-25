export default function validateAddBook(formData) {
    const errors = {}

    if (!formData.title || formData.title.trim() === "") {
        errors.title = "Title is required"
    }

    if (!formData.author || formData.author.trim() === "") {
        errors.author = "Author is required"
    }

    if (!formData.cover || formData.cover.trim() === "") {
        errors.cover = "Cover is required"
    }

    if (!formData.genre || formData.genre.trim() === "") {
        errors.genre = "Genre is required"
    }

    if (!formData.format || formData.format.trim() === "") {
        errors.format = "Format is required"
    }

    if (formData.totalPages === null || formData.totalPages === "") {
        errors.totalPages = "Total pages is required"
    } else if (!Number.isFinite(Number(formData.totalPages))) {
        errors.totalPages = "Total pages must be a valid number"
    } else if (Number(formData.totalPages) < 1) {
        errors.totalPages = "Total pages must be at least 1"
    }

    if (formData.currentPage !== null && formData.currentPage !== "") {
        const current = Number(formData.currentPage)
        const total = Number(formData.totalPages)

        if (!Number.isFinite(current)) {
            errors.currentPage = "Current page must be a valid number"
        } else if (current < 0) {
            errors.currentPage = "Current page cannot be negative"
        } else if (formData.totalPages && current > total) {
            errors.currentPage = "Current page cannot exceed total pages"
        }
    }

    return errors
}