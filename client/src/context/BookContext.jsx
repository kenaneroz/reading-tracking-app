import { createContext, useContext, useEffect, useState } from "react"
import { 
    getBooks as getBooksApi,
    addBook as addBookApi,
    updateBook as updateBookApi,
    deleteBook as deleteBookApi
    
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
                    deleteBook
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