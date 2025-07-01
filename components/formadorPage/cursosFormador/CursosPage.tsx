"use client";

import { useEffect, useState } from "react";
import PaginatedTable from "../ui/PaginatedTable";
import { Plus, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalNovoCurso from "./ModalNovoCurso"; // você precisa ter este componente criado
import ModalAdicionarMaterial from "./ModalAdicionarMaterial"; // novo modal para vídeos

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

export default function TabelaCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [openNovoCurso, setOpenNovoCurso] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [openModalVideo, setOpenModalVideo] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("/api/cursos", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erro ao buscar cursos");

        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchCursos();
  }, []);

  const filteredCursos = cursos.filter((curso) => {
    const nome = curso.nomeDoCurso || "";
    const matchNome = nome.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchStatus =
      selectedStatus === "Todos" ||
      (selectedStatus === "Aprovado" && curso.estado) ||
      (selectedStatus === "Rejeitado" && !curso.estado);
  
    return matchNome && matchStatus;
  });
  

  const formatarMetical = (valor: number | string) => {
    const numero = typeof valor === "string" ? parseFloat(valor) : valor;
    return numero.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });
  };

  const renderStatus = (estado: boolean) => {
    const label = estado ? "Aprovado" : "Rejeitado";
    const bg = estado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

    return (
      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${bg}`}>
        {label}
      </span>
    );
  };

  const tabs = ["Todos", "Aprovado", "Rejeitado"];

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl text-gray-700 font-bold mb-4">
        Meus <span className="text-primary">Cursos</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Pesquisar curso..."
          className="border rounded px-3 py-2 w-full sm:w-72 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          className="flex gap-2 items-center bg-primary text-primary-foreground py-2 px-4 w-full sm:w-auto"
          onClick={() => setOpenNovoCurso(true)}
        >
          <Plus size={18} /> Novo Curso
        </Button>

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition 
              ${selectedStatus === tab
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <PaginatedTable
          data={filteredCursos}
          headers={[
            { key: "nomeDoCurso", label: "Curso", render: (item) => <span className="font-medium">{item.nomeDoCurso}</span> },
            { key: "modalidade", label: "Modalidade" },
            { key: "duracao", label: "Duração" },
            {
              key: "preco",
              label: "Preço",
              render: (item) => (
                <span className="font-semibold px-3 py-1 rounded-full text-sm sm:text-sm bg-green-100 text-green-700">
                  {formatarMetical(item.preco)}
                </span>
              ),
            },
            {
              key: "objectivoDoCurso",
              label: "Objetivo",
              render: (item) => (
                <span className="truncate max-w-[200px] block">{item.objectivoDoCurso}</span>
              ),
            },
            {
              key: "estado",
              label: "Status",
              render: (item) => renderStatus(item.estado),
            },
            {
              key: "video",
              label: "Ações",
              render: (item: Curso) => (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-xs"
                  onClick={() => {
                    setCursoSelecionado(item);
                    setOpenModalVideo(true);
                  }}
                >
                  <VideoIcon size={14} /> Adicionar Material
                </Button>
              ),
            },
          ]}
        />
      </div>

      {/* Modal de Novo Curso */}
      {openNovoCurso && (
        <ModalNovoCurso
          onClose={() => setOpenNovoCurso(false)}
          onSubmit={(novoCurso) => {
            setCursos((prev) => [...prev, novoCurso]);
            setOpenNovoCurso(false);
          }}
        />
      )}

      {/* Modal de Adicionar Material */}
      {openModalVideo && cursoSelecionado && (
        <ModalAdicionarMaterial
          idCurso={cursoSelecionado}
          onClose={() => {
            setCursoSelecionado(null);
            setOpenModalVideo(false);
          }}
          onSubmit={(videos: Video[]) => {
            setCursos((prevCursos) =>
              prevCursos.map((curso) =>
                curso.id === cursoSelecionado.id
                  ? { ...curso, video: [...curso.video, ...videos] }
                  : curso
              )
            );
            setOpenModalVideo(false);
          }}
        />
      )}
    </div>
  );
}
