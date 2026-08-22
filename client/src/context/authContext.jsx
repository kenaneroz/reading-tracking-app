import { createContext, useContext, useEffect, useState } from "react"
import { 
    getUser as getUserApi,
    login as loginApi, 
    register as registerApi,
    deleteUser as deleteUserApi
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
                console.error("Invalid token format", error)
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
                console.error("User information could not be retrieved: ", error)
                logout()
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

    async function deleteAccount() {
        const deletedAccount = await deleteUserApi(token)

        return deletedAccount
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
                    deleteAccount
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