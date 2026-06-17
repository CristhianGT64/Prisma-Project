import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";

export default function EditarPerfilPage() {
    const navigate = useNavigate();
    const { usuarioActual, actualizarPerfil, logout } = useApp();

    const [form, setForm] = useState({
        nombres: usuarioActual?.nombres ?? "",
        apellidos: usuarioActual?.apellidos ?? "",
        correo: usuarioActual?.correo ?? "",
        telefono: usuarioActual?.telefono ?? "",
        ocupacion: usuarioActual?.ocupacion ?? "",
        empresa: usuarioActual?.empresa ?? "",
        descripcion: usuarioActual?.descripcion ?? "",
        fotoPerfil: usuarioActual?.fotoPerfil ?? "",
    });
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [previewFoto, setPreviewFoto] = useState(usuarioActual?.fotoPerfil ?? "");

    if (!usuarioActual) { navigate("/login"); return null; }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, fotoPerfil: e.target.value }));
        setPreviewFoto(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 500));
        actualizarPerfil({ ...form });
        setLoading(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            {/* Header */}
            <div className="bg-[#00BFA5] flex items-center gap-3 px-5 py-4 sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-white font-bold text-lg">Editar Perfil</h1>
            </div>

            {/* Avatar Section */}
            <div className="bg-white px-5 py-6 flex flex-col items-center gap-3 border-b border-gray-100">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-[#00BFA5] shadow-md">
                        {previewFoto ? (
                            <img src={previewFoto} alt="foto perfil" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#00BFA5] rounded-full flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 text-center mb-1">URL de foto de perfil</label>
                    <input
                        type="url"
                        value={form.fotoPerfil}
                        onChange={handleFotoChange}
                        placeholder="https://..."
                        className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition w-64 text-center"
                    />
                </div>
                <div className="text-center">
                    <p className="font-bold text-gray-800">{usuarioActual.nombres} {usuarioActual.apellidos}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        usuarioActual.rol === "arrendador"
                            ? "bg-[#E0F7F4] text-[#00897B]"
                            : "bg-blue-50 text-blue-600"
                    }`}>
                        {usuarioActual.rol === "arrendador" ? "Arrendador" : "Arrendatario"}
                    </span>
                </div>
            </div>

            {/* Success banner */}
            {saved && (
                <div className="mx-4 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Perfil actualizado correctamente
                </div>
            )}

            <form onSubmit={handleSubmit} className="px-5 py-5 flex flex-col gap-4">
                <p className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Información personal</p>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nombre(s)</label>
                        <input
                            name="nombres"
                            value={form.nombres}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Apellido(s)</label>
                        <input
                            name="apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Correo electrónico</label>
                    <input
                        type="email"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Teléfono</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition"
                    />
                </div>

                <p className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2 mt-2">Información profesional</p>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ocupación</label>
                    <input
                        name="ocupacion"
                        value={form.ocupacion}
                        onChange={handleChange}
                        placeholder="Ej. Diseñadora Gráfica"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Empresa</label>
                    <input
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        placeholder="Ej. Estudio Creativo"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Cuéntanos sobre ti..."
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] transition resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00BFA5] hover:bg-[#00897B] text-white font-bold py-4 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-60 mt-2"
                >
                    {loading ? "Guardando..." : "Guardar cambios"}
                </button>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full border border-[#EF5350] text-[#EF5350] font-semibold py-3.5 rounded-xl hover:bg-red-50 transition-all duration-200 active:scale-95"
                >
                    Cerrar sesión
                </button>
            </form>
        </div>
    );
}
