"use client";

import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import unitec from "@/public/images/uniteccolor.PNG"
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-300 to-gray-100 text-slate-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Coluna 1 - Sobre */}
          <div>
            <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-900">Unitec</h4>
            {/* <Image src={unitec} alt="unitec" width={100} height={100} /> */}
            <p className="mb-2">
              Transformando vidas através da educação de qualidade e formação profissional.
            </p>
            <p className="text-sm text-gray-400 hidden md:block">
              © {new Date().getFullYear()} UnitecPRO. Todos os direitos reservados.
            </p>
          </div>

          {/* Coluna 2 - Newsletter e Redes Sociais */}
          <div>
          <h4 className="text-sm font-semibold mb-3">REDES SOCIAIS</h4>
            <div className="flex md:justify-start justify-center  gap-4 text-blue-500">
              <a href="https://facebook.com/unitec.upro" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/unitec" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/unitecpo" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Linkedin" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 mt-5">
              <input
                type="email"
                placeholder="Receba nossas atualizações por email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
              >
                Inscrever
              </button>
            </form>

            

            <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-400 mt-6">
              <Link href="/politica-de-privacidade" className="hover:text-blue-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-de-servico" className="hover:text-blue-400 transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h3 className="text-sm font-semibold mb-3">CONTACTOS</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="text-blue-400" size={18} />
                <span>+258 870 088 787 || 834 303 184 || 863 676 115</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="text-blue-400" size={18} />
                <span>pro@unitec.ac.mz</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="text-blue-400" size={18} />
                <span>Av. Salvador Allende Nº 60., Maputo</span>
              </li>
            </ul>
            <div className="text-sm text-gray-400 mt-6 md:hidden text-center">
              © {new Date().getFullYear()} Unitec Moçambique. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
