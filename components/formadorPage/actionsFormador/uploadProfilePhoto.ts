// app/actions/uploadProfilePhoto.ts
'use server';

import { routes } from '@/config/routes';
import { cookies } from 'next/headers';

export async function uploadProfilePhoto(file: File) {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const formData = new FormData();
  formData.append('photo', file); // 🔑 deve ser exatamente "photo"

  const res = await fetch(routes.addphoto, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // NÃO defina Content‑Type: o fetch cuidará do boundary
    },
    body: formData,
    cache: 'no-store',
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Erro ao atualizar foto: ${errText}`);
  }

  return res.json(); // resposta do backend (ex.: { url: '...' })
}
