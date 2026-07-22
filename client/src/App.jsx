import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import { useEffect, useState } from "react";
import {
  getBook,
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  addNoteService,
  updateNoteService,
  deleteNoteService
} from "./services/bookService.js"

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      async function fetchBooks() {
          try {
              const books = await getBooks()

              const books_ = books.map(book => {
                  return book.currentPage === 0
                      ? { ...book, status: "Wishlist" }
                      : book.currentPage === book.totalPages
                          ? { ...book, status: "Finished" }
                          : { ...book, status: "Reading" }
              })
              setBooks(books_)
          } catch (error) {
              console.log(error.message)
          } finally {
              setLoading(false)
          }
      }

      fetchBooks()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomeScreen 
              books={books} 
              setBooks={setBooks} 
              loading={loading} 
              addBook={addBook}
              updateBook={updateBook}
            />
          } 
        />

        <Route 
          path="/book/:id" 
          element={
            <DetailsScreen 
              books={books} 
              setBooks={setBooks}
              loading={loading}
              updateBook={updateBook}
              deleteBook={deleteBook} 
              addNoteService={addNoteService}
              updateNoteService={updateNoteService}
              deleteNoteService={deleteNoteService}
            />
          } 
          />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
