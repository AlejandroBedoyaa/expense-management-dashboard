import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("access_token")

export function useIncomes() {
    return useQuery({
        queryKey: ['incomes'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/incomes`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching incomes');
                return await res.json();
        }
    });
}
