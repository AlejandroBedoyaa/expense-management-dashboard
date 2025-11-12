import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("access_token")

export function useExpenses() {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/expenses`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching expenses');
                return await res.json();
        }
    });
}
