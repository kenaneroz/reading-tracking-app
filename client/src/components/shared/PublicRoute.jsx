import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import Loading from "./Loading"

export default function PublicRoute() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (isAuthenticated) {
        return <Navigate to="/home" replace />
    }

    return <Outlet />
}