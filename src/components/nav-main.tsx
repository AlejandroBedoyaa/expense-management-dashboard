import { IconDashboardFilled, IconCoinOff, IconPremiumRights } from "@tabler/icons-react"
import { useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')
  
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Dashboard"
              className={isActive('/dashboard') ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear" : ""}
            >
              <a href="/dashboard">
                <IconDashboardFilled />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="expenses">
            <SidebarMenuButton 
              asChild 
              tooltip="Expenses"
              className={isActive('/expenses') ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear" : ""}>
              <a href="/expenses">
                <IconCoinOff />
                <span>Expenses</span>
              </a> 
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="incomes">
            <SidebarMenuButton 
              asChild
              tooltip="Incomes"
              className={isActive('/incomes') ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear" : ""}>
              <a href="/incomes">
                <IconPremiumRights />
                <span>Incomes</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
