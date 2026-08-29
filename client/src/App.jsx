import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
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
import ConfirmDeleteAccountScreen from "./pages/ConfirmDeleteAccountScreen.jsx"

function AppRoutes() {
  const navigate = useNavigate()

  return (
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
                      title="Check your email"
                      message="We sent a password reset link to your email."
                      buttonText="Back to login"
                      onPrimaryClick={() => navigate("/sign-in")}
                    />
                  }
                />
                <Route path="/reset-password" element={<CreateNewPasswordScreen />} />
                <Route
                  path="/reset-password/success"
                  element={
                    <ConfirmationScreen
                      iconVariant="success"
                      title="Password updated"
                      message="Your password has been changed successfully."
                      buttonText="Back to login"
                      onPrimaryClick={() => navigate("/sign-in")}
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
                  path="/edit-profile/change-email/success"
                  element={
                    <ConfirmationScreen
                      iconVariant="success"
                      title="Email updated"
                      message="Your email has been changed successfully."
                      buttonText="Return to home"
                      onPrimaryClick={() => navigate("/home")}
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
                      iconVariant="success"
                      title="Password updated"
                      message="Your password has been changed successfully."
                      buttonText="Return to home"
                      onPrimaryClick={() => navigate("/home")}
                    />
                  }
                />
                <Route
                  path="/edit-profile/delete-account/check-email"
                  element={
                    <ConfirmationScreen
                      iconVariant="success"
                      title="Check your email"
                      message="We sent a confirmation link to delete your account. This action cannot be undone once confirmed."
                      buttonText="Return to home"
                      onPrimaryClick={() => navigate("/home")}
                    />
                  }
                />
                <Route 
                  path="/confirm-delete-account"
                  element={
                    <ConfirmDeleteAccountScreen />
                  }
                />
                <Route
                  path="/confirm-delete-account/success"
                  element={
                    <ConfirmationScreen
                      iconVariant="success"
                      title="Your accound delete"
                      message="Your account have been permanently deleted. We're sorry to hear that."
                      buttonText="Create a new account"
                      onPrimaryClick={() => navigate("/sign-up")}
                    />
                  }
                />                
              </Route>

              {/* 3. Unrecognized URL Check (Redirect to the home page instead of a 404) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  )
}

export default App