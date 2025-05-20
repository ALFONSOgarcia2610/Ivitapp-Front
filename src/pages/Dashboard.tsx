
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/comunes/navar"
import { ActiveThemeProvider } from "@/providers/active-theme.provider"
import { Outlet } from "@tanstack/react-router"


export default function Das() {

  return (
    <ActiveThemeProvider initialColor="blue" initialMode="light">
      <SidebarProvider>
        <Navbar />


        <Outlet />

      </SidebarProvider>
    </ActiveThemeProvider>
  )
}
