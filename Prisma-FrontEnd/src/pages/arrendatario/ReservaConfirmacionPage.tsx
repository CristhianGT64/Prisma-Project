import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useApp } from "../../context/AppContext";

export default function ReservaConfirmacionPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { reservas, espacios } = useApp();

    const reserva = reservas.find(r => r.id === id);
    const espacio = espacios.find(e => e.id === reserva?.espacioId);

    useEffect(() => {
        if (!reserva || !espacio) {
            navigate("/inicio");
        }
    }, [reserva, espacio, navigate]);

    if (!reserva || !espacio) return null;

    const formatFecha = (fechaStr: string) => {
        if (!fechaStr) return "";
        const fecha = new Date(fechaStr + "T12:00:00");
        return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const getFechasTexto = () => {
        if (reserva.fechaInicio === reserva.fechaFin) return formatFecha(reserva.fechaInicio);
        return `${formatFecha(reserva.fechaInicio)} - ${formatFecha(reserva.fechaFin)}`;
    };

    return (
        <div className="flex-1 overflow-y-auto bg-white flex flex-col items-center justify-center p-5 text-center relative pb-24">
            
            <div className="w-20 h-20 bg-[#FFF9E6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#FF9800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-2">Reserva confirmada!</h1>
            
            <p className="text-sm text-gray-500 mb-6">
                Tu espacio ha sido reservado exitosamente.<br/>
                El código de reserva es:
            </p>

            <div className="bg-[#FFF9E6] px-6 py-2.5 rounded-full border border-[#FFE0B2] mb-8">
                <span className="font-bold text-[#FF9800] tracking-widest">{reserva.id}</span>
            </div>

            <p className="text-xs text-gray-400 mb-6 max-w-xs mx-auto">
                Preséntalo al momento de llegar al lugar para verificar tu identidad.
            </p>

            {/* Resumen simplificado */}
            <div className="w-full bg-[#E0F7F4] rounded-2xl p-5 border border-[#B2EBF2] shadow-sm flex flex-col gap-3 text-left">
                <div className="flex justify-between items-start text-sm">
                    <span className="font-semibold text-gray-600">Espacio:</span>
                    <span className="font-medium text-gray-800 text-right">{espacio.nombre}</span>
                </div>
                <div className="flex justify-between items-start text-sm border-t border-[#B2EBF2]/50 pt-3">
                    <span className="font-semibold text-gray-600">Fechas:</span>
                    <span className="font-medium text-gray-800">{getFechasTexto()}</span>
                </div>
                <div className="flex justify-between items-start text-sm border-t border-[#B2EBF2]/50 pt-3">
                    <span className="font-semibold text-gray-600">Horario:</span>
                    <span className="font-medium text-gray-800">{reserva.horaInicio} - {reserva.horaFin}</span>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 p-4 flex justify-center z-20">
                <button 
                    onClick={() => navigate("/reservas")}
                    className="w-full bg-[#FF9800] text-white font-bold py-3.5 rounded-xl hover:bg-[#F57C00] active:scale-[0.98] transition-all"
                >
                    Ver mis reservas
                </button>
            </div>
        </div>
    );
}
