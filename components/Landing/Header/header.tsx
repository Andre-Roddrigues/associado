"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import Link from 'next/link'
export function Header() {

  const nav = {
    how: "Como Funciona",
    courses: "Cursos",
    mentorships: "Mentorias",
    withdraw: "Saque",
    login: "Entrar",
    faq: "FAQ",
  };

  return (
    <header className="sticky top-0 bottom-0 z-50 w-full bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg backdrop-blur-sm bg-opacity-90 border-b border-blue-800">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">Associados</h1>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          <a 
            href="#como-funciona" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.how}
          </a>
          <a 
            href="#cursos" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.courses}
          </a>
          <a 
            href="#mentorias" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.mentorships}
          </a>
          <a 
            href="#saque" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.withdraw}
          </a>
          <Link
            href="/faq" 
            className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
          >
            {nav.faq}
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login">
          <Button 
            variant="outline" 
            className="text-white hover:text-white bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-transparent hover:border-transparent shadow-md hover:shadow-lg transition-all duration-200 hidden sm:inline-flex"
          >
            {nav.login}
          </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}