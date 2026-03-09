import api from "@/lib/api";
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
import UploadDialog from "@/components/Uploaddialog"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Outlet, NavLink } from "react-router-dom"

export default function Dashboard({admin}) {
  const email = localStorage.getItem("email")

  async function logout() {
    try {
      await api.post("/auth/logout");

      window.location.href = "/login";

    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">

        {/* Sidebar */}
        <Sidebar className="border-r bg-muted/30">

          {/* Header */}
          <SidebarHeader className="p-4">
            <div className="flex flex- items-center gap-2">
              

              <div>
                <h1 className="text-lg font-semibold leading-none">
                  TechED
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

                <NavLink to="/questionbank">
                  {({ isActive }) => (
                    <SidebarMenuButton  isActive={isActive}
                      className="rounded-lg w-full cursor-pointer mb-2">
                      <img width="22" height="22" src="https://img.icons8.com/material/48/book--v3.png" alt="book--v3"/>Question Bank
                    </SidebarMenuButton>
                  )}
                </NavLink>

                <NavLink to="/filter">
                  {({ isActive }) => (
                    <SidebarMenuButton  isActive={isActive}
                      className="rounded-lg w-full cursor-pointer mb-2">
                      <img width="22" height="22" src="https://img.icons8.com/material/24/search-property--v1.png" alt="search-property--v1"/>Filter
                    </SidebarMenuButton>
                  )}

                </NavLink>
                

                <UploadDialog/>

                {admin &&(   
                <p className="text-sm font-semibold pl-1 mb-2 mt-2">Administration</p>)}

                {admin &&(   
                <NavLink to="/pending">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}
                      className="rounded-lg w-full cursor-pointer">
                      <img width="22" height="22" src="https://img.icons8.com/material/24/hourglass-sand-top.png" alt="hourglass-sand-top"/>Pending Papers
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