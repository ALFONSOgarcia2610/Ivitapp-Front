import { Store } from "@tanstack/react-store";

interface UsuarioState {
    usuario: string | null;
    autenticado: boolean;
    nombre: string | null;
    apellido: string | null;
    provincia: string | null;
    canton: string | null;
}

export const usuarioStore = new Store<UsuarioState>({
    usuario: null,
    autenticado: false,
    nombre: null,
    apellido: null,
    provincia: null,
    canton: null,
})