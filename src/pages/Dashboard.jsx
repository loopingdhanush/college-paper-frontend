
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

export default function Dashboard({admin}) {
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
          <SidebarHeader className="p-4">
            <div className="flex flex- items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                T
              </div>

              <div>
                <h1 className="text-lg font-semibold leading-none">
                  Teched
                </h1>
                {admin ? (<p className="text-xs text-muted-foreground">
                  Admin Panel
                </p>) : (<p className="text-xs text-muted-foreground">
                  Students Panel
                </p>)}
              </div>
            </div>
          </SidebarHeader>

          <Separator />

          {/* Navigation */}
          <SidebarContent className="px-2 py-4">
            
            <SidebarMenu>
              <SidebarMenuItem>
                <p className="text-sm font-semibold pl-1 mb-2">Resources</p>
                <NavLink to="/question-bank">
                  {({ isActive }) => (
                    <SidebarMenuButton  isActive={isActive}
                      className="rounded-lg w-full cursor-pointer mb-2">
                      Question Bank
                    </SidebarMenuButton>
                  )}
                </NavLink>

                {admin &&(   
                <p className="text-sm font-semibold pl-1 mb-2">Administration</p>)}

                {admin &&(   
                <NavLink to="/pending">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}
                      className="rounded-lg w-full cursor-pointer">
                      Pending Papers
                    </SidebarMenuButton>
                  )}
                </NavLink>)}

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

            <Button variant="outline" className="w-full truncate">
              {email}
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