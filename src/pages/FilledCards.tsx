export default function FilledCards() {
    return (
        <div className="">
            {/* 1. Cards principales */}
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="">
                        <div className="grid grid-cols-2 items-center gap-4 p-1">
                            <div className="h-8 w-full rounded-md bg-primary text-white flex items-center justify-center">
                                Header {i + 1}
                            </div>
                            <div className="grid gap-1 w-full">
                                <p className="h-4 w-full bg-muted text-sm px-2">Dato 1</p>
                                <p className="h-4 w-full bg-muted text-sm px-2">Dato 2</p>
                            </div>
                        </div>

                        <div className="p-1 space-y-2">
                            <div className="h-30 w-full bg-secondary rounded-md flex items-center justify-center">
                                Contenido visual
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Filtros o inputs */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="col-span-1 p-1">
                    <div className="grid grid-cols-2 gap-4">
                        <button className="h-10 w-full bg-primary text-white rounded">Botón</button>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-10 w-full bg-muted rounded">Opción 1</button>
                            <button className="h-10 w-full bg-muted rounded">Opción 2</button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 p-1">
                    <div className="grid grid-cols-4 gap-4">
                        <input className="h-10 w-full rounded border px-2" placeholder="Input 1" />
                        <input className="h-10 w-full rounded border px-2" placeholder="Input 2" />
                        <input className="h-10 w-full rounded border px-2" placeholder="Input 3" />
                        <input className="h-10 w-full rounded border px-2" placeholder="Input 4" />
                    </div>
                </div>
            </div>

            {/* 3. Card grande */}
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="p-1">
                    <div className="h-60 w-full bg-secondary flex items-center justify-center rounded">
                        Gráfico o contenido principal
                    </div>
                </div>
            </div>

            {/* 4. Información expandida */}
            <div className="grid grid-cols-3 items-center gap-4 p-1 mt-4">
                <div className="h-50 w-full bg-muted rounded flex items-center justify-center">
                    Imagen
                </div>
                <div className="grid gap-1 col-span-2">
                    {[...Array(9)].map((_, i) => (
                        <p key={i} className="h-4 w-full bg-muted text-sm px-2">Línea {i + 1}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
