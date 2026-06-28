import { useNavigate } from "react-router";

export default function SuscripcionesPage() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 overflow-y-auto bg-white flex flex-col relative pb-24">
            {/* Header */}
            <div className="bg-[#00BFA5] px-5 py-4 flex items-center sticky top-0 z-10 shadow-sm">
                <button onClick={() => navigate(-1)} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <div className="p-5 flex flex-col items-center">
                <h2 className="text-[13px] font-extrabold text-gray-800 text-center w-full mb-6">
                    Descubre nuestras suscripciones disponibles
                </h2>

                <div className="w-full max-w-[320px] bg-white border border-[#FFB300] rounded-[24px] p-6 shadow-sm flex flex-col items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#FF9800] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>

                    <h3 className="text-sm font-extrabold text-gray-800 mb-4">
                        Plan Premium Mensual - Usuarios
                    </h3>

                    <div className="w-full text-left mb-6">
                        <p className="text-xs font-bold text-gray-800 mb-2">Incluye:</p>
                        <ul className="text-[11px] text-gray-600 space-y-1.5 list-disc pl-4 font-medium leading-tight">
                            <li>Descuentos exclusivos para equipos de trabajo grandes</li>
                            <li>Acceso prioritario a espacios premium</li>
                            <li>Cancelaciones flexibles</li>
                            <li>Beneficios y promociones especiales</li>
                            <li>Invitaciones a eventos de networking realizados por Prisma</li>
                        </ul>
                    </div>

                    <p className="text-[11px] font-extrabold text-[#FF9800] mb-6 text-center">
                        Desde L. 120/mensuales o L. 1,308/al año
                    </p>

                    <button 
                        onClick={() => alert("Suscripción procesada exitosamente.")}
                        className="bg-[#FF9800] text-white font-bold text-[13px] px-8 py-2 rounded-full shadow-md hover:bg-[#F57C00] transition-colors"
                    >
                        Suscribirse
                    </button>
                </div>
            </div>
        </div>
    );
}
