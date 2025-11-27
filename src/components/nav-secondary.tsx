"use client"

import * as React from "react"
import { IconUserCircle } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LogoutButton } from "@/components/auth/LogoutButton"
// import { LogoutService } from "@services/AuthService";

export function NavSecondary({
  ...props
}: {
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key="account-settings">
            <SidebarMenuButton asChild>
              <a href="#" onClick={() => {} /* AccountSettings */}>
                <IconUserCircle />
                <span>Account settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="logout">
            <SidebarMenuButton asChild>
              <LogoutButton className="bg-red-500 text-white dark:bg-red-500 dark:text-white hover:bg-red-600 hover:text-white active:bg-red-700 min-w-8 duration-200 ease-linear" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
