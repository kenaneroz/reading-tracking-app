import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import { useEffect, useState } from "react";
import { getBooks } from "./services/bookService.js"
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
            />
          } 
        />

        <Route
          path="/statistics"
          element={
            <StatisticsScreen 
              books={books}
              setBooks={setBooks}
            />
          }
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
