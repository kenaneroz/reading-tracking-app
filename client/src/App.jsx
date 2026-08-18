import { HugeiconsIcon } from "@hugeicons/react"
import { MailOpenIcon, PasswordValidationIcon } from "@hugeicons/core-free-icons"

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
import EditProfileScreen from './pages/EditProfileScreen'
import ChangeEmailAddressScreen from './pages/ChangeEmailAddressScreen'
import ChangePasswordScreen from './pages/ChangePasswordScreen'
import ConfirmationScreen from './components/shared/ConfirmationScreen'

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
        {/* Auth flow (logged out) */}

        <Route
          path="/"
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
          path="/forgot-password/check-email" 
          element={
            <ConfirmationScreen
                icon={MailOpenIcon}
                title="Check your email"
                message="We sent a password reset link to your email."
                buttonText="Back to login"
                buttonDestination="/sign-in"
            />
          } 
        />     

        <Route
          path="/reset-password"
          element={
            <CreateNewPasswordScreen />
          }
        />

        <Route 
          path="/reset-password/success" 
          element={
            <ConfirmationScreen
                icon={PasswordValidationIcon}
                iconVariant="success"
                title="Password updated"
                message="Your password has been changed successfully."
                buttonText="Back to login"
                buttonDestination="/sign-in"
            />
          } 
        />  

        {/* Main app (logged in) */}

        <Route 
          path="/home" 
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
          path="/edit-profile"
          element={
            <EditProfileScreen />
          }
        />  

        {/* Profile sub-flows (logged in) */}

        <Route
          path="/edit-profile/change-email"
          element={
            <ChangeEmailAddressScreen />
          }
        />   

        <Route 
          path="/edit-profile/change-email/check-email" 
          element={
            <ConfirmationScreen
                icon={MailOpenIcon}
                title="Check your email"
                message="We sent a confirmation link to your new email address."
                buttonText="Back to profile"
                buttonDestination="/edit-profile"
            />
          } 
        />    

        <Route
          path="/edit-profile/change-password"
          element={
            <ChangePasswordScreen />
          }
        />  

        <Route 
          path="/edit-profile/change-password/success" 
          element={
            <ConfirmationScreen
                icon={PasswordValidationIcon}
                iconVariant="success"
                title="Password updated"
                message="Your password has been changed successfully."
                buttonText="Back to profile"
                buttonDestination="/edit-profile"
            />
          } 
        />    

        <Route 
          path="/edit-profile/delete-account/check-email" 
          element={
            <ConfirmationScreen
                icon={MailOpenIcon}
                iconVariant="neutral"
                title="Check your email"
                message="We sent a confirmation link to delete your account. This action cannot be undone once confirmed."
                buttonText="Back to login"
                buttonDestination="/sign-in"
            />
          } 
        /> 
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
