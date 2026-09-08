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
    verifyResetToken as verifyResetTokenApi,
    logout as logoutApi
} from "../services/authService"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const isAuthenticated = Boolean(user)

    useEffect(() => {    
        (async () => {
            try {
                const userData = await getUserApi()
                setUser(userData)
            } catch (error) {
                console.error(error)
                if (error.statusCode === 401) logout()
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    async function login(credentials) {
        const user = await loginApi(credentials)
        if (user) setUser(user)
        
        return user
    }

    async function register(credentials) {
        const user = await registerApi(credentials)
        if (user) setUser(user)

        return user
    }

    function logout() {
        logoutApi()
        setUser(null)
    }

    async function updateProfilePhoto(file) {
        const updatedUser = await updateProfilePhotoApi(file)
        setUser(updatedUser)
        return updatedUser
    }
    async function updateProfile(data) {
        const updatedUser = await updateProfileApi(data)
        setUser(updatedUser)
        return updatedUser
    }

    async function updateEmail(data) {
        const updatedUser = await updateEmailApi(data)
        setUser(updatedUser)
        return updatedUser
    }

    async function updatePassword(data) {
        await updatePasswordApi(data)
    }

    async function forgotPassword(data) {
        await forgotPasswordApi(data)
    }
    async function resetPassword(resetToken, data) {
        await resetPasswordApi(resetToken, data)
    }

    async function requestDeleteAccount() {
        await requestDeleteAccountApi()
    }

    async function confirmDeleteAccount(deleteAccountToken) {
        await confirmDeleteAccountApi(deleteAccountToken)
    }

    async function verifyDeleteAccountToken(deleteAccountToken) {
        await verifyDeleteAccountTokenApi(deleteAccountToken)
    }

    async function verifyResetToken(resetToken) {
        await verifyResetTokenApi(resetToken)
    }

 
    return (
        <AuthContext.Provider 
            value={
                { 
                    user, 
                    setUser,
                    isAuthenticated, 
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