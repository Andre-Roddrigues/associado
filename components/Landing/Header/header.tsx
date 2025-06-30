"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from 'next/link';

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const nav = {
    how: "Como Funciona",
    home: "Inicio",
    courses: "Cursos",
    mentorships: "Mentorias",
    withdraw: "Saque",
    login: "Entrar",
    logout: "Sair",
    faq: "FAQ",
  };

  const handleLogout = async () => {
    try {
      // Chama a API route para fazer logout
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Recarrega a página para atualizar o estado
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg backdrop-blur-sm bg-opacity-90 border-b border-blue-800">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">Associados</h1>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm">
        {!isAuthenticated ? (
          <>
          <Link 
            href="#como-funciona" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.how}
          </Link>
          <Link 
            href="#cursos" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.courses}
          </Link>
          <Link 
            href="#mentorias" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.mentorships}
          </Link>
          <Link 
            href="#saque" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.withdraw}
          </Link>
          <Link
            href="/faq" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.faq}
          </Link>
          </>
        ):(
          <>
             <Link 
            href="/" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.home}
          </Link>
          </>
        )
      }
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
           <></>
          )}
        </div>
      </div>
    </header>
  );
}