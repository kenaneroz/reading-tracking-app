import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/authContext"

import Loading from "./Loading"

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}