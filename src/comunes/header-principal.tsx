"use client";

import logo from "@/img/logo2.png";
import { Link } from "@tanstack/react-router";
import { Handshake, LogIn, Menu, UserRoundPlus } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-transparent shadow-none">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-30 h-auto" />
        </div>

        {/* Navegación en pantallas grandes */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/login"
            className="flex flex-col items-center text-zinc-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <LogIn className="w-5 h-5 text-primary" strokeWidth={3} />
            <span className="text-xs mt-1">Iniciar sesión</span>
          </Link>

          <Link
            to="/register"
            className="flex flex-col items-center text-zinc-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <UserRoundPlus className="w-5 h-5 text-primary" strokeWidth={3} />
            <span className="text-xs mt-1">Registrarse</span>
          </Link>

          <Link
            to="/nosotros"
            className="flex flex-col items-center text-zinc-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <Handshake className="w-5 h-5 text-primary" strokeWidth={3} />
            <span className="text-xs mt-1">Nosotros</span>
          </Link>
        </div>

        {/* Drawer en pantallas pequeñas */}
        <div className="lg:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-zinc-800 dark:text-zinc-100" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 space-y-4">
                <DrawerHeader>
                  <DrawerTitle className="text-center text-lg">Menú</DrawerTitle>
                </DrawerHeader>
                <nav className="flex flex-col gap-4 text-center">
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-zinc-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    <LogIn className="w-5 h-5" />
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 text-zinc-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    <UserRoundPlus className="w-5 h-5" />
                    Registrarse
                  </Link>
                  <Link
                    to="/nosotros"
                    className="flex items-center justify-center gap-2 text-zinc-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    <Handshake className="w-5 h-5" />
                    Nosotros
                  </Link>
                </nav>
                <div className="text-center mt-4">
                  <DrawerClose asChild>
                    <Button variant="outline">Cerrar</Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
