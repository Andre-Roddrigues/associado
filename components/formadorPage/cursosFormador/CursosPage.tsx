"use client";

import { useEffect, useState } from "react";
import { Plus, VideoIcon, Eye, Search, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalNovoCurso from "./ModalNovoCurso";
import ModalAdicionarMaterial from "./ModalAdicionarMaterial";
import ModalVerCurso from "./ModalVerCurso";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [openModalVerCurso, setOpenModalVerCurso] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cursos", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erro ao buscar cursos");

        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const filteredCursos = cursos.filter((curso) => {
    const matchNome = curso.nomeDoCurso.toLowerCase().includes(searchTerm.toLowerCase());
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
    const bg = estado ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800";
    return (
      <span className={` px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium ${bg} flex items-center gap-1`}>
        <span className={` ${estado ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
        {label}
      </span>
    );
  };

  const tabs = ["Todos", "Aprovado", "Rejeitado"];

  return (
    <div className="bg-white rounded-xl shadow-sm  border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Meus Cursos</h2>
            <p className="text-sm text-gray-500 mt-1">Gerencie todos os seus cursos em um só lugar</p>
          </div>
          
          <Button
            className="flex gap-2 bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 items-center py-2 px-4 shadow-sm"
            onClick={() => setOpenNovoCurso(true)}
          >
            <Plus size={18} /> Novo Curso
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar curso..."
              className="pl-10 pr-4 py-2.5 w-full rounded-lg border text-gray-600 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatus(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedStatus === tab
                    ? "bg-primary text-dark-blue shadow-lg"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-gray-100 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : (
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-gray-50">
                  <TableHead className="py-3.5 pl-6 text-gray-600 font-medium">Curso</TableHead>
                  <TableHead className="hidden lg:table-cell py-3.5 text-gray-600 font-medium">Modalidade</TableHead>
                  <TableHead className="py-3.5 text-gray-600 font-medium">Preço</TableHead>
                  <TableHead className="py-3.5 text-gray-600 font-medium">Status</TableHead>
                  <TableHead className="py-3.5 pr-6 text-gray-600 font-medium text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCursos.length > 0 ? (
                  filteredCursos.map((item) => (
                    <TableRow key={item.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <TableCell className="py-4 pl-6 font-medium text-gray-500">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.nomeDoCurso}</span>
                          <span className="text-xs text-gray-500 mt-1">{item.duracao}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell py-4 text-gray-600">
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {item.modalidade}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 text-sm text-emerald-300">
                        {formatarMetical(item.preco)}
                      </TableCell>
                      <TableCell className="py-2">
                        {renderStatus(item.estado)}
                      </TableCell>
                      <TableCell className="py-4 pr-6">
                        <div className="flex justify-end gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" className="h-8 bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white">
                                Ações <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 bg-gray-50">
                              <DropdownMenuItem 
                                onClick={() => {
                                  setCursoSelecionado(item);
                                  setOpenModalVideo(true);
                                }}
                                className="flex bg-blue-500 rounded-lg text-white items-center gap-2"
                              >
                                <VideoIcon size={14} /> Material
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setCursoSelecionado(item);
                                  setOpenModalVerCurso(true);
                                }}
                                className="flex bg-emerald-500 mt-2 rounded-lg text-white items-center gap-2"
                              >
                                <Eye size={14} /> Ver Curso
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                      Nenhum curso encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {openNovoCurso && (
        <ModalNovoCurso
          onClose={() => setOpenNovoCurso(false)}
          onSubmit={(novoCurso) => {
            setCursos((prev) => [...prev, novoCurso]);
            setOpenNovoCurso(false);
          }}
        />
      )}

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

      {openModalVerCurso && cursoSelecionado && (
        <ModalVerCurso
          curso={cursoSelecionado}
          onClose={() => {
            setCursoSelecionado(null);
            setOpenModalVerCurso(false);
          }}
        />
      )}
    </div>
  );
}