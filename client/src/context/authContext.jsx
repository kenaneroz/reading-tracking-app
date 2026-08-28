import { createContext, useContext, useEffect, useState } from "react"
import { 
    getUser as getUserApi,
    login as loginApi, 
    register as registerApi,
    updateProfile as updateProfileApi,
    updateEmail as updateEmailApi,
    updatePassword as updatePasswordApi,
    forgotPassword as forgotPasswordApi,
    resetPassword as resetPasswordApi,
    deleteUser as deleteUserApi,
    verifyResetToken as verifyResetTokenApi
} from "../services/authService"

import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        const t = localStorage.getItem("token")
        
        if (t) {
            try {
                const exp = jwtDecode(t)?.exp
    
                if (exp * 1000 < Date.now()) {
                    localStorage.removeItem("token")
                    return null
                } 
            } catch (error) {
                console.error(error)
                localStorage.removeItem("token")
                return null
            }
        }

        return t
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

    async function deleteAccount(token) {
        const deletedAccount = await deleteUserApi(token)
        logout()
        return deletedAccount
    }
 
    async function verifyResetToken(resetToken) {
        await verifyResetTokenApi(resetToken)
    }

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
                    updateProfile,
                    updateEmail,
                    updatePassword,
                    forgotPassword,
                    resetPassword,
                    deleteAccount,
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