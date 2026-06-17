import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AppProvider, useApp } from "./context/AppContext";
import MobileShell from "./components/layout/MobileShell";
import BottomNav from "./components/layout/BottomNav";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Arrendador
import MisEspaciosPage from "./pages/arrendador/MisEspaciosPage";
import AgregarEspacioPage from "./pages/arrendador/AgregarEspacioPage";
import EditarEspacioPage from "./pages/arrendador/EditarEspacioPage";

// Shared
import PerfilPage from "./pages/shared/PerfilPage";
import EditarPerfilPage from "./pages/shared/EditarPerfilPage";
import InicioPage from "./pages/shared/InicioPage";

// Arrendatario (Tenant) Flows
import EspacioDetallePage from "./pages/arrendatario/EspacioDetallePage";
import ReservaFechaHoraPage from "./pages/arrendatario/ReservaFechaHoraPage";
import ReservaPagoPage from "./pages/arrendatario/ReservaPagoPage";
import ReservaConfirmacionPage from "./pages/arrendatario/ReservaConfirmacionPage";
import MisReservasPage from "./pages/arrendatario/MisReservasPage";
import FavoritosPage from "./pages/arrendatario/FavoritosPage";

// Guard de autenticación
function AuthGuard({ children }: { children: React.ReactNode }) {
    const { usuarioActual } = useApp();
    if (!usuarioActual) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

// Layout con bottom nav (páginas autenticadas)
function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-1 h-full relative">
            <div className="flex-1 overflow-hidden flex flex-col">
                {children}
            </div>
            <BottomNav />
        </div>
    );
}

function AppRoutes() {
    const { usuarioActual } = useApp();

    return (
        <Routes>
            {/* Redirección raíz */}
            <Route
                path="/"
                element={
                    usuarioActual
                        ? usuarioActual.rol === "arrendador"
                            ? <Navigate to="/arrendador/espacios" replace />
                            : <Navigate to="/inicio" replace />
                        : <Navigate to="/login" replace />
                }
            />

            {/* Auth – sin bottom nav */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Arrendador – con bottom nav */}
            <Route
                path="/arrendador/espacios"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <MisEspaciosPage />
                        </AppLayout>
                    </AuthGuard>
                }
            />
            <Route
                path="/arrendador/espacios/nuevo"
                element={
                    <AuthGuard>
                        <AgregarEspacioPage />
                    </AuthGuard>
                }
            />
            <Route
                path="/arrendador/espacios/:id/editar"
                element={
                    <AuthGuard>
                        <EditarEspacioPage />
                    </AuthGuard>
                }
            />

            {/* Shared – con bottom nav */}
            <Route
                path="/inicio"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <InicioPage />
                        </AppLayout>
                    </AuthGuard>
                }
            />
            <Route
                path="/perfil"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <PerfilPage />
                        </AppLayout>
                    </AuthGuard>
                }
            />
            <Route
                path="/perfil/editar"
                element={
                    <AuthGuard>
                        <EditarPerfilPage />
                    </AuthGuard>
                }
            />

            {/* Detalle y Reserva (sin bottom nav) */}
            <Route
                path="/espacios/:id"
                element={
                    <AuthGuard>
                        <EspacioDetallePage />
                    </AuthGuard>
                }
            />
            <Route
                path="/espacios/:id/reservar/paso-1"
                element={
                    <AuthGuard>
                        <ReservaFechaHoraPage />
                    </AuthGuard>
                }
            />
            <Route
                path="/espacios/:id/reservar/paso-2"
                element={
                    <AuthGuard>
                        <ReservaPagoPage />
                    </AuthGuard>
                }
            />
            {/* Confirmacion de Reserva (con bottom nav) */}
            <Route
                path="/reservas/:id/confirmacion"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <ReservaConfirmacionPage />
                        </AppLayout>
                    </AuthGuard>
                }
            />

            {/* Favoritos y Reservas (con bottom nav) */}
            <Route
                path="/buscar"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <PlaceholderPage titulo="Buscar" />
                        </AppLayout>
                    </AuthGuard>
                }
            />
            <Route
                path="/reservas"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <MisReservasPage />
                        </AppLayout>
                    </AuthGuard>
                }
            />
            <Route
                path="/favoritos"
                element={
                    <AuthGuard>
                        <AppLayout>
                            <FavoritosPage />
                        </AppLayout>
                    </AuthGuard>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function PlaceholderPage({ titulo }: { titulo: string }) {
    return (
        <div className="flex-1 flex flex-col">
            <div className="bg-[#00BFA5] px-5 py-5">
                <h1 className="text-white font-bold text-xl">{titulo}</h1>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-300">
                    <p className="text-4xl mb-3">🚧</p>
                    <p className="font-medium">Próximamente</p>
                    <p className="text-sm mt-1">Esta sección llegará con los siguientes mockups</p>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <MobileShell>
                    <AppRoutes />
                </MobileShell>
            </BrowserRouter>
        </AppProvider>
    );
}
