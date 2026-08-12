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
  deleteNoteService,
  deleteLatestReadingActivityService,
  updateLatestReadingActivityService
} from "./services/bookService.js"
import StatisticsScreen from './pages/StatisticsScreen'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      async function fetchBooks() {
          try {
              const books = await getBooks()

              setBooks(books)
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
              deleteLatestReadingActivityService={deleteLatestReadingActivityService}
              updateLatestReadingActivityService={updateLatestReadingActivityService}
            />
          } 
        />

        <Route
          path="/statistics"
          element={
            <StatisticsScreen 
              books={books}
              addBook={addBook}
              setBooks={setBooks}
            />
          }
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
