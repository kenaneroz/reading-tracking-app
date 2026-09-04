import { createContext, useContext, useEffect, useState } from "react"
import { 
    getUser as getUserApi,
    login as loginApi, 
    register as registerApi,
    updateProfilePhoto as updateProfilePhotoApi,
    updateProfile as updateProfileApi,
    updateEmail as updateEmailApi,
    updatePassword as updatePasswordApi,
    forgotPassword as forgotPasswordApi,
    resetPassword as resetPasswordApi,
    requestDeleteAccount as requestDeleteAccountApi,
    confirmDeleteAccount as confirmDeleteAccountApi,
    verifyDeleteAccountToken as verifyDeleteAccountTokenApi,
    verifyResetToken as verifyResetTokenApi
} from "../services/authService"

import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token)
        return decoded.exp * 1000 < Date.now()
    } catch (error) {
        return true
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        const t = localStorage.getItem("token")

        if (t && !isTokenExpired(t)) return t

        localStorage.removeItem("token")
        return null
    })
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(Boolean(token))

    useEffect(() => {
        if (!token) {
            setUser(null)
            return
        }
        
        (async () => {
            try {
                const userData = await getUserApi(token)
                setUser(userData)
            } catch (error) {
                console.error(error)
                if (error.statusCode === 401) logout()
            } finally {
                setLoading(false)
            }
        })()
    }, [token])

    async function login(credentials) {
        const data = await loginApi(credentials)

        if (data?.token) {
            localStorage.setItem("token", data.token)
            setToken(data.token)
            setUser(data.user)
        }
        
        return data
    }

    async function register(credentials) {
        const data = await registerApi(credentials)
        
        if (data?.token) {
            localStorage.setItem("token", data.token)
            setToken(data.token)
            setUser(data.user)
        }
        
        return data
    }

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    async function updateProfilePhoto(token, file) {
        const updatedUser = await updateProfilePhotoApi(token, file)
        setUser(updatedUser)
        return updatedUser
    }
    async function updateProfile(token, data) {
        const updatedUser = await updateProfileApi(token, data)
        setUser(updatedUser)
        return updatedUser
    }

    async function updateEmail(token, data) {
        const updatedUser = await updateEmailApi(token, data)
        setUser(updatedUser)
        return updatedUser
    }

    async function updatePassword(token, data) {
        await updatePasswordApi(token, data)
    }

    async function forgotPassword(data) {
        await forgotPasswordApi(data)
    }
    async function resetPassword(resetToken, data) {
        await resetPasswordApi(resetToken, data)
    }

    async function requestDeleteAccount(token) {
        await requestDeleteAccountApi(token)
    }

    async function confirmDeleteAccount(token, deleteAccountToken) {
        await confirmDeleteAccountApi(token, deleteAccountToken)
    }

    async function verifyDeleteAccountToken(deleteAccountToken) {
        await verifyDeleteAccountTokenApi(deleteAccountToken)
    }

    async function verifyResetToken(resetToken) {
        await verifyResetTokenApi(resetToken)
    }

    // Check isTokenExpired
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("token")
            
            if (token && isTokenExpired(token)) {
                logout()
            }
        }, 15000)

        return () => clearInterval(interval)
    }, [])

    return (
        <AuthContext.Provider 
            value={
                { 
                    token, 
                    user, 
                    setUser,
                    isAuthenticated: Boolean(token), 
                    loading,
                    login, 
                    register, 
                    logout,
                    updateProfilePhoto,
                    updateProfile,
                    updateEmail,
                    updatePassword,
                    forgotPassword,
                    resetPassword,
                    requestDeleteAccount,
                    verifyDeleteAccountToken,
                    confirmDeleteAccount,
                    verifyResetToken
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}