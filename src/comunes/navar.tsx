"use client";

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
  LayoutDashboard,
  Table,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

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

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { cerrarSesion } from "../sesiones/sesion";
import { usuarioStore } from "../Store/authstore";
import { useStore } from "@tanstack/react-store";
import { ThemeSelector } from "@/pages/components/selector-theme";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Home", to: "/home", icon: LayoutDashboard },
  { title: "Pokedex", to: "/pokemon", icon: TextSearch },
  { title: "Clima", to: "/clima", icon: CloudSun },
  { title: "Cambiar Contraseña", to: "/ChangePassword", icon: RotateCcwKey },
  { title: "Editar Usuario", to: "/EditUser", icon: UserRoundPen },
  { title: "Table", to: "/table", icon: Table },
];

export default function Navbar() {
  const router = useRouter();
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  const canton = useStore(usuarioStore, (state) => state.canton);
  const usuario = useStore(usuarioStore, (state) => state.usuario);

  const [colapsado, setColapsado] = useState(true);

  const handleClick = async (item: any, e: React.MouseEvent) => {
    if (item.isLogout) {
      e.preventDefault();
      await cerrarSesion();
      router.navigate({ to: item.to });
    }
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Landmark className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent className="h-full flex flex-col justify-between">
              <div>
                <SidebarGroup>
                  <SidebarGroupLabel className="flex items-center gap-2 text-sm px-4 pt-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {usuario?.toUpperCase()}
                  </SidebarGroupLabel>

                  <SidebarGroupLabel className="flex items-center gap-2 text-sm px-4">
                    <MapPinned className="w-5 h-5" />
                    {canton?.toUpperCase()}
                  </SidebarGroupLabel>

                  <hr className="my-2 mx-4 border-gray-300" />

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
                                <span>{item.title}</span>
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
                        <span className="text-red-500">Cerrar sesión</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarContent>
          </SheetContent>
        </Sheet>
      </div>
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
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector />
      </div>
    </>
  );
}
