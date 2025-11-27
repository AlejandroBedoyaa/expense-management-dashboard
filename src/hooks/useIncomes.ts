import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/services/authService';

const API_URL = import.meta.env.VITE_API_URL;

export function useIncomes() {
    return useQuery({
        queryKey: ['incomes'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/incomes`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching incomes');
                return await res.json();
        }
    });
}


export function useMonthlyIncomes() {
    return useQuery({
        queryKey: ['monthly-incomes'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/incomes/monthly`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching monthly incomes');
                return await res.json();
        }
    });
}