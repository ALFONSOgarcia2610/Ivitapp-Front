import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClimaByCity } from "../apis/climapi";
import { Thermometer, Wind, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ClimaProps = {
    defaultCity?: string;
    hideSearch?: boolean;
};

export default function Clima({ defaultCity = "", hideSearch = false }: ClimaProps) {
    const [city, setCity] = useState(defaultCity);

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["clima", city],
        queryFn: () => getClimaByCity(city),
        enabled: !!defaultCity,
    });

    useEffect(() => {
        if (error) {
            toast.error("Ocurrió un error al consultar el clima", {
                description: (error as Error).message,
                position: "bottom-right",
            });
        }
    }, [error]);

    const handleSearch = () => {
        if (city.trim() === "") {
            toast.error("Por favor, ingresa el nombre de una ciudad", {
                position: "bottom-right",
            });
            return;
        }
        refetch();
    };

    return (
        <Card className="w-full">
            <CardHeader className="text-center px-4 py-2">
                <CardTitle className="text-lg font-semibold">Clima</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {!hideSearch && (
                    <>
                        <Input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Ingresa el nombre de una ciudad"
                            className="w-full border border-border rounded mb-4"
                        />
                        <Button
                            onClick={handleSearch}
                            className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90"
                        >
                            Buscar
                        </Button>
                    </>
                )}

                {isLoading && (
                    <div className="text-center text-sm text-muted-foreground">Cargando...</div>
                )}

                {data && (
                    <div className="text-sm space-y-2">
                        <div className="flex items-center">
                            <MapPin className="mr-2 text-primary w-4 h-4" />
                            <span>Ciudad: {data.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Thermometer className="mr-2 text-primary w-4 h-4" />
                            <span>Temperatura: {data.main.temp}°C</span>
                        </div>
                        <div className="flex items-center">
                            <Wind className="mr-2 text-primary w-4 h-4" />
                            <span>Viento: {data.wind.speed} km/h</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
