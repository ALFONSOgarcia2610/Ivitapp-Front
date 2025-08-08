// pages/Dashboard.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/comunes/navar";
import Header  from "@/comunes/header-principal";
import { ActiveThemeProvider } from "@/providers/active-theme.provider";
import { Outlet } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { usuarioStore } from "@/Store/authstore";

export default function DashboardLayout() {
  const { autenticado } = useStore(usuarioStore);

  return (
    <ActiveThemeProvider initialColor="blue" initialMode="light">
      <SidebarProvider>
        {autenticado ? <Navbar /> : <Header />}
        <Outlet />
      </SidebarProvider>
    </ActiveThemeProvider>
  );
}
