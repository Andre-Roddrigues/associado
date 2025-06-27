// components/ProfileDropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { LogoutButton } from "../../LogoutButton";
import { logout } from "@/app/(auth)/login/auth-actions";

interface ProfileDropdownProps {
  user: any;
  status: string;
  imageUrl: string | null;
}

export default function ProfileDropdown({ user, status, imageUrl }: ProfileDropdownProps) {
  const pathname = usePathname();
  const nome = user?.nome;
  const apelido = user?.apelido;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const criarSiglas = (nome: string, apelido: string): string => {
    if (!nome || !apelido) return "";
    return `${nome.charAt(0).toUpperCase()}${apelido.charAt(0).toUpperCase()}`;
  };

  const siglas = criarSiglas(nome, apelido);

  const handleToggleDropdown = () => {
    if (pathname !== "/user/perfil") {
      setDropdownOpen(!dropdownOpen);
    }
  };
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

  return (
    <div className="relative">
      <div
        onClick={handleToggleDropdown}
        className="cursor-pointer text-muted-foreground bg-border p-0.5 py-0 h-[6.3vh] rounded-full flex gap-3 items-center"
      >
        <span className="text-sm pl-3 hidden md:block">Meu Perfil</span>
        <Avatar className="h-[6.3vh] w-[6.3vh]">
          <AvatarImage src={imageUrl || " "} />
          <AvatarFallback>{siglas}</AvatarFallback>
        </Avatar>
      </div>

      {dropdownOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
          <ul className="py-2">
            <li>
              <Link href="/user/perfil" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                Meu Perfil
              </Link>
            </li>
            <li>
              <Link href="/user/cursos" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                Meus Cursos
              </Link>
            </li>
            <li>
            <li>
              <LogoutButton>
              <span className="cursor-pointer block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                  Sair 
                </span>       
                </LogoutButton>
            </li>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
