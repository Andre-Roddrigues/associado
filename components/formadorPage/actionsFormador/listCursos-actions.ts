'use server';

import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';

export interface Video {
  id: number;
  url: string;
  fileName: string;
  originalName: string;
  uri: string;
  idInstrutor: number;
  idCourse: number;
  listNumber: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Curso {
  id: number;
  nomeDoCurso: string;
  IdCategoria: number;
  objectivoDoCurso: string;
  descricaoDoCurso: string;
  programaDocurso: string;
  preco: number;
  modalidade: string;
  duracao: string;
  idInstrutor: number;
  estado: boolean;
  maxQnt: number | null;
  createdAt: string;
  updatedAt: string;
  video: Video[];
}

export async function getCursosDoInstrutor(): Promise<Curso[] | null> {
  try {
    // Obtém o token do cookie
    const token = cookies().get('auth_token')?.value;
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const res = await fetch(`https://backend.unite.ac.mz/listcourseinstructor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar cursos: ${res.statusText}`);
    }

    const data: Curso[] = await res.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar cursos do instrutor:', error);
    return null;
  }
}