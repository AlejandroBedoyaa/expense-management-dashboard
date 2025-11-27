import { getToken } from "@/services/authService"

const API_URL = import.meta.env.VITE_API_URL

export async function deleteExpenseById(expenseId: string) {
    const token = getToken()
    const res = await fetch(`${API_URL}/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Error deleting expense')
    return await res.json()
}
