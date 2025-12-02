import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/services/authService';

const API_URL = import.meta.env.VITE_API_URL;

export function useMonthlyBalance() {
    return useQuery({
        queryKey: ['balances'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/balance/monthly`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching balances');
                return await res.json();
        }
    });
}

export function useTotalBalance() {
    return useQuery({
        queryKey: ['balances'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/balance/total`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching balances');
                return await res.json();
        }
    });
}

export function useBalanceChartData() {
    return useQuery({
        queryKey: ['balance-chart'],
        queryFn: async () => {
            const token = getToken();
            const res = await fetch(`${API_URL}/balance/chart`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error('Error fetching balance chart data');
                return await res.json();
        }
    });
}