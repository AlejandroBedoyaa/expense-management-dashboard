import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/services/authService';

const API_URL = import.meta.env.VITE_API_URL;

export function useExpenses() {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/expenses`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching expenses');
                return await res.json();
        }
    });
}

export function useMonthlyExpenses() {
    return useQuery({
        queryKey: ['monthly-expenses'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/expenses/monthly`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching monthly expenses');
                return await res.json();
        }
    });
}

export function useExpenseById(expenseId: string) {
    return useQuery({
        queryKey: ['expense', expenseId],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/expenses/${expenseId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching expense by ID');
                return await res.json();
        }
    });
}