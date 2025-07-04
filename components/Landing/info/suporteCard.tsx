import { MessageCircle, Search, Pencil } from "lucide-react";
import whatsapp from "@/public/images/whatsapp.png"
import Image from "next/image"

export function CartoesInfo() {
  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 p-4">
      {/* WhatsApp Card */}
      <div className="bg-gradient-to-br from-[#273E66]/10 to-[#2a4375]/10 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full md:w-1/3 text-center border border-[#4a7eff]/10 hover:border-[#4a7eff]/30 transition-all duration-300 hover:shadow-[#4a7eff]/10 hover:backdrop-blur-md">
        <div className="bg-gradient-to-br from-green-400 to-green-300 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Image src={whatsapp} alt="Whatsapp" className="h-7 w-7" priority />
        </div>
        <h3 className="text-sm font-medium text-white mb-2">Atendimento Rápido</h3>
        <p className="text-xs text-gray-200/90 leading-tight">
          com o seu Gerente via <span className=" text-green-300/90">WhatsApp</span>
        </p>
      </div>

      {/* Search Card */}
      <div className="bg-gradient-to-br from-[#273E66]/10 to-[#2a4375]/10 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full md:w-1/3 text-center border border-[#4a7eff]/10 hover:border-[#4a7eff]/30 transition-all duration-300 hover:shadow-[#4a7eff]/10 hover:backdrop-blur-md">
        <div className="bg-gradient-to-br from-amber-500 to-amber-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Search className="text-white" size={22} />
        </div>
        <p className="text-sm text-gray-200/90 leading-tight mb-2">
          <span className=" text-amber-400/90">Sempre Encontramos</span>
        </p>
        <h3 className="text-xs  text-white/90">Soluções para as suas necessidades</h3>
      </div>

      {/* Pencil Card */}
      <div className="bg-gradient-to-br from-[#273E66]/10 to-[#2a4375]/10 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full md:w-1/3 text-center border border-[#4a7eff]/10 hover:border-[#4a7eff]/30 transition-all duration-300 hover:shadow-[#4a7eff]/10 hover:backdrop-blur-md">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Pencil className="text-white" size={22} />
        </div>
        <h3 className="text-sm font-medium text-white mb-2">Se não temos,</h3>
        <p className="text-xs text-gray-200/90 leading-tight">
          <span className=" text-emerald-400/90">Criamos,</span> porque você manda no nosso crescimento.
        </p>
      </div>
    </div>
  );
}