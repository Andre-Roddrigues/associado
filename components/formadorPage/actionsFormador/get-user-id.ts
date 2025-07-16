// app/actions/get-user-id.ts
"use server";

import { cookies } from "next/headers";

export async function getUserId(): Promise<number> {
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
    throw new Error(`Erro ao buscar ID do usuário (${res.status})`);
  }

  const data = await res.json();
  return data.id; // ou data.user.id se for aninhado
}
