"use client";

import { useEffect, useState } from "react";
import { getCursos } from "@/components/Cursos/actions";
import PaginatedTable from "../ui/PaginatedTable";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalNovoCurso from "./ModalNovoCurso";

export default function TabelaCursos() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  useEffect(() => {
    async function fetchCursos() {
      const data = await getCursos();
      setCursos(data);
    }
    fetchCursos();
  }, []);

  const handleNovoCurso = (data: any) => {
    console.log("Novo curso recebido:", data);
    setCursos((prev) => [...prev, data]); // Atualiza lista local
  };

  const filteredCursos = cursos.filter((curso) => {
    const matchName = curso.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === "Todos" || curso.status === selectedStatus;
    return matchName && matchStatus;
  });

  const formatarMetical = (valor: number | string) => {
    const numero = typeof valor === "string" ? parseFloat(valor) : valor;
    return numero.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });
  };

  const renderStatus = (status: string) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Aprovado":
        bgColor = "bg-green-100";
        textColor = "text-green-700";
        break;
      case "Pendente":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-700";
        break;
      case "Rejeitado":
        bgColor = "bg-red-100";
        textColor = "text-red-700";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-700";
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  const tabs = ["Todos", "Aprovado", "Pendente", "Rejeitado"];

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl text-gray-700 font-bold mb-4">
          Meus <span className="text-primary">Cursos</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="border rounded px-3 py-2 w-full sm:w-72 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            onClick={() => setOpenModal(true)}
            className="flex gap-2 items-center bg-primary text-primary-foreground py-2 px-4 w-full sm:w-auto"
          >
            <Plus size={18} /> Adicionar Curso
          </Button>

          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition 
                ${selectedStatus === tab ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"}`}
              onClick={() => setSelectedStatus(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <PaginatedTable
          data={filteredCursos}
          headers={[
            {
              key: "nome",
              label: "Curso",
              render: (item) => (
                <div className="flex items-center gap-3 min-w-[200px]">
                  {item.Imagens?.[0]?.url ? (
                    <Image src={item.Imagens[0].url} alt={item.nome} width={40} height={40} className="rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}
                  <span className="font-medium text-sm truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">{item.nome}</span>
                </div>
              ),
            },
            { key: "categoria", label: "Categoria" },
            { key: "tipocurso", label: "Tipo" },
            {
              key: "valor",
              label: "Preço",
              render: (item) => (
                <span className="font-semibold px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-700">
                  {formatarMetical(item.valor)}
                </span>
              ),
            },
            {
              key: "CursoRegistados",
              label: "Inscritos",
              render: (item) => (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
                  {item.CursoRegistados ? item.CursoRegistados.length : 0}
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (item) => renderStatus(item.status),
            },
          ]}
        />
      </div>

      {openModal && (
        <ModalNovoCurso
          onClose={() => setOpenModal(false)}
          onSubmit={handleNovoCurso}
        />
      )}
    </div>
  );
}
