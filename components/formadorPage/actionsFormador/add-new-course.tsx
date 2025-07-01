'use server';

import { cookies } from 'next/headers';

export async function registerCursoInstrutor(data: any) {
  const token = cookies().get('auth_token')?.value;
  if (!token) throw new Error('Token não encontrado.');

  const res = await fetch("https://backend.unitec.ac.mz/api/addnewcourseinstructor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || "Erro ao registrar curso.");
  }

  return result;
}
