"use server";

import { cookies } from "next/headers";

interface InstructorResponse {
  id: number;
  nomeCompleto: string;
  email: string;
  contacto: number | string;
  photoPerfil?: {
    url: string;
  };
  // adicione outros campos que quiser aproveitar
}
export async function getInstructorData(): Promise<InstructorResponse> {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }

  const res = await fetch("https://backend.unitec.ac.mz/dadosinstrutor", {
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
