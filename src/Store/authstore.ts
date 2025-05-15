import {Store} from "@tanstack/react-store";

interface UsuarioState{
    usuario: string | null;
    autenticado: boolean;
}

export const usuarioStore = new Store<UsuarioState>({
    usuario: null,
    autenticado: false,
})