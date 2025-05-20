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
    setProgress(80)
    requestAnimationFrame(() => {
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
      }, 300)
    })
  }, [])

  return (
    <ActiveThemeProvider initialColor="blue" initialMode="light">
      <SidebarProvider>
        <Navbar />
        {visible && (
          <div className="fixed top-0 left-0 w-full z-50 h-1 transition-opacity duration-500 ease-in-out">
            <Progress value={progress} className="h-1" />
          </div>
        )}

        <Outlet />

      </SidebarProvider>
    </ActiveThemeProvider>
  )
}
