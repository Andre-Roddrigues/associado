"use client";

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-300 to-gray-100 text-slate-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          <div>
            <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-900">Unitec</h4>
            <p className="mb-2">
              Transformando vidas através da educação de qualidade e formação profissional.
            </p>
            <p className="text-sm text-gray-400 hidden md:block">
              © {new Date().getFullYear()} Unitec. Todos os direitos reservados.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">REDES SOCIAIS</h4>
            <div className="flex md:justify-start justify-center items-center gap-4 text-blue-500">

              <a href="https://facebook.com/unitecm" target="_blank" rel="noopener noreferrer">
                <Facebook size={19} />
              </a>

              <a href="https://x.com/unitec_go" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.65 10.48 23.06 0h-2.1l-7.63 8.91L7.7 0H0l9.85 14.1L0 24h2.1l8.12-9.48L16.3 24H24M2.87 1.56h3.77l14.5 20.88h-3.76"/>
                </svg>
              </a>

              <a href="https://instagram.com/unitecs_" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com/company/unitecm" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
              </a>

              <a href="https://tiktok.com/@unitec.c" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                {/* Ícone TikTok */}
                <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M168,48V148a52,52,0,1,1-52-52,8,8,0,0,1,0,16,36,36,0,1,0,36,36V48a8,8,0,0,1,8-8h24a8,8,0,0,1,8,8,28,28,0,0,0,28,28,8,8,0,0,1,0,16,44.1,44.1,0,0,1-32-13.2V148a68,68,0,1,1-68-68,8,8,0,0,1,0,16A52,52,0,1,0,168,148V56h-8A8,8,0,0,1,168,48Z"/>
                </svg>
              </a>

              <a href="https://youtube.com/@unitec_go" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                {/* Ícone YouTube */}
                <Youtube size={20} />
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
                <span>suporte@unitec.ac.mz</span>
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
