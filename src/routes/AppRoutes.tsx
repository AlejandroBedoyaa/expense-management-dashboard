import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "@/components/auth/RequireAuth"
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ExpensePage from "@/pages/expenses/ExpensePage";
import IncomePage from "@/pages/incomes/IncomePage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";

function AppRoutes() {
    return (
        <Router>
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/link-account" element={<SignupPage />} />
                {/* Ruta catch-all */}
                <Route path="*" element={<LoginPage />} />
            </Route>
            
            <Route element={<RequireAuth />} >
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/expenses" element={<ExpensePage />} />
                    <Route path="/incomes" element={<IncomePage />} />
                </Route>
            </Route>

        </Routes>
        </Router>
    );
}

export default AppRoutes;
