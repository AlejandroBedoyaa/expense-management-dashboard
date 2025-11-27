import { toast } from "sonner"
import { useState, useEffect, useCallback } from "react"
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL

// Variables para controlar la renovación automática
let lastActivityTime = Date.now();
let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;

function useAuth() {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    const checkTokenExpiration = useCallback(() => {
        const token = getToken();
        if (!token) return false;

        try {
            const { exp } = jwtDecode<{ exp: number }>(token);
            const currentTime = Date.now();
            const expirationTime = exp * 1000;
            
            // Si el token ya expiró
            if (currentTime >= expirationTime) {
                return false;
            }
            
            return true;
        } catch {
            return false;
        }
    }, []);

    const scheduleTokenRefresh = useCallback(() => {
        const token = getToken();
        if (!token) return;

        try {
            const { exp } = jwtDecode<{ exp: number }>(token);
            const currentTime = Date.now();
            const expirationTime = exp * 1000;
            const timeUntilExpiration = expirationTime - currentTime;
            
            // Renovar el token 5 minutos antes de que expire
            const refreshTime = timeUntilExpiration - (5 * 60 * 1000);
            
            if (refreshTime > 0) {
                // Limpiar timeout anterior si existe
                if (refreshTokenTimeout) {
                    clearTimeout(refreshTokenTimeout);
                }
                
                refreshTokenTimeout = setTimeout(async () => {
                    // Solo renovar si hubo actividad en los últimos 10 minutos
                    const timeSinceLastActivity = Date.now() - lastActivityTime;
                    const tenMinutes = 10 * 60 * 1000;
                    
                    if (timeSinceLastActivity < tenMinutes) {
                        await refreshToken();
                    }
                }, refreshTime);
            }
        } catch (error) {
            console.error('Error scheduling token refresh:', error);
        }
    }, []);

    const trackActivity = useCallback(() => {
        lastActivityTime = Date.now();
    }, []);

    useEffect(() => {
        const token = getToken();
        
        if (token && checkTokenExpiration()) {
            setIsAuth(true);
            scheduleTokenRefresh();
        } else if (token) {
            setIsAuth(false);
            logout();
        } else {
            setIsAuth(false);
        }
        
        setLoading(false);

        // Eventos para detectar actividad del usuario
        const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
        
        activityEvents.forEach(event => {
            window.addEventListener(event, trackActivity);
        });

        // Verificar el token cada minuto
        const checkInterval = setInterval(() => {
            if (!checkTokenExpiration()) {
                setIsAuth(false);
                logout();
            }
        }, 60000); // 1 minuto

        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, trackActivity);
            });
            clearInterval(checkInterval);
            if (refreshTokenTimeout) {
                clearTimeout(refreshTokenTimeout);
            }
        };
    }, [checkTokenExpiration, scheduleTokenRefresh, trackActivity]);

    return { loading, isAuth }
}

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

async function refreshToken() {
    try {
        const currentToken = getToken();
        if (!currentToken) {
            throw new Error('No token available');
        }

        const res = await fetch(`${API_URL}/refresh`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentToken}`
            },
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || "Failed to refresh token");
        }

        if (data.access_token) {
            setToken(data.access_token);
            toast.success("Session refreshed");
            return data.access_token;
        }

        throw new Error("No access token in response");
    } catch (error) {
        console.error('Error refreshing token:', error);
        logout();
        throw error;
    }
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = authService.getToken();

    const res = await fetch(url, {
        ...options,
        headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        logout();
        throw new Error('Unauthorized');
    }

    return res;
}

const authService = {
    login,
    signup,
    logout,
    setToken,
    getToken,
    isAuthenticated,
    useAuth,
    fetchWithAuth,
    refreshToken,
}

export default authService