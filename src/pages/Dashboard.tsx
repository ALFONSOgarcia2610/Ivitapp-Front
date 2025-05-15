import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/comunes/navar";
import { ActiveThemeProvider } from "@/providers/active-theme.provider";
import { Outlet } from "@tanstack/react-router";
import { Toaster } from 'sonner';

export default function Das() {
  return (
    <ActiveThemeProvider initialColor="blue" initialMode="light">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <Outlet />
          </main>
        </div>
        <Toaster richColors position="top-center" />
      </SidebarProvider>
    </ActiveThemeProvider>
  );
}
