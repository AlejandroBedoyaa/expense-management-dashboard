import { Navigate, Outlet } from "react-router-dom"
import authService from "@/services/authService"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

export function RequireAuth() {
    const { loading, isAuth } = authService.useAuth()

    if (loading) {
    return (
        <div className={cn("min-h-screen flex items-center justify-center bg-background")}>
            <span className="flex flex-col items-center gap-2 text-muted-foreground">
            <Spinner className="size-8" />
            </span>
        </div>
        )
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
