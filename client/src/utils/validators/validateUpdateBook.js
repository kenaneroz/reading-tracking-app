export default function validateUpdateBook(formData = {}, originalBook = {}) {
    const errors = {}

    if (formData.title !== undefined) {
        if (formData.title === null || typeof formData.title !== "string" || formData.title.trim() === "") {
            errors.title = "Title is required"
        }
    }

    if (formData.author !== undefined) {
        if (formData.author === null || typeof formData.author !== "string" || formData.author.trim() === "") {
            errors.author = "Author is required"
        }
    }

    if (formData.genre !== undefined) {
        if (formData.genre === null || typeof formData.genre !== "string" || formData.genre.trim() === "") {
            errors.genre = "Genre is required"
        } 
    }

    if (formData.cover !== undefined) {
        if (formData.cover === null || typeof formData.cover !== "string" || formData.cover.trim() === "") {
            errors.cover = "Cover is required"
        }
    }

    if (formData.totalPages !== undefined) {
        const total = Number(formData.totalPages)
        if (formData.totalPages === null || formData.totalPages === "" || !Number.isFinite(total)) {
            errors.totalPages = "Total pages must be a valid number"
        } else if (total < 1) {
            errors.totalPages = "Total pages must be at least 1"
        }
    }

    if (formData.currentPage !== undefined) {
        const total = formData.totalPages !== undefined
            ? Number(formData.totalPages)
            : Number(originalBook.totalPages)
        
        const previousCurrent = originalBook.currentPage !== undefined 
            ? Number(originalBook.currentPage) 
            : null

        const current = Number(formData.currentPage)

        if (formData.currentPage === null || formData.currentPage === "" || !Number.isFinite(current)) {
            errors.currentPage = "Current page must be a valid number"
        } else if (current < 0) {
            errors.currentPage = "Current page cannot be negative"
        } else if (previousCurrent !== null && current < previousCurrent) {
            errors.currentPage = "Current page cannot be less than previous page"
        } else if (total && current > total) {
            errors.currentPage = "Current page cannot exceed total pages"
        }
    }

    if (formData.format !== undefined) {
        if (formData.format === null || typeof formData.format !== "string" || formData.format.trim() === "") {
            errors.format = "Format is required"
        }
    }

    return errors
}