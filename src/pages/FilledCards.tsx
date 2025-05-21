import Pokemon from "@/pages/Pokemon";
import Clima from "@/pages/Clima";
import { usuarioStore } from "../Store/authstore";
import { useStore } from "@tanstack/react-store";

export default function FilledCards() {
    const nombre = useStore(usuarioStore, (state) => state.nombre);
    const apellido = useStore(usuarioStore, (state) => state.apellido);
    const canton = useStore(usuarioStore, (state) => state.canton);
    const provincia = useStore(usuarioStore, (state) => state.provincia);

    return (
        <div className="w-full px-2">
            {/* Cards responsivas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i}>
                        <div className="grid grid-cols-2 items-center gap-4 p-1">
                            <div className="h-8 w-full rounded-md bg-primary text-white flex items-center justify-center text-sm">
                                Header {i + 1}
                            </div>
                            <div className="grid gap-1 w-full">
                                <p className="h-4 w-full bg-muted text-sm px-2">Dato 1</p>
                                <p className="h-4 w-full bg-muted text-sm px-2">Dato 2</p>
                            </div>
                        </div>

                        <div className="p-1 space-y-2">
                            <div className="h-30 w-full bg-secondary rounded-md flex items-center justify-center text-sm">
                                Contenido visual
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nombre / Ubicación / Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-1">
                    <div className="flex flex-wrap gap-2">
                        <button className="flex-1 min-w-[120px] h-10 bg-primary text-white rounded text-sm">
                            {nombre?.toUpperCase()} {apellido?.toUpperCase()}
                        </button>
                        <button className="flex-1 min-w-[100px] h-10 bg-muted rounded text-sm">
                            {canton?.toUpperCase()}
                        </button>
                        <button className="flex-1 min-w-[100px] h-10 bg-muted rounded text-sm">
                            {provincia?.toUpperCase()}
                        </button>
                    </div>
                </div>
                <div className="p-1">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <input className="h-10 w-full rounded border px-2 text-sm" placeholder="Input 1" />
                        <input className="h-10 w-full rounded border px-2 text-sm" placeholder="Input 2" />
                        <input className="h-10 w-full rounded border px-2 text-sm" placeholder="Input 3" />
                        <input className="h-10 w-full rounded border px-2 text-sm" placeholder="Input 4" />
                    </div>
                </div>
            </div>

            {/* Sección Pokémon */}
            <div className="mt-4 w-full">
                <Pokemon />
            </div>

            {/* Clima + líneas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start mt-4">
                <div className="w-full overflow-hidden">
                    <Clima defaultCity="San Jacinto" hideSearch />
                </div>
                <div className="col-span-2 grid gap-1">
                    {[...Array(9)].map((_, i) => (
                        <p key={i} className="h-4 w-full bg-muted text-sm px-2">
                            Línea {i + 1}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
