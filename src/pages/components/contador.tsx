import { useEffect, useState } from "react";

interface CountdownProps {
  fechaEvento: string; // fecha en formato ISO o compatible
  horaEvento?: string; // hora en formato "HH:mm" (24h) o vacío
}

export function Countdown({ fechaEvento, horaEvento }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    function getTargetDate() {
      // Parsear fechaEvento, y añadir horaEvento o 20:00 (8pm) por defecto
      let targetDate = new Date(fechaEvento);
      if (!horaEvento) {
        // poner hora 20:00:00
        targetDate.setHours(20, 0, 0, 0);
      } else {
        // Parsear horaEvento "HH:mm"
        const [hours, minutes] = horaEvento.split(":").map(Number);
        targetDate.setHours(hours, minutes, 0, 0);
      }
      return targetDate;
    }

    const target = getTargetDate();

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("¡Evento iniciado!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [fechaEvento, horaEvento]);

  return (
    <div
      className="fixed bottom-4 left-4 bg-blue-300 text-teal-900 px-4 py-2 rounded-lg shadow-lg font-mono text-sm select-none z-50"
      aria-live="polite"
      role="timer"
    >
      <span>Faltan: </span>
      <span>{timeLeft}</span>
    </div>
  );
}
