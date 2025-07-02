import { MessageCircle, Search, Pencil } from "lucide-react";
import whatsapp from "@/public/images/whatsapp.png"
import Image from "next/image"
export  function CartoesInfo() {
  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 p-4">
      <div className="bg-[#273E66] rounded-lg shadow-lg p-4 w-full md:w-1/3 text-center border border-gray-600 hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-green-400 to-green-300 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Image src={whatsapp} alt="Whatsapp" className=" h-7 w-7" priority />
        </div>
        <h3 className="text-sm font-medium text-white mb-2">Atendimento Rápido </h3>
        <p className="text-xs text-white leading-tight">
        com o seu Gerente via <span className="font-semibold text-green-400">WhatsApp</span>
        </p>
      </div>

      <div className="bg-[#273E66] rounded-lg shadow-lg p-4 w-full md:w-1/3 text-center border border-gray-600 hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Search className="text-white" size={20} />
        </div>
        <p className="text-sm text-white leading-tight mb-2">
          <span className="font-semibold text-amber-600">Sempre Encontramos</span>
        </p>
        <h3 className="text-xs font-semibold text-white ">Soluções para as suas necessidades</h3>
      </div>

      <div className="bg-[#273E66] rounded-lg shadow-lg p-4 w-full md:w-1/3 text-center border border-gray-600 hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Pencil className="text-white" size={20} />
        </div>
        <h3 className="text-sm font-medium text-white mb-2">Se não temos,</h3>
        <p className="text-xs text-white leading-tight">
          <span className="font-semibold text-emerald-600">Criamos,</span> porque você manda no nosso crescimento.
        </p>
      </div>
    </div>
  );
}