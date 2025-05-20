import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/comunes/navar"
import { ActiveThemeProvider } from "@/providers/active-theme.provider"
import { Outlet } from "@tanstack/react-router"
import { Progress } from "@/components/ui/progress"

export default function Das() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Simula carga parcial rápida (por ejemplo 80%)
    setProgress(80)

    // Esperamos al próximo frame después de renderizado
    requestAnimationFrame(() => {
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
      }, 300) // Espera un poco antes de ocultar
    })
  }, [])

  return (
    <ActiveThemeProvider initialColor="blue" initialMode="light">
      <SidebarProvider>
        <Navbar />

        {/* Barra de progreso delgada y discreta */}
        {visible && (
          <div className="fixed top-0 left-0 w-full z-50 h-1 transition-opacity duration-500 ease-in-out">
            <Progress value={progress} className="h-1" />
          </div>
        )}

        <div className="min-h-screen flex items-center justify-center text-white p-4">
          <Outlet />
        </div>
      </SidebarProvider>
    </ActiveThemeProvider>
  )
}
