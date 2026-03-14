import api from "@/lib/api";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, BookMarked, Clock, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
import UploadDialog from "@/components/Uploaddialog"

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
      <Sidebar className="border-r">
  
        {/* Header */}
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">TechED</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {admin ? "Admin Panel" : "Student Panel"}
              </p>
            </div>
          </div>
        </SidebarHeader>
  
        <Separator />
  
        {/* Navigation */}
        <SidebarContent className="p-2">
  
          <SidebarMenu>
  
            {/* Resources */}
            <div className="px-2 pt-3 pb-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Resources
              </p>
            </div>
  
            <SidebarMenuItem>
              <NavLink to="/questionbank">
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive} className="rounded-lg w-full cursor-pointer">
                    <BookOpen className="h-4 w-4" />
                    Question Bank
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <NavLink to="/filter">
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive} className="rounded-lg w-full cursor-pointer">
                    <BookMarked className="h-4 w-4" />
                    Courses
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
  
            <SidebarMenuItem>
              <UploadDialog />
            </SidebarMenuItem>
  
            {/* Admin */}
            {admin && (
              <>
                <div className="px-2 pt-4 pb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Administration
                  </p>
                </div>
  
                <SidebarMenuItem>
                  <NavLink to="/pending">
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive} className="rounded-lg w-full cursor-pointer">
                        <Clock className="h-4 w-4" />
                        Pending Papers
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              </>
            )}
  
          </SidebarMenu>
        </SidebarContent>
  
        {/* Footer */}
        <SidebarFooter className="p-3">
          <Separator className="mb-3" />
  
          <div className="rounded-lg border bg-muted/40 px-3 py-2 mb-2">
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
  
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Log out
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