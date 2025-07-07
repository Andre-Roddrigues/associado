"use client";

import { useEffect, useMemo, useState } from "react";
import CursoItem from "./CursosItem";

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number;
  alunos: number;
  status: string;
  imagem: string;
}

export default function ListaCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchCursos() {
      const res = await fetch("/api/cursos");
      const data = await res.json();

      if (Array.isArray(data)) {
        const cursosAdaptados: Curso[] = data.map((cursoApi) => ({
          id: cursoApi.id,
          titulo: cursoApi.nomeDoCurso,
          descricao: cursoApi.descricaoDoCurso || "Sem descrição",
          categoria: `Categoria #${cursoApi.idCategoria}`,
          preco: cursoApi.preco,
          alunos: cursoApi.maxQnt || 0,
          status: cursoApi.estado ? "Ativo" : "Inativo",
          imagem: "/images/HeaderLogo.PNG",
        }));
        setCursos(cursosAdaptados);
      }
    }

    fetchCursos();
  }, []);

  const totalPages = Math.ceil(cursos.length / itemsPerPage);

  const paginatedCursos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return cursos.slice(startIndex, startIndex + itemsPerPage);
  }, [cursos, currentPage]);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-gray-700">Últimos Cursos</h3>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Curso</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Alunos</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCursos.map((curso) => (
              <CursoItem key={curso.id} curso={curso} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Página {currentPage} de {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
