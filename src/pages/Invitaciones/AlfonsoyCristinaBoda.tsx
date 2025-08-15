"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useInvitacion } from "@/sesiones/sesion";
import { useParams } from "@tanstack/react-router";
import ImgDefault from "@/img/Pedida1.jpeg";
import ImgDefault2 from "@/img/Pedida2.jpeg";
import ImgDefault3 from "@/img/Pedida3.jpeg";
import ImgDefault4 from "@/img/Pedida4.jpeg";
import ImgDefault5 from "@/img/Pedida5.jpeg";
import ImgDefault6 from "@/img/Pedida6.jpeg";
import ImgDefault7 from "@/img/Pedida7.jpeg";
import ImgDefault8 from "@/img/Pedida8.jpeg";
import ImgDefault9 from "@/img/Pedida9.jpeg";
import ImgDefault10 from "@/img/Pedida99.jpeg";
import Entrada from "@/img/entrada.png";
import Vestimenta from "@/img/vestimenta.png";
import Primera from "@/img/Primera.jpeg";
import Encuentro from "@/img/encuentro.jpeg";
import Sobre from "@/img/sobre.png";
import Musica from "@/music/Fonseca - Que Suerte Tenerte (Audio).mp3";
import { MapPin, Pause, Play } from "lucide-react";
import { Countdown } from "../components/contador";
import { motion } from "framer-motion";
import Footer from "@/comunes/footer";
import Skeleton from "../components/skeleton";
import ScrollDownIndicator from "../ScrollDownIndicator";
import { GiLinkedRings } from "react-icons/gi";
import confetti from "canvas-confetti";
import ConfirmarAsistencia from "../components/confirmarAsistencia";
import { TypingText } from "@/components/animate-ui/text/typing";
import { WritingText } from "@/components/animate-ui/text/writing";


const slides = [
  {
    id: 1,
    image: ImgDefault,
    title: "Alfonso & Cristina",
    subtitle: "Abrazando la Eternidad",
  },
  {
    id: 2,
    image: ImgDefault2,
    title: "Alfonso & Cristina",
    subtitle: "Un Amor Infinito",
  },
  {
    id: 3,
    image: ImgDefault3,
    title: "Alfonso & Cristina",
    subtitle: "Para Siempre Comienza Hoy",
  },
];

