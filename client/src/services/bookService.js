const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

async function apiFetch(endpoint, { method = 'GET', body } = {}, isRetry) {
    const isFormData = body instanceof FormData

    const response = await fetch(
        `${API_URL}${endpoint}`, 
        {
            method,
            headers: {
                ...(body !== undefined && !isFormData && { "Content-Type": "application/json" }),
            },
            credentials: "include",
            ...(body !== undefined && { body: isFormData ? body : JSON.stringify(body) })
        }
    )

    const result = await response.json()

    if (!response.ok) {
        if (isRetry) {
            throw result
        }

        if (response.status === 401) {
            const response = await fetch(
                `${API_URL}/auth/refresh`, 
                { 
                    method: "POST",
                    credentials: "include" 
                }
            )

            if (!response.ok) {
                const result = await response.json()
                throw result
            }

            return apiFetch(endpoint, { method, body }, true)
        }

        throw result
    }

    return result.data
}

/* *************** Books *************** */

export function getBooks() {
    return apiFetch("/books")
}

export function getBook(id) {
    return apiFetch(`/books/${id}`)
}

export function updateBookCover(id, file) {
    const formData = new FormData()
    formData.append("cover", file)

    return apiFetch(
        `/books/${id}/cover`,
        { method: "PATCH", body: formData }
    )
}
export function addBook(data) {
    return apiFetch(
        "/books", 
        {
            method: "POST",
            body: data
        }

    )
}

export function updateBook(id, data) {
    return apiFetch(
        `/books/${id}`, 
        {
            method: "PATCH",
            body: data
        }
    )
}

export function deleteBook(id) {
    return apiFetch(
        `/books/${id}`, 
        {
            method: "DELETE"
        }
    )
}

/* *************** Notes *************** */

export function addNoteService(id, data) {
    return apiFetch(
        `/books/${id}/notes`, 
        {
            method: "POST",
            body: data
        }
    )
}

export function updateNoteService(id, noteId, data) {
    return apiFetch(
        `/books/${id}/notes/${noteId}`, 
        {
            method: "PATCH",
            body: data
        }
    )
}

export function deleteNoteService(id, noteId) {
    return apiFetch(
        `/books/${id}/notes/${noteId}`, 
        {
            method: "DELETE"
        }
    )
}

/* *************** Reading activity *************** */

export function updateLatestReadingActivityService(id, data) {
    return apiFetch(
        `/books/${id}/reading-activity/latest`, 
        {
            method: "PATCH",
            body: data
        }
    )
}

export function deleteLatestReadingActivityService(id) {
    return apiFetch(
        `/books/${id}/reading-activity/latest`, 
        {
            method: "DELETE"
        }
    )
}