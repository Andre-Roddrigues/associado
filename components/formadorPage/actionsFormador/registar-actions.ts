// app/actions/registerInstructor.ts
'use server';

import { routes } from "@/config/routes";

interface Payload {
  nomeCompleto: string;
  email: string;      // <- grafia igual à exigida pelo backend
  contacto: string;
  senha: string;
}

/** Envia dados para o endpoint de cadastro de instrutor */
export async function registerInstructor(payload: Payload) {
  const res = await fetch(routes.registarinstrutor2, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Falha no registro');
  }

  return res.json(); // backend deve retornar algo como { success: true, ... }
}
