import Footer from "@/comunes/footer";
import Logo from "@/img/logo.png";
import Img2 from "@/img/banner2.png";
import Img3 from "@/img/img2.png";
import {
  Calendar,
  Globe,
  MessageSquareQuote,
  Newspaper,
  QrCode,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reseñas = [
  {
    nombre: "Andrea López",
    comentario:
      "La experiencia fue increíble. La invitación web quedó hermosa y fue súper fácil de enviar por WhatsApp.",
    estrellas: 5,
  },
  {
    nombre: "Carlos Méndez",
    comentario:
      "¡Muy recomendado! Personalización total y excelente soporte. Mis invitados quedaron encantados.",
    estrellas: 4,
  },
  {
    nombre: "Fernanda Ríos",
    comentario:
      "Me encantó el diseño y la rapidez. El código QR facilitó todo para las invitaciones físicas.",
    estrellas: 5,
  },
];

const servicios = [
  {
    icon: Smartphone,
    title: "Mensajería directa a WhatsApp",
    desc: "Envío instantáneo de invitaciones digitales por WhatsApp con confirmación de asistencia.",
    color: "text-blue-500",
  },
  {
    icon: Globe,
    title: "Invitaciones Web Personalizadas",
    desc: "Diseños únicos adaptados al evento, con música, galerías, ubicación y estilo propio.",
    color: "text-green-500",
  },
  {
    icon: Users,
    title: "Gestor de Invitados",
    desc: "Panel para revisar asistentes, confirmar asistencia y gestionar invitados fácilmente.",
    color: "text-rose-500",
  },
  {
    icon: QrCode,
    title: "Generador de QR",
    desc: "Cada invitado recibe un código QR único para acceder a su invitación digital.",
    color: "text-purple-500",
  },
  {
    icon: Newspaper,
    title: "Recepción Inteligente con QR",
    desc: "Cuando tu invitado confirma su asistencia, se genera automáticamente un pase con QR único y descargable.",
    color: "text-purple-500",
  },
  {
    icon: Sparkles,
    title: "Plantillas Creativas",
    desc: "Elige entre diseños modernos, elegantes y adaptables para tu evento.",
    color: "text-yellow-500",
  },
  {
    icon: Settings2,
    title: "Configuración y Soporte",
    desc: "Te ayudamos a configurar tu evento y ofrecemos soporte técnico en todo momento.",
    color: "text-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y Validación",
    desc: "Cada código QR es seguro y válido solo una vez para evitar duplicados.",
    color: "text-teal-500",
  },
  {
    icon: Calendar,
    title: "Recordatorios Automáticos",
    desc: "Envía recordatorios a tus invitados para confirmar asistencia y evitar olvidos.",
    color: "text-orange-500",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-25 px-6 max-w-7xl mx-auto items-center dark:bg-zinc-950">
        <motion.div
          className="space-y-6 text-center lg:text-left px-4 lg:px-0"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold font-serif text-zinc-900 dark:text-white">
            Da el siguiente paso
          </h1>
          <h2 className="text-3xl font-bold text-purple-800 font-serif">
            Convierte tu evento en una experiencia digital inolvidable
          </h2>
          <p className="text-xl font-medium text-muted-foreground">
            Invitaciones personalizadas, elegantes y sin complicaciones.
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0">
            Ahorra tiempo, reduce papel y sorprende a tus invitados desde el primer clic.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center px-4 lg:px-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img src={Logo} alt="Logo" className="w-60 lg:w-100 h-auto" />
        </motion.div>
      </div>

      {/* NOSOTROS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 max-w-7xl mx-auto dark:bg-zinc-900 items-center">
        <motion.div
          className="flex justify-center px-4 lg:px-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={Img2} alt="IvitApp" className="w-60 lg:w-60 h-auto" />
        </motion.div>
        <motion.div
          className="space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0 px-4 lg:px-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold font-serif text-zinc-900 dark:text-white">Somos</h3>
          <h3 className="text-5xl font-bold font-serif text-purple-800">IvitApp</h3>
          <p className="font-semibold text-muted-foreground max-w-md mx-auto lg:mx-0">
            Una plataforma que transforma la forma en que se invita, celebra y conecta. Se actualiza automáticamente cuando un invitado confirma su asistencia.
          </p>
          <p className="text-muted-foreground max-w-md mx-auto lg:mx-0">
            Combinamos diseño, tecnología y atención personalizada para ofrecerte invitaciones digitales que marcan la diferencia.
          </p>
        </motion.div>
      </div>

      {/* DESTACADO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 px-6 max-w-7xl mx-auto items-center dark:bg-zinc-950">
        <motion.div
          className="space-y-4 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold font-serif text-zinc-900 dark:text-white">
            Invitaciones que impresionan
          </h3>
          <h4 className="text-2xl font-bold text-purple-800 font-serif">
            Sin papel. Sin estrés. 100% digital.
          </h4>
          <p className="text-lg text-muted-foreground">
            Crea recuerdos memorables con diseños únicos, accesibles desde cualquier dispositivo.
          </p>
          <p className="text-muted-foreground">
            Tu evento comienza desde la invitación. Consulta nuestros Planes y hazlo especial, hazlo IvitApp.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img src={Img3} alt="Sobre Nosotros" className="w-60 lg:w-96 h-auto" />
        </motion.div>
      </div>

      {/* SERVICIOS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg text-zinc-800 dark:text-white">
                    <Icon className={`w-6 h-6 ${color}`} />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-zinc-900 dark:text-white">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
            Descubre cómo IvitApp ha transformado eventos de forma única y digital.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reseñas.map((resena, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <MessageSquareQuote className="w-6 h-6 text-blue-500 mb-3" />
                <p className="text-zinc-700 dark:text-zinc-300 italic mb-4">
                  “{resena.comentario}”
                </p>
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-zinc-800 dark:text-white">
                    {resena.nombre}
                  </div>
                  <div className="flex gap-1 ml-auto">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < resena.estrellas
                          ? "text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-600"
                          }`}
                        fill={index < resena.estrellas ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTÓN WHATSAPP */}
      <a
        href="https://wa.me/593963177674?text=Hola,%20quiero%20más%20información%20sobre%20invitaciones%20digitales"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="Btn">
          <div className="sign">
            <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
               <path
        d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
      ></path>
            </svg>
          </div>
          <div className="text">Whatsapp</div>
        </div>
      </a>

      <Footer />
    </>
  );
}