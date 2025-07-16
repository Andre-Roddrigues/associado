"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getInstructorData } from "@/components/formadorPage/actionsFormador/get-user-actions";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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

  const handleLogout = async () => {
    if (!window.confirm("Deseja realmente sair?")) return;
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

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
              <Image height={45} width={45} src="/images/uniteclogo.PNG" alt="Unitec PRO" />
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
              <div className="flex items-center gap-3">
                {profileImage && (
                  <Image
                    src={profileImage}
                    alt="Foto de perfil"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white shadow-md"
                  />
                )}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-blue-900/30"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out">
        <div className="bg-gradient-to-b from-indigo-900 to-blue-900 w-4/5 h-full shadow-2xl p-8 space-y-8">
          <div className="flex justify-between items-center border-b border-blue-700 pb-4">
            <Link href="/">
              <Image 
                height={48} 
                width={48} 
                src="/images/uPro.PNG" 
                alt="Unitec PRO" 
                className="filter brightness-0 invert"
              />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              aria-label="Fechar menu"
              className="p-1 rounded-full hover:bg-blue-800 transition-colors duration-200"
            >
              <X className="w-7 h-7 text-blue-200" />
            </button>
          </div>
      
          <nav className="flex flex-col gap-2 text-base font-medium">
            {!isAuthenticated ? (
              <>
                <Link 
                  href="/#como-funciona" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Como Funciona
                </Link>
                <Link 
                  href="/#cursos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Sobre Produtos
                </Link>
                <Link 
                  href="/#mentorias" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Mentorias
                </Link>
                <Link 
                  href="/#saque" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Benefícios 
                </Link>
                <Link 
                  href="/#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  FAQ
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg py-3 px-4 text-center mt-4"
                >
                  Entrar
                </Link>
                <Link 
                  href="/registro" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 rounded-lg py-3 px-4 text-center"
                >
                  Registrar-se
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/formador/painel" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50 flex items-center gap-2"
                >
                  Painel
                </Link>
                <Link 
                  href="/#como-funciona" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Como Funciona
                </Link>
                <Link 
                  href="/#cursos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Sobre Produtos
                </Link>
                <Link 
                  href="/#mentorias" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Mentorias
                </Link>
                <Link 
                  href="/#saque" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  Benefícios 
                </Link>
                <Link 
                  href="/#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors duration-200 py-2 border-b border-blue-800/50"
                >
                  FAQ
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-red-300 hover:text-red-100 transition-colors duration-200 py-2 border-t border-blue-800/50 mt-4 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
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
