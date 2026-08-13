const API_URL = import.meta.env.VITE_API_URL

export async function getBook(id) {
    const response = await fetch(`${API_URL}/books/${id}`)

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function getBooks() {
    const response = await fetch(`${API_URL}/books/`)

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function addBook(data) {
    const response = await fetch(
        `${API_URL}/books`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function updateBook(id, data) {
    const response = await fetch(
        `${API_URL}/books/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function deleteBook(id) {
    const response = await fetch(
        `${API_URL}/books/${id}`,
        {
            method: "DELETE"
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function addNoteService(id, data) {
    const response = await fetch(
        `${API_URL}/books/${id}/notes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function updateNoteService(id, noteId, data) {
    const response = await fetch(
        `${API_URL}/books/${id}/notes/${noteId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function deleteNoteService(id, noteId) {
    const response = await fetch(
        `${API_URL}/books/${id}/notes/${noteId}`,
        {
            method: "DELETE"
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function updateLatestReadingActivityService(id, data) {
    const response = await fetch(
        `${API_URL}/books/${id}/reading-activity/latest`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function deleteLatestReadingActivityService(id) {
    const response = await fetch(
        `${API_URL}/books/${id}/reading-activity/latest`,
        {
            method: "DELETE"
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}