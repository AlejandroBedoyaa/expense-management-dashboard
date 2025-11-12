import { useEffect, useState } from "react"

export function useAuth() {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        setIsAuth(!!token)
        setLoading(false)
    }, [])

    return { loading, isAuth }
}