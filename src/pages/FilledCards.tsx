"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { obtenerInvitadosPorUsuario } from "@/database/dababase";
import { usuarioStore } from "@/Store/authstore";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Hash,
  TrendingUp,
  Calendar,
  MapPin
} from "lucide-react";
import logoApp from "@/img/logo.png";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color: "emerald" | "rose" | "amber" | "blue" | "purple" | "indigo";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard = ({ icon, title, value, subtitle, color, trend }: StatsCardProps) => {
  const colorClasses = {
    emerald: "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
    rose: "border-l-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
    amber: "border-l-amber-500 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
    blue: "border-l-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
    purple: "border-l-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300",
    indigo: "border-l-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300",
  };

  return (
    <Card className={`border-l-4 hover:shadow-lg transition-all duration-200 ${colorClasses[color]}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
          {trend && (
            <div className={`text-right ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              <div className="flex items-center space-x-1">
                <TrendingUp className={`h-4 w-4 ${!trend.isPositive && 'rotate-180'}`} />
                <span className="text-sm font-semibold">{trend.value}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function FilledCards() {
  const username = usuarioStore.state.usuario ?? "";
  const isMobile = useIsMobile();

  const { data, isLoading } = useQuery({
    queryKey: ["invitados", username],
    queryFn: () => obtenerInvitadosPorUsuario(username),
    enabled: !!username,
  });

  const invitados = data?.invitados ?? [];

  // Calcular estadísticas
  const stats = {
    total: invitados.length,
    asistiran: invitados.filter(inv => {
      const estado = inv.estado?.toLowerCase().trim();
      // Incluir tanto "asistira" como "si asistira"
      return estado === "asistira" || estado === "si asistira";
    }).length,
    noAsistiran: invitados.filter(inv => {
      const estado = inv.estado?.toLowerCase().trim();
      return estado === "no asistira";
    }).length,
    pendientes: invitados.filter(inv => {
      const estado = inv.estado?.toLowerCase().trim();
      return !estado || estado === "pendiente" || estado === "";
    }).length,
    totalAdmisiones: invitados.reduce((sum, inv) => sum + (inv.admision || 0), 0),
    mesasAsignadas: new Set(invitados.filter(inv => inv.mesa).map(inv => inv.mesa)).size,
    promedioAdmisionPorInvitado: invitados.length > 0 ? (invitados.reduce((sum, inv) => sum + (inv.admision || 0), 0) / invitados.length).toFixed(1) : "0",
  };

  // Calcular porcentajes
  const porcentajes = {
    asistiran: stats.total > 0 ? ((stats.asistiran / stats.total) * 100).toFixed(1) : "0",
    noAsistiran: stats.total > 0 ? ((stats.noAsistiran / stats.total) * 100).toFixed(1) : "0",
    pendientes: stats.total > 0 ? ((stats.pendientes / stats.total) * 100).toFixed(1) : "0",
  };

  // Calcular estadísticas por mesa
  const mesasInfo = invitados
    .filter(inv => inv.mesa) // Solo invitados con mesa asignada
    .reduce((acc, inv) => {
      const mesa = inv.mesa!;
      if (!acc[mesa]) {
        acc[mesa] = {
          numeroMesa: mesa,
          totalInvitados: 0,
          totalAdmisiones: 0,
          confirmados: 0,
          pendientes: 0,
          noAsistiran: 0,
          invitados: []
        };
      }
      
      acc[mesa].totalInvitados++;
      acc[mesa].totalAdmisiones += inv.admision || 0;
      acc[mesa].invitados.push(`${inv.nombre} ${inv.apellido}`);
      
      const estado = inv.estado?.toLowerCase().trim();
      if (estado === "asistira" || estado === "si asistira") {
        acc[mesa].confirmados++;
      } else if (estado === "no asistira") {
        acc[mesa].noAsistiran++;
      } else {
        acc[mesa].pendientes++;
      }
      
      return acc;
    }, {} as Record<number, {
      numeroMesa: number;
      totalInvitados: number;
      totalAdmisiones: number;
      confirmados: number;
      pendientes: number;
      noAsistiran: number;
      invitados: string[];
    }>);

  const mesasArray = Object.values(mesasInfo).sort((a, b) => a.numeroMesa - b.numeroMesa);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 ${isMobile ? 'mt-15' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Corporativo Compacto */}
        <div className="relative mb-8 ">
          {/* Fondo del header con color sólido */}
          <div className="bg-teal-600 rounded-xl shadow-lg overflow-hidden">
            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
            </div>
            
            <div className="relative p-6">
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : 'justify-between'}`}>
                {/* Logo y título */}
                <div className={`flex items-center ${isMobile ? 'mb-4' : 'mb-0'}`}>
                  <div className="relative">
                    <img
                      src={logoApp}
                      alt="Logo"
                      className="h-14 w-14 object-contain bg-white/95 rounded-xl p-2 shadow-md"
                    />
                  </div>
                  <div className={`ml-4 ${isMobile ? 'text-center' : 'text-left'}`}>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      Panel de Control
                    </h1>
                    <p className="text-teal-100 text-base font-medium">
                      Gestión de Invitaciones
                    </p>
                  </div>
                </div>

                {/* Información del usuario compacta */}
                <div className={`${isMobile ? 'w-full' : 'flex-shrink-0'}`}>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {usuarioStore.state.nombre} {usuarioStore.state.apellido}
                        </p>
                        <p className="text-teal-200 text-xs">
                          Administrador
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra de estadísticas rápidas compacta */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.total}</div>
                    <div className="text-teal-200 text-xs">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.asistiran}</div>
                    <div className="text-teal-200 text-xs">Confirmados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.pendientes}</div>
                    <div className="text-teal-200 text-xs">Pendientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.totalAdmisiones}</div>
                    <div className="text-teal-200 text-xs">Admisiones</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de estadísticas principales */}
        <div className={`grid gap-6 mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
          <StatsCard
            icon={<Users className="h-6 w-6" />}
            title="Total Invitados"
            value={stats.total}
            subtitle="Invitaciones creadas"
            color="blue"
            trend={{
              value: stats.total > 0 ? "Activo" : "Sin datos",
              isPositive: stats.total > 0
            }}
          />
          
          <StatsCard
            icon={<UserCheck className="h-6 w-6" />}
            title="Confirmaron Asistencia"
            value={stats.asistiran}
            subtitle={`${porcentajes.asistiran}% del total`}
            color="emerald"
          />
          
          <StatsCard
            icon={<UserX className="h-6 w-6" />}
            title="No Asistirán"
            value={stats.noAsistiran}
            subtitle={`${porcentajes.noAsistiran}% del total`}
            color="rose"
          />
          
          <StatsCard
            icon={<Clock className="h-6 w-6" />}
            title="Pendientes"
            value={stats.pendientes}
            subtitle={`${porcentajes.pendientes}% del total`}
            color="amber"
          />
        </div>

        {/* Grid de estadísticas secundarias */}
        <div className={`grid gap-6 mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <StatsCard
            icon={<Hash className="h-6 w-6" />}
            title="Total Admisiones"
            value={stats.totalAdmisiones}
            subtitle="Número total de pases"
            color="purple"
          />
          
          <StatsCard
            icon={<MapPin className="h-6 w-6" />}
            title="Mesas Asignadas"
            value={stats.mesasAsignadas}
            subtitle="Mesas diferentes"
            color="indigo"
          />
          
          <StatsCard
            icon={<Calendar className="h-6 w-6" />}
            title="Promedio por Invitado"
            value={stats.promedioAdmisionPorInvitado}
            subtitle="Admisiones por persona"
            color="blue"
          />
        </div>

        {/* Información detallada por mesa */}
        {mesasArray.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Información por Mesa
            </h2>
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
              {mesasArray.map((mesa) => (
                <Card key={mesa.numeroMesa} className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          Mesa {mesa.numeroMesa}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mesa.totalInvitados} invitado{mesa.totalInvitados !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {mesa.totalAdmisiones}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Admisiones
                        </div>
                      </div>
                    </div>
                    
                    {/* Estadísticas de la mesa */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {mesa.confirmados}
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-300">
                          Confirmados
                        </div>
                      </div>
                      <div className="text-center p-2 bg-amber-50 dark:bg-amber-950 rounded-lg">
                        <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {mesa.pendientes}
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-300">
                          Pendientes
                        </div>
                      </div>
                      <div className="text-center p-2 bg-rose-50 dark:bg-rose-950 rounded-lg">
                        <div className="text-lg font-bold text-rose-600 dark:text-rose-400">
                          {mesa.noAsistiran}
                        </div>
                        <div className="text-xs text-rose-700 dark:text-rose-300">
                          No asistirán
                        </div>
                      </div>
                    </div>
                    
                    {/* Lista de invitados */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Invitados:
                      </p>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {mesa.invitados.map((invitado, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {invitado}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
