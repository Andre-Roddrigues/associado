"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
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
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstructorData();
        if (data?.photoPerfil?.url) {
          setProfileImage(data.photoPerfil.url);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do instrutor:", error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    if (!window.confirm("Deseja realmente sair?")) return;
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          hasScrolled
            ? "bg-dark-blue-darker/20 backdrop-blur-2xl shadow-xl"
            : "bg-dark-blue-darker shadow-4xl"
        }`}
      >
        <div className="flex justify-between items-center p-4 max-w-full mx-auto">
          <div className="flex justify-evenly items-center gap-4">
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
           <Link href="/"> <Image height={45} width={45} src="/images/uPro.PNG" alt="Unitec PRO" /></Link>
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
                <Link href="/formador/painel" className="text-white hover:text-blue-100 font-medium">Painel</Link>
                <Link href="#faq" className="text-white hover:text-blue-100 font-medium">FAQ</Link>
              </>
            )}
          </nav>

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
    </>
  );
}
