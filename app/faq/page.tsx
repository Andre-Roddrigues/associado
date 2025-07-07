'use client';

import { CursoInstrutor, getInstructorCourses } from '@/components/formadorPage/actionsFormador/get-instructor-courses';
import React, { useEffect, useState } from 'react';

const CursosInstrutor = () => {
  const [cursos, setCursos] = useState<CursoInstrutor[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const lista = await getInstructorCourses(); // ← usa token do cookie
        setCursos(lista);
      } catch (e: any) {
        setErro(e.message || 'Falhou ao carregar cursos');
      }
    };
    fetchCursos();
  }, []);

  if (erro) return <p className="text-red-500 text-center">{erro}</p>;
  if (!cursos) return <p className="text-gray-500 text-center">Carregando cursos…</p>;
  if (cursos.length === 0) return <p className="text-gray-500 text-center">Nenhum curso cadastrado.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <div key={curso.id} className="bg-white rounded-xl shadow border p-5">
          <h3 className="text-lg font-bold text-blue-700">{curso.nomeDoCurso}</h3>
          <p className="text-sm text-gray-600 mb-2">{curso.objectivoDoCurso}</p>
          <p className="text-gray-800 text-sm">{curso.descricaoDoCurso || 'Sem descrição.'}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>{curso.modalidade}</span>
            <span>{curso.duracao}</span>
          </div>
          <div className="mt-2 text-right font-semibold text-emerald-600">
            {curso.preco.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CursosInstrutor;
