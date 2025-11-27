import { Outlet } from "react-router-dom";
import { SiteHeaderAuth } from "@/components/site-header-auth";

export default function AuthLayout() {
    return (
        <div>
            <SiteHeaderAuth />
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}