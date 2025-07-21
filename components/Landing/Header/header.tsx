"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  BookOpen,
  BookCopy,
  Wallet,
  User2,
  Bell,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getInstructorData } from "@/components/formadorPage/actionsFormador/get-user-actions";
import { LogoutButton } from "../LogoutButton";
import NotificationBell from "./notificacoes";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [notificacoes, setNotificacoes] = useState(27); // Exemplo de contagem

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstructorData();
        if (data?.photoPerfil?.url) setProfileImage(data.photoPerfil.url);
      } catch (error) {
        console.error("Erro ao buscar dados do instrutor:", error);
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  return (
    <>
      {/* Header principal */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          hasScrolled
            ? "bg-dark-blue-darker/20 backdrop-blur-2xl shadow-xl"
            : "bg-dark-blue-darker shadow-4xl"
        }`}
      >
        <div className="flex justify-between items-center p-4 max-w-full mx-auto">
          {/* Logo + Menu */}
          <div className="flex justify-evenly items-center gap-4">
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/">
              <Image height={45} width={45} src="/images/uniteclogo.PNG" alt="Unitec" />
            </Link>
          </div>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            {!isAuthenticated ? (
              <>
                <Link href="/#como-funciona" className="text-white hover:text-blue-100 font-medium">Como Funciona</Link>
                <Link href="/#cursos" className="text-white hover:text-blue-100 font-medium">Sobre Produtos</Link>
                <Link href="/#mentorias" className="text-white hover:text-blue-100 font-medium">Mentorias</Link>
                <Link href="/#saque" className="text-white hover:text-blue-100 font-medium">Benefícios</Link>
                <Link href="/#faq" className="text-white hover:text-blue-100 font-medium">FAQ</Link>
              </>
            ) : (
              <>
                <Link href="/formador/painel" className="text-white hover:text-blue-100 font-medium">Painel</Link>
                <Link href="/#como-funciona" className="text-white hover:text-blue-100 font-medium">Como Funciona</Link>
                <Link href="/#cursos" className="text-white hover:text-blue-100 font-medium">Sobre Produtos</Link>
                <Link href="/#mentorias" className="text-white hover:text-blue-100 font-medium">Mentorias</Link>
                <Link href="/#saque" className="text-white hover:text-blue-100 font-medium">Benefícios</Link>
                <Link href="/#faq" className="text-white hover:text-blue-100 font-medium">FAQ</Link>
              </>
            )}
          </nav>

          {/* Ações à direita */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="text-white bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent hidden sm:inline-flex"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button
                    variant="outline"
                    className="w-full text-white bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registar-se
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Sino de notificações */}
                {/* <NotificationBell /> */}

                {profileImage && (
                  <Image
                    src={profileImage}
                    alt="Foto de perfil"
                    width={34}
                    height={30}
                    className="rounded-full object-cover w-10 h-10 border-2 border-green-600 shadow-md"
                  />
                )}
                <div className="w-10 h-10 flex justify-center text-white bg-red-200 rounded-full hover:bg-red-300 transition-colors duration-200 relative">
                  <LogoutButton data-action="logout">
                    <span className="cursor-pointer w-full flex justify-center items-center text-xs text-red-500">
                      <LogOut size={18} />
                    </span>
                  </LogoutButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed overflow-auto inset-0 pb-4 z-50 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-b from-indigo-900 to-blue-900 w-4/5 h-full shadow-2xl p-8 space-y-8">
            <div className="flex flex-row justify-between items-center border-b border-blue-700 pb-4">
              <Link href="/">
                <Image height={48} width={48} src="/images/uniteclogo.PNG" alt="Unitec" />
              </Link>
              <h2 className="text-white text-lg font-bold ml-2">Unitec</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
                className="p-1 rounded-full hover:bg-blue-800 transition-colors duration-200"
              >
                <X className="w-7 h-7 text-blue-200" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 text-base pb-4 font-medium">
              {!isAuthenticated ? (
                <>
                  <Link href="/#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Como Funciona</Link>
                  <Link href="/#cursos" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Sobre Produtos</Link>
                  <Link href="/#mentorias" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Mentorias</Link>
                  <Link href="/#saque" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Benefícios</Link>
                  <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">FAQ</Link>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="bg-white/10 text-white hover:bg-white/20 rounded-lg py-3 px-4 text-center mt-4">Entrar</Link>
                  <Link href="/registro" onClick={() => setMobileMenuOpen(false)} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-3 px-4 text-center">Registrar-se</Link>
                </>
              ) : (
                <>
                  <Link href="/formador/painel" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2 border-b border-blue-800/50 flex items-center gap-2"><LayoutDashboard size={18} /> Painel</Link>
                  <Link href="/formador/cursos" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2 border-b border-blue-800/50 flex items-center gap-2"><BookOpen size={18} /> Meus Cursos</Link>
                  <Link href="/formador/ebooks" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2 border-b border-blue-800/50 flex items-center gap-2"><BookCopy size={18} /> Meus Ebooks</Link>
                  <Link href="/formador/ganhos" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2 border-b border-blue-800/50 flex items-center gap-2"><Wallet size={18} /> Meus Ganhos</Link>
                  <Link href="/formador/perfil" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2 border-b border-blue-800/50 flex items-center gap-2"><User2 size={18} /> Meu Perfil</Link>
                  <Link href="/#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Como Funciona</Link>
                  <Link href="/#cursos" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Sobre Produtos</Link>
                  <Link href="/#mentorias" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Mentorias</Link>
                  <Link href="/#saque" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">Benefícios</Link>
                  <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white py-2">FAQ</Link>
                  <button className="text-red-300 bg-white hover:bg-red-200 rounded-lg w-full hover:text-red-100 py-2 border-t border-blue-800/50 mt-4 flex items-center gap-2">
                    <LogoutButton data-action="logout">
                      <span className="cursor-pointer w-full flex justify-center items-center text-xs text-red-500">
                        <LogOut size={18} /> Sair
                      </span>
                    </LogoutButton>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
