"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = {
    how: "Como Funciona",
    home: "Inicio",
    courses: "Cursos",
    mentorships: "Mentorias",
    withdraw: "Saque",
    login: "Entrar",
    logout: "Sair",
    faq: "FAQ",
    painel: "Painel",
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== hasScrolled) {
        setHasScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled 
          ? "bg-dark-blue-darker/20 backdrop-blur-2xl shadow-xl"
          : "bg-dark-blue-darker shadow-4xl"
      }`}>
        <div className="flex justify-between items-center p-4 max-w-full mx-auto">
          <div className="flex justify-evenly items-center gap-4">
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Image height={45} width={45} src="/images/uPro.PNG" alt="Unitec PRO" />
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm">
            {!isAuthenticated ? (
              <>
                <Link href="#como-funciona" className="text-white hover:text-blue-100 font-medium">Como Funciona</Link>
                <Link href="#cursos" className="text-white hover:text-blue-100 font-medium">Cursos</Link>
                <Link href="#mentorias" className="text-white hover:text-blue-100 font-medium">Mentorias</Link>
                <Link href="#saque" className="text-white hover:text-blue-100 font-medium">Saque</Link>
                <Link href="#faq" className="text-white hover:text-blue-100 font-medium">FAQ</Link>
              </>
            ) : (
              <>
                <Link href="/" className="text-white hover:text-blue-100 font-medium">Inicio</Link>
                <Link href="/formador/painel" className="text-white hover:text-blue-100 font-medium">Painel</Link>
                <Link href="#faq" className="text-white hover:text-blue-100 font-medium">FAQ</Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <><Link href="/login">
                <Button
                  variant="outline"
                  className="text-white bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent hidden sm:inline-flex"
                >
                  Entrar
                </Button>
              </Link><Link href="/registro">
                  <Button
                    variant="outline"
                    className="w-full text-white bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registar-se
                  </Button>
                </Link></>
            ) : (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:bg-blue-900/30"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        <div className={`absolute top-0 left-0 h-full w-80 bg-gradient-to-b from-dark-blue-darker to-dark-blue shadow-2xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Image height={40} width={40} src="/images/uPro.PNG" alt="Unitec PRO" className="bg-white rounded-full" />
                <span className="text-white font-bold text-lg">Unitec PRO</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 rounded-full hover:bg-white/10"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col space-y-4">
              {!isAuthenticated ? (
                <>
                  <Link href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Como Funciona</Link>
                  <Link href="#cursos" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Cursos</Link>
                  <Link href="#mentorias" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Mentorias</Link>
                  <Link href="#saque" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Saque</Link>
                  <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">FAQ</Link>
                </>
              ) : (
                <>
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Início</Link>
                  <Link href="/formador/painel" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Painel</Link>
                  <Link href="/formador/cursos" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Meus Cursos</Link>
                  <Link href="/formador/ebooks" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Meus Ebooks</Link>
                  <Link href="/formador/ganhos" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Meus Ganhos</Link>
                  <Link href="/formador/perfil" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">Meu Perfil</Link>
                  <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium">FAQ</Link>
                </>
              )}
            </nav>

            <div className="pt-4 border-t border-white/10">
              {!isAuthenticated ? (
                <>
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="w-full text-white bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent"
                    onClick={() => setMobileMenuOpen(false)}
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
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full text-white hover:bg-red-500/10 border-white/20"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sair
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
