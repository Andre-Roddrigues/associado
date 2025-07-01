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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3VuaXRlYy5hYy5teiIsImF1ZCI6IlVuaXRlYyBBY2FkZW15IEludHJ1dG9yIiwic3ViIjoxMCwiaWRJbnN0cnVjdG9yIjoxMiwiZW1haWwiOiJsYXJpb3R5bGVyNkBnbWFpbC5jb20iLCJpYXQiOjE3NTEyODI2MzV9.I9ZmlB4VWwon7DSVn-RK_10nvft3GkWQVChbMGBUZrk"

    
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