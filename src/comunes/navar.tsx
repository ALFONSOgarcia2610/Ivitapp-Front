import { User, LogOut } from "lucide-react";
import { Link, useRouter } from '@tanstack/react-router';
import { cerrarSesion } from '../sesiones/sesion';
import { usuarioStore } from '../Store/authstore'
import { ThemeSelector } from "@/pages/components/selector-theme";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Pokedex",
    to: "/pokemon",
    icon: User,
  },
  {
    title: "Clima",
    to: "/clima",
    icon: User,
  },
  {
    title: "Cerrar sesión",
    to: "/login",
    icon: LogOut,
    isLogout: true,
  },
];

export default function Navbar() {
  const router = useRouter();

  const handleClick = async (item: any, e: React.MouseEvent) => {
    if (item.isLogout) {
      e.preventDefault();
      await cerrarSesion();
      router.navigate({ to: item.to });
    }
  };

  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>COACMES</SidebarGroupLabel>
          <SidebarGroupLabel>USUARIO: {usuarioStore.state.usuario?.toUpperCase()}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.to}
                      onClick={(e) => handleClick(item, e)}
                    >
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="fixed top-4 right-4 z-50">
                <ThemeSelector />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
