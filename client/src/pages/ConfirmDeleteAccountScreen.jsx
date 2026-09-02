import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../components/shared/Button"

import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react"
import ConfirmationScreen from "../components/shared/ConfirmationScreen"

export default function ConfirmDeleteAccountScreen() {
    const { verifyDeleteAccountToken, confirmDeleteAccount, logout } = useAuth()
    const [searchParams] = useSearchParams()
    const [errors, setErrors] = useState({})
    const deleteAccountToken = searchParams.get("token")
    const token = localStorage.getItem("token")

    const [verifying, setVerifying] = useState(true)
    const [deleting, setDeleting] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!deleteAccountToken) {
            setErrors({ link: "Invalid or expired link" })
            setVerifying(false)
            return
        }

        async function verifyToken() {
            try {
                await verifyDeleteAccountToken(deleteAccountToken)
            } catch (error) {
                setErrors(error.errors || {})
                console.error(error)
            } finally {
                setVerifying(false)
            }
        }

        verifyToken()
    }, [])
 
    async function handleDelete() {
        setDeleting(true)

        try {
            await confirmDeleteAccount(token, deleteAccountToken)
            logout()
            navigate("/confirm-delete-account/success")
        } catch (error) {
            console.error(error)
        } finally {
            setDeleting(false)
        }
    }

    if (verifying) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p className="text-espresso text-body">Verifying...</p>
            </div>
        )
    }

    if (errors.link) {
        return (
            <ConfirmationScreen 
                title="Invalid or expired link"
                message="This password reset link is invalid or has expired. Please request a new one."
                buttonText="Return to home"
                onPrimaryClick={() => navigate("/home")}
            />           
        )        
    }

    return (
        <ConfirmationScreen
            title="Delete your account?"
            message="This action is permanent and cannot be undone. All your reading data will be permanently lost."
            buttonText="Confirm"
            onPrimaryClick={handleDelete}
            secondaryText="Return to home"
            onSecondaryClick={() => navigate("/home")}
        />
    )
}