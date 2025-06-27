"use client";
import { useState, useMemo } from "react";
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

export default function TabelaCursos() {
  const [cursos] = useState<Curso[]>([
    {
      id: 1,
      titulo: "Next.js Avançado",
      descricao: "Curso completo de Next.js com APIs e SSR.",
      categoria: "Programação",
      preco: 99.99,
      alunos: 120,
      status: "Ativo",
      imagem: "/images/avatar1.jpg",
    },
    {
      id: 2,
      titulo: "React Completo",
      descricao: "Aprenda React do zero ao avançado.",
      categoria: "Frontend",
      preco: 89.99,
      alunos: 200,
      status: "Ativo",
      imagem: "/images/bolsa.png",
    },
    {
      id: 3,
      titulo: "Node.js Master",
      descricao: "Construa APIs robustas com Node.js.",
      categoria: "Backend",
      preco: 119.99,
      alunos: 0,
      status: "Pendente",
      imagem: "/images/ICON-14.png",
    },
    {
      id: 4,
      titulo: "TypeScript Completo",
      descricao: "Dominando o TypeScript para projetos modernos.",
      categoria: "Programação",
      preco: 79.99,
      alunos: 180,
      status: "Ativo",
      imagem: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      titulo: "Tailwind CSS do Zero",
      descricao: "Construa interfaces modernas com Tailwind CSS.",
      categoria: "Frontend",
      preco: 59.99,
      alunos: 90,
      status: "Ativo",
      imagem: "https://via.placeholder.com/100",
    },
  ]);

  // Paginação
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
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
      {/* <div className="flex justify-between items-center mt-4">
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
      </div> */}
    </div>
  );
}
