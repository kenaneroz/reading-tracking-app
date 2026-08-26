import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { MailOpenIcon, PasswordValidationIcon } from "@hugeicons/core-free-icons"

import "./App.css"

import { AuthProvider } from "./context/authContext.jsx"
import { BookProvider } from "./context/BookContext.jsx"

import ProtectedRoute from "./components/shared/ProtectedRoute"
import PublicRoute from "./components/shared/PublicRoute.jsx"
import AppLayout from "./layouts/AppLayout"
import BottomNavLayout from "./layouts/BottomNavLayout"

import StartScreen from "./pages/StartScreen"
import SignUpScreen from "./pages/SignUpScreen"
import SignInScreen from "./pages/SignInScreen"
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen"
import CreateNewPasswordScreen from "./pages/CreateNewPasswordScreen"

import HomeScreen from "./pages/HomeScreen"
import DetailsScreen from "./pages/DetailsScreen"
import StatisticsScreen from "./pages/StatisticsScreen"
import EditProfileScreen from "./pages/EditProfileScreen"
import ChangeEmailAddressScreen from "./pages/ChangeEmailAddressScreen"
import ChangePasswordScreen from "./pages/ChangePasswordScreen"
import ConfirmationScreen from "./components/shared/ConfirmationScreen"

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>

              {/* 1. Auth Flow (Only users who are NOT logged in) */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<StartScreen />} />
                <Route path="/sign-up" element={<SignUpScreen />} />
                <Route path="/sign-in" element={<SignInScreen />} />
                <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
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
                <Route path="/reset-password" element={<CreateNewPasswordScreen />} />
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
              </Route>

              {/* 2. Main App Flow (Only users who are LOGGED IN) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<BottomNavLayout />}>
                  <Route path="/home" element={<HomeScreen />} />
                  <Route path="/statistics" element={<StatisticsScreen />} />
                </Route>
                <Route path="/book/:id" element={<DetailsScreen />} />
                <Route path="/edit-profile" element={<EditProfileScreen />} />

                {/* Profile sub-flows */}
                <Route
                  path="/edit-profile/change-email"
                  element={<ChangeEmailAddressScreen />}
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
                  element={<ChangePasswordScreen />}
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
              </Route>

              {/* 3. Unrecognized URL Check (Redirect to the home page instead of a 404) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  )
}

export default App