"use client"
import {
  LogOut,
  RotateCcwKey,
  TextSearch,
  CloudSun,
  Landmark,
  CircleChevronRight,
  CircleChevronLeft,
  UserRoundPen,
  MapPinned,
  Menu,
  X,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { cerrarSesion } from "../sesiones/sesion";
import { usuarioStore } from "../Store/authstore";
import { useStore } from "@tanstack/react-store";
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
  { title: "Pokedex", to: "/pokemon", icon: TextSearch },
  { title: "Clima", to: "/clima", icon: CloudSun },
  { title: "Skeleton", to: "/skeleton", icon: CloudSun },
  { title: "Cambiar Contraseña", to: "/ChangePassword", icon: RotateCcwKey },
  { title: "Editar Usuario", to: "/EditUser", icon: UserRoundPen },
];

export default function Navbar() {
  const router = useRouter();
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  const canton = useStore(usuarioStore, (state) => state.canton);
  const usuario = useStore(usuarioStore, (state) => state.usuario);

  const [colapsado, setColapsado] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleClick = async (item: any, e: React.MouseEvent) => {
    if (item.isLogout) {
      e.preventDefault();
      await cerrarSesion();
      router.navigate({ to: item.to });
    }
  };

  return (
    <>
      {/* Botón toggle solo en móviles */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-muted rounded-full shadow-md"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? <X /> : <Menu />}
      </button>

      {/* Sidebar en móviles */}
      {sidebarVisible && (
        <Sidebar
          className={`fixed top-0 left-0 z-40 h-screen bg-background shadow-md transition-all duration-300 ${colapsado ? "w-16" : "w-64"
            }`}
        >
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
                  <span className="text-lg">
                    <Landmark className="w-6 h-6 text-primary" />
                  </span>
                )}
              </div>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2 text-sm">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {!colapsado && usuario?.toUpperCase()}
                </SidebarGroupLabel>

                <SidebarGroupLabel className="flex items-center gap-2 text-sm">
                  <MapPinned className="w-5 h-5" />
                  {!colapsado && canton?.toUpperCase()}
                </SidebarGroupLabel>

                {!colapsado && <hr className="my-2 border-gray-300" />}

                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => {
                      const isActive = currentPath === item.to;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={isActive ? "bg-primary text-white" : "hover:bg-muted"}
                          >
                            <Link to={item.to}>
                              <item.icon className="w-5 h-5 mr-2" />
                              {!colapsado && <span>{item.title}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
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
                      onClick={(e) => handleClick({ isLogout: true, to: "/login" }, e)}
                    >
                      <LogOut className="w-5 h-5 mr-2 text-red-500" />
                      {!colapsado && <span className="text-red-500">Cerrar sesión</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>
      )}

      {/* Sidebar en pantallas grandes */}
      <Sidebar
        className={`hidden lg:flex fixed top-0 left-0 h-screen bg-background shadow-md transition-all duration-300 ${colapsado ? "w-16" : "w-64"
          }`}
      >
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
                <span className="text-lg">
                  <Landmark className="w-6 h-6 text-primary" />
                </span>
              )}
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 text-sm">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {!colapsado && usuario?.toUpperCase()}
              </SidebarGroupLabel>

              <SidebarGroupLabel className="flex items-center gap-2 text-sm">
                <MapPinned className="w-5 h-5" />
                {!colapsado && canton?.toUpperCase()}
              </SidebarGroupLabel>

              {!colapsado && <hr className="my-2 border-gray-300" />}

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = currentPath === item.to;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={isActive ? "bg-primary text-white" : "hover:bg-muted"}
                        >
                          <Link to={item.to}>
                            <item.icon className="w-5 h-5 mr-2" />
                            {!colapsado && <span>{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
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
                    onClick={(e) => handleClick({ isLogout: true, to: "/login" }, e)}
                  >
                    <LogOut className="w-5 h-5 mr-2 text-red-500" />
                    {!colapsado && <span className="text-red-500">Cerrar sesión</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>

      {/* ThemeSelector */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector />
      </div>
    </>
  );
}
