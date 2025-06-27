'use client';

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoutButton } from "../LogoutButton";
import { getAlunoById } from "../Cursos/actions";
import { logout, logoutClient } from "@/app/(auth)/login/auth-actions";
import axios from "axios";

interface props{
  user : any;
  status: string;
}
export default function PerfilUser({status, user}: props) {
 
  const pathname = usePathname();
  const nome = user?.nome;
  const apelido =user?.apelido;
  const alunoId =user?.id;
  const [imageUrl, setImageUrl] = useState<string>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  function criarSiglas(nome: string, apelido: string): string {
    if (!nome || !apelido) return "";
    const inicialNome = nome.charAt(0).toUpperCase();
    const inicialApelido = apelido.charAt(0).toUpperCase();
    return inicialNome + inicialApelido;
  }

  useEffect(() => {
    const fetchAlunoData = async () => {
      if (status === "authenticated" && alunoId) {
        const token = user?.accessToken;
        try {
          const alunoData = await getAlunoById(Number(alunoId));
          if (alunoData?.FotoAlunos && alunoData.FotoAlunos.length > 0) {
            setImageUrl(alunoData.FotoAlunos[0].url);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do aluno:", error);
        }
      }
    };
    
    fetchAlunoData();
  }, [status, alunoId]);

  const siglas = criarSiglas(nome!, apelido!);

  const handleToggleDropdown = () => {
    if (pathname !== "/user/perfil") {
      setDropdownOpen(!dropdownOpen);
    }
  };

 

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Verifica se o clique foi no botão "Sair"
      if (target.dataset.action === "logout")  return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { 
        setDropdownOpen(false); // Fecha o dropdown apenas se o clique for fora
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
              <Link
                href="/user/perfil"
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Meu Perfil
              </Link>
            </li>
            <li>
              <Link
                href="/user/cursos"
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Meus Cursos
              </Link>
            </li>
            <li >
              <LogoutButton data-action="logout">
                <span className="cursor-pointer block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                  Sair
                </span>       
              </LogoutButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

