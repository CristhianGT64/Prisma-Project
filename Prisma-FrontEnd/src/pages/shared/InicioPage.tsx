// Página placeholder para Inicio (arrendatario)
// Se irá construyendo en futuras iteraciones según los mockups que el usuario envíe
import { useApp } from "../../context/AppContext";

export default function InicioPage() {
    const { usuarioActual, espacios } = useApp();

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            <div className="bg-[#00BFA5] px-5 py-6">
                <p className="text-white/80 text-sm">Buenos días,</p>
                <h1 className="text-white font-bold text-2xl">
                    {usuarioActual?.nombres ?? "Bienvenido"} 👋
                </h1>
                <p className="text-white/70 text-sm mt-1">Encuentra tu espacio ideal</p>
            </div>

            <div className="px-4 py-5">
                <h2 className="font-bold text-gray-800 text-base mb-3">Espacios disponibles</h2>
                <div className="flex flex-col gap-4">
                    {espacios.filter(e => e.disponible).map(espacio => (
                        <div key={espacio.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            {espacio.imagenes[0] && (
                                <img src={espacio.imagenes[0].url} alt={espacio.nombre} className="w-full h-40 object-cover" />
                            )}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800">{espacio.nombre}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">📍 {espacio.ciudad}</p>
                                {espacio.precioHora && (
                                    <p className="text-[#00BFA5] font-semibold text-sm mt-2">
                                        L. {espacio.precioHora}/hora
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
