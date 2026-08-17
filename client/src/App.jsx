import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import { useEffect, useState } from "react";
import { getBooks } from "./services/bookService.js"
import StatisticsScreen from './pages/StatisticsScreen'
import StartScreen from './pages/StartScreen'
import SignUpScreen from './pages/SignUpScreen'
import SignInScreen from './pages/SignInScreen'
import ForgotPasswordScreen from './pages/ForgotPasswordScreen'
import CreateNewPasswordScreen from './pages/CreateNewPasswordScreen'
import EditProfileScreen from './pages/EditProfileScreen.jsx';

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

        <Route
          path="/start"
          element={
            <StartScreen />
          }
        />

        <Route
          path="/sign-up"
          element={
            <SignUpScreen />
          }
        />

        <Route
          path="/sign-in"
          element={
            <SignInScreen />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordScreen />
          }
        />

        <Route
          path="/create-new-password"
          element={
            <CreateNewPasswordScreen />
          }
        />

        <Route
          path="/edit-profile"
          element={
            <EditProfileScreen />
          }
        />    
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
