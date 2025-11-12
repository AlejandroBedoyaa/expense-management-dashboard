import { toast } from "sonner"

const API_URL = import.meta.env.VITE_API_URL

async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Login failed")
    if (data.access_token) setToken(data.access_token)

    return data
}

async function signup(email: string, password: string, token: string) {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Error during signup")
    
    return data
}

export function logout(navigate?: (path: string) => void) {
    localStorage.removeItem("access_token")
    toast.success("Logged out successfully.")
    if (navigate) {
        navigate("/login")
    } else {
        window.location.href = "/login"
    }
}

export function setToken(token: string) {
    localStorage.setItem("access_token", token)
}

export function getToken() {
    return localStorage.getItem("access_token") || ""
}

export function isAuthenticated() {
    const token = localStorage.getItem("access_token")
    return !!token
}

const authService = {
    login,
    signup,
    logout,
    setToken,
    getToken,
    isAuthenticated,
}

export default authService