import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";

export default function PerfilPage() {
    const navigate = useNavigate();
    const { usuarioActual, logout } = useApp();

    if (!usuarioActual) { navigate("/login"); return null; }

    const menuItems = [
        {
            label: "Editar perfil",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            action: () => navigate("/perfil/editar"),
        },
        ...(usuarioActual.rol === "arrendador" ? [{
            label: "Mis Espacios",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            action: () => navigate("/arrendador/espacios"),
        }] : []),
    ];

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            {/* Header */}
            <div className="bg-[#00BFA5] px-5 pt-10 pb-16">
                <h1 className="text-white font-bold text-xl">Mi Perfil</h1>
            </div>

            {/* Avatar card */}
            <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-[#00BFA5] flex-shrink-0">
                    {usuarioActual.fotoPerfil ? (
                        <img src={usuarioActual.fotoPerfil} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{usuarioActual.nombres} {usuarioActual.apellidos}</p>
                    <p className="text-sm text-gray-500 truncate">{usuarioActual.correo}</p>
                    <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                        usuarioActual.rol === "arrendador"
                            ? "bg-[#E0F7F4] text-[#00897B]"
                            : "bg-blue-50 text-blue-600"
                    }`}>
                        {usuarioActual.rol === "arrendador" ? "Arrendador" : "Arrendatario"}
                    </span>
                </div>
            </div>

            <div className="px-4 mt-5 flex flex-col gap-3">
                {/* Info adicional */}
                {(usuarioActual.empresa || usuarioActual.ocupacion) && (
                    <div className="bg-white rounded-2xl p-4 flex flex-col gap-2 shadow-sm border border-gray-50">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Información</p>
                        {usuarioActual.ocupacion && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>💼</span><span>{usuarioActual.ocupacion}</span>
                            </div>
                        )}
                        {usuarioActual.empresa && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>🏢</span><span>{usuarioActual.empresa}</span>
                            </div>
                        )}
                        {usuarioActual.telefono && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>📱</span><span>{usuarioActual.telefono}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Menú */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50">
                    {menuItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={item.action}
                            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-0"
                        >
                            <span className="text-[#00BFA5]">{item.icon}</span>
                            <span className="text-sm font-medium text-gray-700 flex-1 text-left">{item.label}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Cerrar sesión */}
                <button
                    onClick={() => { logout(); navigate("/login"); }}
                    className="w-full border border-[#EF5350] text-[#EF5350] font-semibold py-3.5 rounded-2xl hover:bg-red-50 transition-all duration-200 active:scale-95 mt-2"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
