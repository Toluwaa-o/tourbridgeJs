import {
    Home,
    Layers,
    BarChart3,
    Code,
    Cog,
    LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from './nav-item'

export const Aside = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-gray-200 p-6 hidden md:flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight mb-10">Tours</h1>

            <nav className="flex-1 space-y-1 text-sm">
                <NavItem icon={Home} label="Dashboard" active={pathname === "/dashboard"} page_link="/dashboard" />
                <NavItem icon={Layers} label="Tours" active={pathname.startsWith("/dashboard/tours")} page_link="/dashboard/tours" />
                <NavItem icon={BarChart3} label="Analytics" active={pathname.startsWith("/dashboard/analytics")} page_link="/dashboard/analytics" />
                <NavItem icon={Code} label="Integrations" active={pathname.startsWith("/documentation")} page_link="/documentation" />
            </nav>

            <div className="pt-6 mt-auto space-y-1 border-t border-gray-200 text-sm">
                <NavItem icon={Cog} label="Settings" page_link="/settings" />
                <NavItem icon={LogOut} label="Logout" page_link="/logout" />
            </div>
        </aside>
    )
}
