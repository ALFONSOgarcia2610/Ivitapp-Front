import {
  User,
  LogOut,
  RotateCcwKey,
  TextSearch,
  CloudSun,
  Landmark,
  Home,
  CircleChevronRight,
  CircleChevronLeft,
} from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { cerrarSesion } from "../sesiones/sesion";
import { usuarioStore } from "../Store/authstore";
import { useStore } from '@tanstack/react-store'
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
import { useState } from "react";

const items = [
  {
    title: "Pokedex",
    to: "/pokemon",
    icon: TextSearch,
  },
  {
    title: "Clima",
    to: "/clima",
    icon: CloudSun,
  },
  {
    title: "Cambiar Contraseña",
    to: "/ChangePassword",
    icon: RotateCcwKey,
  },
  {
    title: "Editar Usuario",
    to: "/EditUser",
    icon: RotateCcwKey,
  },
];

export default function Navbar() {
  const router = useRouter();
  const [colapsado, setColapsado] = useState(true);
  const provincia = useStore(usuarioStore, (state) => state.provincia);

  const handleClick = async (item: any, e: React.MouseEvent) => {
    if (item.isLogout) {
      e.preventDefault();
      await cerrarSesion();
      router.navigate({ to: item.to });
    }
  };

  usuarioStore.subscribe

  return (
    <Sidebar className={`h-screen transition-all duration-300 ${colapsado ? "w-15" : "w-64"}`}>
      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setColapsado(!colapsado)}>
              {colapsado ? (
                <CircleChevronRight className="w-6 h-6 text-primary" />
              ) : (
                <CircleChevronLeft className="w-6 h-6 text-primary" />
              )}
            </button>
            {!colapsado && (
              <span className="text-lg"> <Home className="w-6 h-6 text-primary" /></span>
            )}
          </div>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-lg font-semibold">
              <Landmark className="w-6 h-6" />
              {!colapsado && "COACMES"}
            </SidebarGroupLabel>

            <SidebarGroupLabel className="flex items-center gap-2 text-sm">
              <User className="w-5 h-5" />
              {!colapsado && `USUARIO: ${usuarioStore.state.usuario?.toUpperCase()}`}

            </SidebarGroupLabel>
            <SidebarGroupLabel className="flex items-center gap-2 text-sm">
              {!colapsado && `PROVINCIA: ${provincia?.toUpperCase()}`}
            </SidebarGroupLabel>

            {!colapsado && <hr className="my-2 border-gray-300" />}

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.to}>
                        <item.icon className="w-5 h-5 mr-2" />
                        {!colapsado && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/login"
                  onClick={(e) =>
                    handleClick({ isLogout: true, to: "/login" }, e)
                  }
                >
                  <LogOut className="w-5 h-5 mr-2 text-red-500" />
                  {!colapsado && (
                    <span className="text-red-500">Cerrar sesión</span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector />
      </div>
    </Sidebar>
  );
}
