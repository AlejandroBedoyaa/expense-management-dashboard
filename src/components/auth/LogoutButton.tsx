import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from "@/services/authService"

export function LogoutButton({ className }: { className?: string }) {
    const navigate = useNavigate()

    function handleLogout() {
        logout(navigate)
    }

    return (
        <Button className={className} onClick={handleLogout}>
            <LogOut />
            Log out
        </Button>
    )
}