export async function getBook(id) {
    try {
        const response = await fetch(`http://localhost:3000/books/${id}`)

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong")
        }

        return result.data
    } catch (error) {
        throw error
    }  
}

export async function getBooks() {
    try {
        const response = await fetch("http://localhost:3000/books/")

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong")
        }

        return result.data
    } catch (error) {
        throw error
    }
}

export async function addBook(data) {
    try {
        const response = await fetch(
            "http://localhost:3000/books",
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
            throw new Error(result.message || "Something went wrong")
        }

        return result.data
    } catch (error) {
        throw error
    }  
}

export async function updateBook(id, data) {
    try {
        const response = await fetch(
            `http://localhost:3000/books/${id}`,
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
            throw new Error(result.message || "Something went wrong")
        }

        return result.data
    } catch (error) {
        throw error
    }  
}

export async function deleteBook(id) {
    try {
        const response = await fetch(
            `http://localhost:3000/books/${id}`,
            { method: "DELETE" }
        )

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong")
        }

        return result.data
    } catch (error) {
        throw error
    }  
}

export async function addNoteService(id, data) {
    try {
        const response = await fetch(
            `http://localhost:3000/books/${id}/notes`,
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
            throw new Error(result.message || "Something went wrong")
        }

        return result.data
    } catch (error) {
        throw error
    }  
}

export async function updateNoteService(id, noteId, data) {
    try {
        const response = await fetch(
            `http://localhost:3000/books/${id}/notes/${noteId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )

        const result = await response.json()

        if (!response.ok) throw new Error(result.message || "Something went wrong")

        return result.data
    } catch (error) {
        throw error
    }
}

export async function deleteNoteService(id, noteId) {
    try {
        const response = await fetch(
            `http://localhost:3000/books/${id}/notes/${noteId}`,
            {
                method: "DELETE"
            }
        )

        const result = await response.json()

        if (!response.ok) throw new Error(result.message || "Something went wrong")

        return result.data
    } catch (error) {
        throw error
    }
}