export default function InvitacionCompleta() {
  const { invitacionId } = useParams({ from: "/invitacion/$invitacionId" });
  const { data, error, isLoading } = useInvitacion(invitacionId);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = document.getElementById("myAudio") as HTMLAudioElement | null;
    if (!audio) return;

    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [mostrarConfetti, setMostrarConfetti] = useState(false);
  useEffect(() => {
    if (mostrarConfetti) {
      confetti({
        particleCount: 500,
        spread: 120,
        origin: { y: 0.6 },
      });
      // Opcional: desactiva confetti para evitar repetición si quieres
      setMostrarConfetti(false);
    }
  }, [mostrarConfetti]);
  if (!mostrarContenido) {
    return (
      <div className="w-full h-screen !bg-[#b39574] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat flex flex-col items-center justify-center text-center px-4">
        <img
          src={Entrada}
          alt="Portada"
          className="max-w-md w-full h-auto rounded-xl mb-6"
        />
        <div className="relative inline-block group">
          <Button
            onClick={() => {
              setMostrarContenido(true);
              setMostrarConfetti(true);
            }}
            className="relative cursor-pointer z-10 bg-white text-green-800 font-serif text-lg px-10 py-4 rounded-md border border-green-500 shadow-md hover:bg-green-50 transition-all duration-300 ease-in-out tracking-wide overflow-hidden"
          >
            <TypingText
              className="text-2xl"
              text="Ver Invitación"
              cursor
              cursorClassName="h-5"
            />
          </Button>

          {/* Adorno tipo hoja arriba */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-green-500 rounded-b-full group-hover:bg-green-700 transition duration-300" />
          {/* Adorno tipo hoja abajo */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-green-500 rounded-t-full group-hover:bg-green-700 transition duration-300" />
        </div>

      </div>

    );
  }
  if (isLoading) return <div className="text-center py-10"><Skeleton /></div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {(error as Error).message}</div>;
  return (
    <div className="w-full">
      {/* Carrusel con imagenes locales */}
      <div className="relative w-full h-screen overflow-hidden" id="home">
        <audio id="myAudio" src={Musica} autoPlay loop />

        <img
          src={slides[0].image}
          alt="Portada"
          className="w-full h-full object-cover md:object-top"
        />

        {/* Fondo opaco solo detrás del texto */}
        <div className="absolute top-10 w-full flex justify-center px-4 mt-10">
          <div className="py-4 px-6 text-white text-center max-w-xl w-full">
            <p className="uppercase tracking-widest text-[10px] sm:text-xs md:text-base mb-1">
              Nos casamos
            </p>
            <h1 className="text-[25px] sm:text-3xl md:text-6xl font-serif font-bold mb-1">
              
              ALFONSO <span className="font-light">&</span> CRISTINA
            </h1>
           <p className="uppercase tracking-wide text-[10px] sm:text-xs md:text-base">
              <WritingText
                text="04 de Octubre del 2025"
                spacing={9}
              />
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 border border-white bg-black/60 text-white hover:bg-black/80"
        >
          {playing ? <Pause /> : <Play />}
        </Button>
      </div>


      <motion.section className="max-w-xl mx-auto bg-[#f9f6f1] rounded-3xl p-10 my-12 shadow-lg border border-[#b29d7f] font-serif text-center text-gray-700"
       initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="mb-12 text-base leading-relaxed italic text-[#7a6b4f] max-w-md mx-auto">
          Nos sentimos dichosos de comenzar esta nueva etapa en nuestras vidas y queremos invitarlos a compartir la alegría de unirnos en matrimonio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-16">
          {/* Padres de la novia */}
          <div>
            <h3 className="mb-3 font-bold text-xl text-[#8a7962] tracking-wide uppercase">Padres de la Novia</h3>
            <p className="leading-relaxed text-lg">
              Garcia Caicedo Vicente<br />
              Espinel Bazantes Sandra
            </p>
          </div>

          {/* Padres del novio */}
          <div>
            <h3 className="mb-3 font-bold text-xl text-[#8a7962] tracking-wide uppercase">Padres del Novio</h3>
            <p className="leading-relaxed text-lg">
              Garcia Celorio Carlos<br />
              Alcivar Anchundia Lourdes
            </p>
          </div>

          {/* Padrinos */}
          <div>
            <h3 className="mb-3 font-bold text-xl text-[#8a7962] tracking-wide uppercase">Padrinos</h3>
            <p className="leading-relaxed text-lg">
              Guerrero Garcia Ricardo<br />
              Garcia Espinel Carolina
            </p>
          </div>

          {/* Testigos */}
          <div>
            <h3 className="mb-3 font-bold text-xl text-[#8a7962] tracking-wide uppercase">Testigos</h3>
            <p className="leading-relaxed text-lg">
              Garcia Mendoza Joel<br />
              Garcia Espinel Samari
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-4" initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}>
        {/* Imagen grande arriba */}
        <div className="w-full flex justify-center">
          <img
            src={ImgDefault2}
            alt="Portada"
            className="w-full max-w-2xl h-auto rounded-xl object-cover"
          />
        </div>

        {/* Dos imágenes verticales simétricas debajo */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          <img
            src={ImgDefault4}
            alt="Foto pareja 1"
            className="aspect-[2/3] w-full rounded-xl object-cover"
          />
          <img
            src={ImgDefault3}
            alt="Foto pareja 2"
            className="aspect-[2/3] w-full rounded-xl object-cover"
          />
        </div>
      </motion.section>



      {/* Datos del invitado */}

      <motion.div
        className=" bg-[#b39574] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat flex items-center justify-center m-0 p-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <div className="text-center max-w-2xl mt-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700tracking-wide " style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, lineHeight: 1.2 }}>
            ¡Una celebración de amor!
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
            Con gran alegría te invitamos a compartir este momento especial con nosotros.
          </p>

          <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
            Estimado/a:
          </p>
          <p className="text-4xl md:text-5xl font-extrabold text-gray-700 tracking-wide font-serif mb-6" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, lineHeight: 1.2 }}>

            {data.invitado.nombre} {data.invitado.apellido}
          </p>

          <p className="text-lg md:text-xl text-gray-700">
            Tu presencia es un regalo invaluable. Esperamos compartir juntos un día lleno de emociones, alegría y mucho amor.
          </p>
        </div>
      </motion.div>
      {/*
<motion.section
  className="w-full bg-white py-16 px-6 md:px-10 lg:px-20"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <div className="max-w-4xl mx-auto space-y-12 text-center">
    <div className="max-w-4xl mx-auto space-y-12 text-center">
      <div className="space-y-4">
        <motion.h2
          className="flex items-center justify-center gap-4 text-4xl md:text-5xl font-bold text-pink-600 tracking-wide"
          style={{ fontFamily: '"Delius", cursive' }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <AnimatedText text="¡Llegó el gran día!" color="text-teal-700" />
          <motion.img
            src={Anillos}
            alt="Anillos"
            className="h-25 w-25 md:h-30 md:w-30"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.h2>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          La magia de nuestro amor nos guía hacia este momento único. Nos encantaría que tú seas parte de este capítulo tan especial de nuestras vidas.
        </p>
      </div>
    </div>

    <motion.div
      className="grid md:grid-cols-2 gap-8 text-left text-gray-800 text-base md:text-lg font-medium"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="bg-purple-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        <p className="text-purple-600 text-xl font-semibold mb-2">📅 Fecha</p>
        <p className="italic">{new Date(data.fechaEvento).toLocaleDateString()}</p>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        <p className="text-rose-600 text-xl font-semibold mb-2">🕒 Hora</p>
        <p className="italic">{data.horaEvento || "Por confirmar"}</p>
      </div>
    </motion.div>
  </div>
</motion.section>
*/}
      <motion.section className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-4" initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}>
        {/* Imagen grande arriba */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          <img
            src={ImgDefault6}
            alt="Foto pareja 1"
            className="aspect-[2/3] w-full rounded-xl object-cover"
          />
          <img
            src={ImgDefault7}
            alt="Foto pareja 2"
            className="aspect-[2/3] w-full rounded-xl object-cover"
          />
        </div>
        <div className="w-full flex justify-center">
          <img
            src={ImgDefault5}
            alt="Portada"
            className="w-full max-w-2xl h-auto rounded-xl object-cover"
          />
        </div>

        {/* Dos imágenes verticales simétricas debajo */}

      </motion.section>
      {/*<section className="w-full bg-rose-50 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="text-center space-y-4 mb-16">
              <h2
                className="flex items-center justify-center gap-4 text-4xl md:text-5xl font-bold text-pink-600 tracking-wide"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, lineHeight: 1.2 }}
              >
                <motion.img
                  src={Pareja}
                  alt="Pareja"
                  className="h-25 w-25 md:h-30 md:w-30"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
                Nuestra Historia
              </h2>
            </div>

            <AnimatedWriting text="Cada momento juntos ha sido parte de una hermosa historia de amor que aún continúa escribiéndose..." speed={80} />
          </div>

          <div className="relative">
           
            <div className="absolute left-1/2 top-0 h-full w-1 bg-pink-300 transform -translate-x-1/2 z-0"></div>

            <div className="relative">
          
              <div className="absolute left-1/2 top-0 h-full w-1 bg-pink-300 transform -translate-x-1/2 z-0"></div>

              <div className="flex flex-col gap-16 relative z-10">
                
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 sm:justify-start"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full sm:w-1/2 sm:text-right">
                    <img
                      src={Encuentro}
                      alt="Primer Encuentro"
                      className="w-full max-w-xs sm:ml-auto rounded-xl shadow-md"
                    />
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-1/2">
                    <p className="text-sm text-pink-500 font-semibold">15 de abril de 2021</p>
                    <h3 className="text-xl font-bold text-gray-800">Nuestro Primer Encuentro</h3>
                    <p className="text-gray-700 mt-2">Una mirada bastó para que nuestras almas se reconocieran.</p>
                  </div>
                </motion.div>

             
                <motion.div
                  className="flex flex-col sm:flex-row-reverse items-center gap-6 sm:gap-10 sm:justify-start"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full sm:w-1/2 sm:text-left">
                    <img
                      src={Primera}
                      alt="Primera Cita"
                      className="w-full max-w-xs sm:mr-auto rounded-xl shadow-md"
                    />
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-1/2">
                    <p className="text-sm text-pink-500 font-semibold">2 de mayo de 2021</p>
                    <h3 className="text-xl font-bold text-gray-800">Nuestra Primera Cita</h3>
                    <p className="text-gray-700 mt-2">Risas, nervios y una conexión que creció con cada palabra.</p>
                  </div>
                </motion.div>

           
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 sm:justify-start"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full sm:w-1/2 sm:text-right">
                    <img
                      src={Viaje}
                      alt="Primer Viaje"
                      className="w-full max-w-xs sm:ml-auto rounded-xl shadow-md"
                    />
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-1/2">
                    <p className="text-sm text-pink-500 font-semibold">10 de diciembre de 2021</p>
                    <h3 className="text-xl font-bold text-gray-800">Nuestro Primer Viaje</h3>
                    <p className="text-gray-700 mt-2">Exploramos nuevos lugares y creamos recuerdos inolvidables.</p>
                  </div>
                </motion.div>

             
                <motion.div
                  className="flex flex-col sm:flex-row-reverse items-center gap-6 sm:gap-10 sm:justify-start"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full sm:w-1/2 sm:text-left">
                    <img
                      src={ImgDefault}
                      alt="Compromiso"
                      className="w-full max-w-xs sm:mr-auto rounded-xl shadow-md"
                    />
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-1/2">
                    <p className="text-sm text-pink-500 font-semibold">14 de febrero de 2024</p>
                    <h3 className="text-xl font-bold text-gray-800">¡Nos comprometimos!</h3>
                    <p className="text-gray-700 mt-2">Con lágrimas y sonrisas, dijimos “sí” a este nuevo comienzo.</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section> */}



      <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-xl mx-auto text-center space-y-20 relative">

          {/* Código de Vestimenta */}
          <div>
            <h2 className="mb-6 font-bold text-2xl text-gray-800 tracking-wide uppercase font-serif">
              Código de Vestimenta
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-8 font-serif">
              Elegante y cómodo.
            </p>

            {/* Imagen para código de vestimenta */}
            <img
              src={Vestimenta}
              alt="Código de vestimenta"
              className="mx-auto mb-8 w-48 rounded-lg shadow-md object-cover"
            />

       
          </div>
          
          <div className="mt-10 text-center space-y-4">
            <img
              src={Sobre}
              alt="Sobre cerrado"
              className="mx-auto w-20 h-auto mt-2 opacity-90"
            />
            <h3 className="mb-3 font-bold text-xl text-gray-800 tracking-wide uppercase font-serif">
              El mejor regalo es tu presencia
            </h3>
            <p className="leading-relaxed text-lg text-gray-700 max-w-md mx-auto font-serif">
              Pero si deseas obsequiarnos algo, puedes hacerlo dentro de un sobre.
            </p>
          </div>

          {/* Línea de tiempo Iglesia - Recepción */}
          <div className="relative flex flex-col items-center text-center z-10">

            {/* Iglesia */}
            <div className="mb-20 relative z-20 max-w-xs">
              <img
                src={Primera}
                alt="Iglesia San José"
                className="mx-auto w-28 h-28 rounded-full object-cover shadow-lg border-4 border-gray-200"
              />
              <div className="" />
              <h3 className="mb-3 font-bold text-xl text-gray-800 tracking-wide uppercase font-serif mt-4">
                Ceremonia Religiosa
              </h3>
              <p className="leading-relaxed text-lg font-bold text-gray-700 font-serif">4:00 PM</p>
              <p className="max-w-xs mx-auto mt-2 text-gray-700 leading-relaxed font-serif">
                Iglesia San Ignacio de Loyola
              </p>
              <a
                href="https://www.google.com/maps/place/Iglesia+San+Ignacio+de+Loyola/@-1.0611007,-80.4702227,17z/data=!3m1!4b1!4m6!3m5!1s0x902bf342284debbb:0x229906c662461cf2!8m2!3d-1.0611007!4d-80.4702227!16s%2Fg%2F11svl4bn5h?entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-4 text-base font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200 font-serif underline"
              >
                <MapPin className="w-5 h-5" />
                Ubicación
              </a>
            </div>

            {/* Recepción */}
            <div className="relative z-20 max-w-xs">
              <img
                src={Encuentro}
                alt="Salón El Encanto"
                className="mx-auto w-28 h-28 rounded-full object-cover shadow-lg border-4 border-gray-200"
              />
              <div className="" />
              <h3 className="mb-3 font-bold text-xl text-gray-800 tracking-wide uppercase font-serif mt-4">
                Recepción
              </h3>
              <p className="leading-relaxed text-lg font-bold text-gray-700 font-serif">6:00 PM - Amanecer</p>
              <p className="max-w-xs mx-auto mt-2 text-gray-700 leading-relaxed font-serif">
                La Ramada Del Sabor
              </p>
              <a
                href="https://www.google.com/maps/place/La+Ramada+Del+Sabor/@-1.0588492,-80.4701707,17z/data=!3m1!4b1!4m6!3m5!1s0x902bf2b968199481:0x20032a06c6b2d02c!8m2!3d-1.0588492!4d-80.4701707!16s%2Fg%2F11bxf4hnr1?entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-4 text-base font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200 font-serif underline"
              >
                <MapPin className="w-5 h-5" />
                Ubicación
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  bg-[#b39574] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat">
        <div className="max-w-3xl mx-auto text-center space-y-12">
        
          <motion.div
            className=" bg-[#b39574] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat p-12 space-y-12 text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex justify-center my-6">
              <GiLinkedRings className="text-gray-700 w-12 h-12 animate-pulse" />
            </div>

            {/* Mesa */}
            <div className="flex flex-col items-center gap-4">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide uppercase font-serif"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Mesa
              </motion.h2>
              <p className="text-5xl md:text-6xl font-bold text-gray-700 font-serif">{data.invitado.mesa}</p>
            </div>

            {/* Admisión */}
            <div className="flex flex-col items-center gap-4">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide uppercase font-serif"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Admisión
              </motion.h2>
              <p className="text-5xl md:text-6xl font-bold text-gray-700 font-serif">
                {data.invitado.admision} persona{data.invitado.admision > 1 ? "s" : ""}
              </p>
            </div>
            
            <p className="text-lg leading-relaxed font-bold text-gray-800 max-w-md mx-auto font-serif tracking-wide">
              RESPETUOSAMENTE NO NIÑOS.
            </p>
            <ConfirmarAsistencia invitadoId={data.invitado._id} />
          </motion.div>
        </div>
      </section>


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <motion.section className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-4" initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}>
          {/* Imagen grande arriba */}

          <div className="w-full flex justify-center">
            <img
              src={ImgDefault10}
              alt="Portada"
              className="w-full max-w-2xl h-auto rounded-xl object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <img
              src={ImgDefault8}
              alt="Foto pareja 1"
              className="aspect-[2/3] w-full rounded-xl object-cover"
            />
            <img
              src={ImgDefault9}
              alt="Foto pareja 2"
              className="aspect-[2/3] w-full rounded-xl object-cover"
            />
          </div>

          {/* Dos imágenes verticales simétricas debajo */}

        </motion.section>

      </motion.div>

      {data && (
        <Countdown
          fechaEvento={data.fechaEvento}
          horaEvento={data.horaEvento}
        />

      )}
      <ScrollDownIndicator />
      <Footer />
    </div>
  );
}
