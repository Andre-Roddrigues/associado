"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import icon from "/public/images/navT.png"

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      hasScrolled 
        ? "bg-dark-blue-darker/20  backdrop-blur-2xl shadow-xl"
        : "bg-dark-blue-darker shadow-4xl"
    }`}>
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* <h1 className="text-2xl font-bold text-white">Unitec PRO</h1> */}
        <Image height={45} width={45} src={icon} alt="" />
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          {!isAuthenticated ? (
            <>
              <Link 
                href="#como-funciona" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.how}
              </Link>
              <Link 
                href="#cursos" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.courses}
              </Link>
              <Link 
                href="#mentorias" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.mentorships}
              </Link>
              <Link 
                href="#saque" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.withdraw}
              </Link>
              <Link
                href="#faq" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.faq}
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.home}
              </Link>
              <Link 
                href="/formador/painel" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.painel}
              </Link>
              <Link
                href="#faq" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium"
              >
                {nav.faq}
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <Link href="/login">
              <Button 
                variant="outline" 
                className="text-white hover:text-white bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-transparent hover:border-transparent shadow-md hover:shadow-lg transition-all duration-200 hidden sm:inline-flex"
              >
                {nav.login}
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-blue-900/30 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}