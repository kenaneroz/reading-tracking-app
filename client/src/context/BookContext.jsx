import { createContext, useContext, useEffect, useState } from "react"
import { 
    getBooks as getBooksApi,
    addBook as addBookApi,
    updateBook as updateBookApi,
    deleteBook as deleteBookApi,
    addNoteService as addNoteApi,
    updateNoteService as updateNoteApi,
    deleteNoteService as deleteNoteApi,
    updateLatestReadingActivityService as updateReadingActivityApi,
    deleteLatestReadingActivityService as deleteReadingActivityApi
} from "../services/bookService.js"

const BookContext = createContext(null)

export function BookProvider({ children }) {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    async function getBooks() {
        const token = localStorage.getItem("token")

        if (!token) {
            setBooks([])
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const books = await getBooksApi()
            setBooks(books)
        } catch (error) {
            console.error(error.message || error)
            setBooks([])
        } finally {
            setLoading(false)
        }
    }

    /* *************** Book *************** */

    async function addBook(bookData) {
        const newBook = await addBookApi(bookData)

        setBooks(prev => [newBook, ...prev])
        return newBook
    }

    async function updateBook(id, bookData) {
        const updatedBook = await updateBookApi(id, bookData)

        setBooks(prev => prev.map(book => (book._id === id ? updatedBook : book)))
        return updatedBook
    }

    async function deleteBook(id) {
        const deletedBook = await deleteBookApi(id)

        setBooks(prev => prev.filter(book => book._id !== id))
        return deletedBook
    }

    /* *************** Note *************** */
    
    async function addNote(id, data) {
        const newNote = await addNoteApi(id, data)

        setBooks(prev => prev.map(book =>
            book._id === id 
            ? { 
                ...book, 
                notes: [...book.notes, newNote]
            }
            : book
        ))

        return newNote
    }

    async function updateNote(id, noteId, data) {
        const updatedNote = await updateNoteApi(id, noteId, data)

        setBooks(prev => prev.map(book => 
            book._id === id
            ? { 
                ...book,  
                notes: book.notes.map(note => 
                    note._id === noteId
                    ? { ...updatedNote }
                    : note
                )
            }
            : book
        ))

        return updatedNote
    }

    async function deleteNote(id, noteId) {
        const deletedNote = await deleteNoteApi(id, noteId)

        setBooks(prev => prev.map(book =>
            book._id === id
            ? {
                ...book,
                notes: book.notes.filter(note => 
                    note._id !== noteId
                )
            }
            : book
        ))

        return deletedNote
    }

    /* *************** Reading activity *************** */

    async function deleteReadingActivity(id, data) {
        const updatedBook = await updateReadingActivityApi(id, data)

        setBooks(prev =>
            prev.map(book =>
                book._id === id ? updatedBook : book
            )
        )

        return updatedBook
    }

    useEffect(() => {
        getBooks()
    }, [])    

    return (
        <BookContext.Provider 
            value={
                { 
                    books, 
                    setBooks, 
                    loading, 
                    setLoading, 
                    getBooks,
                    addBook,
                    updateBook,
                    deleteBook,
                    addNote,
                    updateNote,
                    deleteNote,
                    deleteReadingActivity
                }
            }
        >
            {children}
        </BookContext.Provider>
    )
}

export function useBooks() {
    return useContext(BookContext)
}