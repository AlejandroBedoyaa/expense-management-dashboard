import { getToken } from "@/services/authService"

const API_URL = import.meta.env.VITE_API_URL

export async function deleteIncomeById(incomeId: string) {
    const token = getToken()
    const res = await fetch(`${API_URL}/incomes/${incomeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Error deleting income')
    return await res.json()
}