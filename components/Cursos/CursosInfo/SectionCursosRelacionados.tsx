import React from 'react';
import { getCursos } from '../actions';
import CursosList from '../CursosList';

interface Curso {
  id: string;
  categoria?: string;
}

interface CursosProps {
  categoria: string;
  cursoClicado: string; // Passar o curso clicado
}

async function SectionCursosRelacionados({ categoria, cursoClicado }: CursosProps) {
  const cursos = await getCursos();

  

  const cursosRelacionados = cursos.filter((curso: Curso) => {
    const cursoCategoria = curso.categoria ? curso.categoria.trim().toLowerCase() : '';
    
    return (
      cursoCategoria === categoria.trim().toLowerCase() && curso.id !== cursoClicado
    );
  });

  return (
    <section className="py-5">
      <h2 className="text-2xl font-bold tracking-wide py-8">
        Cursos <span className="text-primary">Relacionados</span>
      </h2>
      <CursosList cursos={cursosRelacionados.slice(0, 4)} />
    </section>
  );
}

export default SectionCursosRelacionados;
