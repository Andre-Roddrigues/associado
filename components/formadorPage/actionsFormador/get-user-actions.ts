"use server";

import { routes } from "@/config/routes";
import { cookies } from "next/headers";

export interface InstructorResponse {
  id: number;
  nomeCompleto: string;
  email: string;
  contacto: number | string;
  estado: boolean;
  createdAt: string;
  updatedAt: string;
  photoPerfil?: {
    url: string;
    id: number;
    fileName: string;
    originalName: string;
    idInstructor: number;
    createdAt: string;
    updatedAt: string;
  };
  bank?: {
    id: number;
    fullName: string;
    bankName: string;
    bankNumber: string;
    nib: string | null;
    idInstructor: number;
    createdAt: string;
    updatedAt: string;
  };
  carteira?: {
    id: number;
    fullName: string;
    wallet: string;
    phoneNumber: string;
    idInstructor: number;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getInstructorData(): Promise<InstructorResponse> {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }

  const res = await fetch(routes.dadosinstrutor, {
    method: "GET",
    
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    cache: "no-store",       
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar perfil (${res.status})`);
  }

  return res.json();
}
