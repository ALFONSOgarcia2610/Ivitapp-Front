"use client";

import { Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Clima() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Recepción</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-10">
          <Wrench className="w-12 h-12 text-gray-500 animate-pulse" />
          <p className="text-gray-600 font-medium">Estamos trabajando en esta opción</p>
          <p className="text-sm text-muted-foreground">
            Próximamente podrás contar con el servicio desde esta sección.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
