import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Usuario } from "../interfaces/Usuario";
import type { Espacio } from "../interfaces/Espacio";
import type { Favorito } from "../interfaces/Favorito";
import type { Reserva } from "../interfaces/Reserva";
import { usuarios as usuariosIniciales } from "../Data/UsuarioData";
import { espaciosData } from "../Data/EspacioData";
import { favoritos as favoritosIniciales } from "../Data/FavoritoData";
import { reservas as reservasIniciales } from "../Data/ReservaData";

// Estado temporal del flujo de reserva (entre pantallas)
export interface ReservaEnCurso {
    espacioId: string;
    fechaInicio: string;
    fechaFin: string;
    horaInicio: string;
    horaFin: string;
    cantidadPersonas: number;
    precioTotal: number;
    codigoDescuento?: string;
    descuento?: number;
}

interface AppContextType {
    // Auth
    usuarioActual: Usuario | null;
    login: (correo: string, password: string) => boolean;
    logout: () => void;
    registrar: (usuario: Omit<Usuario, "id" | "fechaRegistro">) => boolean;
    actualizarPerfil: (datos: Partial<Usuario>) => void;

    // Espacios
    espacios: Espacio[];
    agregarEspacio: (espacio: Omit<Espacio, "id" | "fechaCreacion">) => void;
    actualizarEspacio: (id: string, datos: Partial<Espacio>) => void;
    eliminarEspacio: (id: string) => void;
    obtenerEspaciosPorArrendador: (arrendadorId: string) => Espacio[];

    // Favoritos
    favoritos: Favorito[];
    toggleFavorito: (espacioId: string) => void;
    esFavorito: (espacioId: string) => boolean;

    // Reservas
    reservas: Reserva[];
    agregarReserva: (reserva: Omit<Reserva, "id" | "fechaCreacion">) => string;
    cancelarReserva: (id: string) => void;

    // Flujo de reserva temporal (entre pantallas)
    reservaEnCurso: ReservaEnCurso | null;
    setReservaEnCurso: (r: ReservaEnCurso | null) => void;

    // Ultima reserva confirmada (para pantalla de confirmación)
    ultimaReservaId: string | null;
    setUltimaReservaId: (id: string | null) => void;

    // Usuarios (para lookups)
    usuarios: Usuario[];

    // Código de descuento activo
    codigoDescuentoActivo: string | null;
    setCodigoDescuentoActivo: (c: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Códigos de descuento válidos
const CODIGOS_DESCUENTO: Record<string, number> = {
    "AGOSTO2025": 0.30,
    "PROMO10": 0.10,
    "PRISMA20": 0.20,
};
export const validarCodigoDescuento = (codigo: string): number | null => {
    return CODIGOS_DESCUENTO[codigo.toUpperCase()] ?? null;
};

export function AppProvider({ children }: { children: ReactNode }) {
    const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales);
    const [espacios, setEspacios] = useState<Espacio[]>(espaciosData);
    const [favoritos, setFavoritos] = useState<Favorito[]>(favoritosIniciales);
    const [reservas, setReservas] = useState<Reserva[]>(reservasIniciales);
    const [reservaEnCurso, setReservaEnCurso] = useState<ReservaEnCurso | null>(null);
    const [ultimaReservaId, setUltimaReservaId] = useState<string | null>(null);
    const [codigoDescuentoActivo, setCodigoDescuentoActivo] = useState<string | null>(null);

    // AUTH
    const login = (correo: string, password: string): boolean => {
        const user = usuarios.find(u => u.correo === correo && u.password === password);
        if (user) { setUsuarioActual(user); return true; }
        return false;
    };

    const logout = () => {
        setUsuarioActual(null);
        setReservaEnCurso(null);
        setUltimaReservaId(null);
    };

    const registrar = (datos: Omit<Usuario, "id" | "fechaRegistro">): boolean => {
        const existe = usuarios.find(u => u.correo === datos.correo);
        if (existe) return false;
        const nuevo: Usuario = {
            ...datos,
            id: `USR${String(usuarios.length + 1).padStart(3, "0")}`,
            fechaRegistro: new Date().toISOString().split("T")[0]
        };
        setUsuarios(prev => [...prev, nuevo]);
        setUsuarioActual(nuevo);
        return true;
    };

    const actualizarPerfil = (datos: Partial<Usuario>) => {
        if (!usuarioActual) return;
        const actualizado = { ...usuarioActual, ...datos };
        setUsuarioActual(actualizado);
        setUsuarios(prev => prev.map(u => u.id === actualizado.id ? actualizado : u));
    };

    // ESPACIOS
    const agregarEspacio = (espacio: Omit<Espacio, "id" | "fechaCreacion">) => {
        const nuevo: Espacio = {
            ...espacio,
            id: `ESP${String(espacios.length + 1).padStart(3, "0")}`,
            fechaCreacion: new Date().toISOString().split("T")[0]
        };
        setEspacios(prev => [...prev, nuevo]);
    };

    const actualizarEspacio = (id: string, datos: Partial<Espacio>) => {
        setEspacios(prev => prev.map(e => e.id === id ? { ...e, ...datos } : e));
    };

    const eliminarEspacio = (id: string) => {
        setEspacios(prev => prev.filter(e => e.id !== id));
    };

    const obtenerEspaciosPorArrendador = (arrendadorId: string) =>
        espacios.filter(e => e.arrendadorId === arrendadorId);

    // FAVORITOS
    const toggleFavorito = (espacioId: string) => {
        if (!usuarioActual) return;
        const existe = favoritos.find(f => f.usuarioId === usuarioActual.id && f.espacioId === espacioId);
        if (existe) {
            setFavoritos(prev => prev.filter(f => f.id !== existe.id));
        } else {
            const nuevo: Favorito = {
                id: `FAV${String(favoritos.length + 1).padStart(3, "0")}`,
                usuarioId: usuarioActual.id,
                espacioId,
                fechaGuardado: new Date().toISOString().split("T")[0]
            };
            setFavoritos(prev => [...prev, nuevo]);
        }
    };

    const esFavorito = (espacioId: string): boolean => {
        if (!usuarioActual) return false;
        return favoritos.some(f => f.usuarioId === usuarioActual.id && f.espacioId === espacioId);
    };

    // RESERVAS
    const agregarReserva = (reserva: Omit<Reserva, "id" | "fechaCreacion">): string => {
        const id = `RES${String(reservas.length + 1).padStart(3, "0")}`;
        const nueva: Reserva = {
            ...reserva,
            id,
            fechaCreacion: new Date().toISOString().split("T")[0]
        };
        setReservas(prev => [...prev, nueva]);
        return id;
    };

    const cancelarReserva = (id: string) => {
        setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: "cancelada" as const } : r));
    };

    return (
        <AppContext.Provider value={{
            usuarioActual, login, logout, registrar, actualizarPerfil,
            espacios, agregarEspacio, actualizarEspacio, eliminarEspacio, obtenerEspaciosPorArrendador,
            favoritos, toggleFavorito, esFavorito,
            reservas, agregarReserva, cancelarReserva,
            reservaEnCurso, setReservaEnCurso,
            ultimaReservaId, setUltimaReservaId,
            usuarios,
            codigoDescuentoActivo, setCodigoDescuentoActivo,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used inside AppProvider");
    return ctx;
}
