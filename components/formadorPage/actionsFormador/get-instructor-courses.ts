'use server';

import { routes } from '@/config/routes';
import { cookies } from 'next/headers';

export interface CursoInstrutor {
  id: number;
  nomeDoCurso: string;
  idCategoria: number;
  objectivoDoCurso: string;
  descricaoDoCurso: string | null;
  programaDoCurso: string;
  preco: number;
  modalidade: string;
  duracao: string;
  estado: boolean;
  maxQnt: number;
  createdAt: string;
  updatedAt: string;
  video: any[];
  videoCount: number; // ← adicionado
}

interface InstructorApiResponse {
  id: number;
  nomeCompleto: string;
  email: string;
  contacto: number;
  estado: boolean;
  createdAt: string;
  updatedAt: string;
  cursoInstrutors: Omit<CursoInstrutor, 'videoCount'>[];
}

/**
 * Retorna os cursos do instrutor autenticado, cada um com a contagem de vídeos.
 * @param overrideToken (opcional) – use em ambiente local se não houver cookie de auth.
 */
export async function getInstructorCourses(
  overrideToken?: string,
): Promise<CursoInstrutor[]> {
  /* ------------------------------------------------------------------ */
  /* 1. Token do usuário                                                */
  /* ------------------------------------------------------------------ */
  const userToken =
    overrideToken || cookies().get('auth_token')?.value;
  if (!userToken) throw new Error('auth_token não encontrado.');

  /* ------------------------------------------------------------------ */
  /* 2. Token admin (fixo) para consultar endpoint protegido            */
  /* ------------------------------------------------------------------ */
  const tokenAdmin =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  /* ------------------------------------------------------------------ */
  /* 3. Extrai o id (sub) do token do usuário                           */
  /* ------------------------------------------------------------------ */
  const payloadBase64 = userToken.split('.')[1];
  const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
  const { sub } = JSON.parse(payloadJson) as { sub: number };

  /* ------------------------------------------------------------------ */
  /* 4. Chama /instructor com token admin                               */
  /* ------------------------------------------------------------------ */
  const res = await fetch(routes.instructor, {
    headers: { Authorization: `Bearer ${tokenAdmin}` },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Erro ${res.status} ao consultar /instructor`);

  const data: InstructorApiResponse[] = await res.json(); // API retorna array

  /* ------------------------------------------------------------------ */
  /* 5. Encontra o instrutor cujo id == sub                             */
  /* ------------------------------------------------------------------ */
  const instructor = data.find((inst) => inst.id === sub);
  if (!instructor) throw new Error('Instrutor não encontrado.');

  /* ------------------------------------------------------------------ */
  /* 6. Mapeia cursos acrescentando videoCount                          */
  /* ------------------------------------------------------------------ */
  return instructor.cursoInstrutors.map((curso) => ({
    ...curso,
    videoCount: Array.isArray(curso.video) ? curso.video.length : 0,
  }));
}
