import {
  MapPin,
  Phone,
  Copyright,
  Mail,
  Facebook,
  Instagram,
  Music2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-zinc-900 dark:to-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-300 dark:border-zinc-700">
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Columna izquierda: Derechos y redes sociales */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Copyright className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span>2025 Todos los derechos reservados, Garcia System</span>
          </div>

          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <div className="group relative inline-block">
              <button className="focus:outline-none">
                <Facebook className="bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
              </button>
              <span
                className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100"
              >Facebook</span>
            </div>

            <div className="group relative inline-block">
              <button className="focus:outline-none">
                <Instagram className="bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
              </button>
              <span
                className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100"
              >Instagram</span>
            </div>

            <div className="group relative inline-block">
              <button className="focus:outline-none">
                <Music2 className="bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
              </button>
              <span
                className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100"
              >TikTok</span>
            </div>
          </div>
        </div>

        {/* Columna derecha: Información de contacto dividida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center md:text-right">
          {/* Columna 1 */}
          <div className="space-y-2">

            <div className="flex items-center justify-center md:justify-end gap-2">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>Rocafuerte, Ecuador</span>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-end gap-2">
              <Phone className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>+593 989 619 225</span>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-2">
              <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>garciasystem@hotmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
