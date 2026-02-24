
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Outlet, NavLink } from "react-router-dom"

export default function Dashboard() {
  const email = localStorage.getItem("email")

  function logout() {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">

        {/* Sidebar */}
        <Sidebar className="border-r bg-muted/30">

          {/* Header */}
          <SidebarHeader>
            <Button variant="outline" className="w-full truncate">
              {email}
            </Button>
          </SidebarHeader>

          <Separator />

          {/* Navigation */}
          <SidebarContent className="px-2 py-4">
            <p className="text-sm font-semibold pl-1 ">Resources</p>
            <SidebarMenu>
              <SidebarMenuItem>

                <NavLink to="/question-bank">
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      className="rounded-lg w-full cursor-pointer"
                    >
                      Question Bank
                    </SidebarMenuButton>
                  )}
                </NavLink>

                

              </SidebarMenuItem>

              
            </SidebarMenu>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive cursor-pointer"
              onClick={logout}
            >
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          <div className="min-h-screen bg-background">
            <Outlet />
          </div>
        </SidebarInset>

      </div>
    </SidebarProvider>
  )
}