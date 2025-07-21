"use client";

import { useEffect, useState } from "react";
import PaginatedTable from "../ui/PaginatedTable";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalNovoEbook from "./ModalNovoEbook";
import ModalLivroNovo from "./ModalLivroNovo";
import ModalLivroUsado from "./ModalLivroUsado";
import ModalDetalhesEbook from "./ModalDetalhesEbook";

export default function TabelaEbooks() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState<"ebook" | "livro-novo" | "livro-usado" | false>(false);
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [ebookSelecionado, setEbookSelecionado] = useState<any | null>(null);

  useEffect(() => {
    async function fetchEbooks() {
      try {
        const res = await fetch("/api/ebook");
        const data = await res.json();
        
        // Transformar dados para o formato usado pela tabela
        const mappedEbooks = data.map((item: any) => ({
          id: item.id,
          nome: item.title,
           categoria: item.categoria || "Sem categoria",
           description: item.description || "Sem categoria",
          autor: item.author,
          valor: item.price,
          format: item.format,
          publishDate: item.publishDate,     
          pages: item.pages,                 
          status: item.statePublisher ? "Aprovado" : "Pendente",
          Imagens: [{ url: "/images/eventos(3).jpg" }],
          EbookRegistados: [],
        }));        
        setEbooks(mappedEbooks);
      } catch (error) {
        console.error("Erro ao buscar ebooks:", error);
      }
    }
  
    fetchEbooks();
  }, []);
  

  const handleNovoEbook = (data: any) => {
    console.log("Novo ebook recebido:", data);
  };

  const filteredEbooks = ebooks.filter((ebook) => {
    const matchName = ebook.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === "Todos" || ebook.status === selectedStatus;
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
      <div className="mb-4 flex flex-row justify-between sm:flex-row items-start sm:items-center gap-4">
        <h2 className="text-lg sm:text-xl text-gray-700 font-bold mb-4">
          Meus <span className="text-primary">Ebooks</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
  <Button
    onClick={() => setOpenModal("livro-novo")}
    className="flex gap-2 items-center bg-gradient-to-br from-amber-600 to-amber-400 hover:from-amber-400 hover:to-amber-600 text-white py-2 px-4"
  >
    <Plus size={18} /> Livro Novo
  </Button>

  <Button
    onClick={() => setOpenModal("ebook")}
    className="flex gap-2 items-center bg-gradient-to-br from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white py-2 px-4"
  >
    <Plus size={18} /> Ebook
  </Button>

  <Button
    onClick={() => setOpenModal("livro-usado")}
    className="flex gap-2 items-center bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white py-2 px-4"
  >
    <Plus size={18} /> Livro Usado
  </Button>

        </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="border rounded px-3 py-2 w-full sm:w-72 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition 
                ${selectedStatus === tab ? "bg-primary text-gray-500" : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"}`}
              onClick={() => setSelectedStatus(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
      <PaginatedTable
        data={filteredEbooks}
        headers={[
        // {
        //   key: "nome",
        //   label: "Ebook",
        //   render: (item) => (
        //     <div className="flex items-center gap-3 min-w-[200px]">
        //       {item.Imagens?.[0]?.url ? (
        //         <Image
        //           src={item.Imagens[0].url}
        //           alt={item.nome}
        //           width={40}
        //           height={40}
        //           className="rounded-full object-cover"
        //         />
        //       ) : (
        //         <div className="w-10 h-10 rounded-full bg-gray-300" />
        //       )}
        //       <span className="font-medium truncate max-w-[150px]">
        //         {item.nome}
        //       </span>
        //     </div>
        //   ),
        // },
        // { key: "categoria", label: "Categoria" },
          { key: "autor", label: "Autor" },
          {
            key: "valor",
            label: "Preço",
            render: (item) => (
              <span className="font-semibold px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-700">
                {formatarMetical(item.valor)}
              </span>
            ),
          },
          // {
          //   key: "publishDate",
          //   label: "Publicado em",
          //   render: (item) => (
          //     <span className="text-sm text-gray-600">
          //       {item.publishDate ? new Date(item.publishDate).toLocaleDateString("pt-PT") : "—"}
          //     </span>
          //   ),
          // },
          {
            key: "pages",
            label: "Páginas",
            render: (item) => (
              <span className="text-sm text-gray-700">{item.pages || "N/A"}</span>
            ),
          },
          {
            key: "EbookRegistados",
            label: "Leitores",
            render: (item) => (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
                {item.EbookRegistados ? item.EbookRegistados.length : 0}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (item) => renderStatus(item.status),
          },
          {
            key: "format",
            label: "Formato",
            render: (item) => (
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                {item.format}
              </span>
            ),
          },
          {
            key: "detalhes",
            label: "Detalhes",
            render: (item) => (
              <Button
                variant="outline"
                className="text-xs bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white"
                onClick={() => setEbookSelecionado(item)}
              >
                Ver mais
              </Button>
            ),
          }          
        ]}
      />

      </div>
          <div className="p-4">
      {openModal === "ebook" && (
        <ModalNovoEbook onClose={() => setOpenModal(false)} onSubmit={handleNovoEbook} />
      )}

      {openModal === "livro-novo" && (
        <ModalLivroNovo onClose={() => setOpenModal(false)} onSubmit={handleNovoEbook} />
      )}

      {openModal === "livro-usado" && (
        <ModalLivroUsado onClose={() => setOpenModal(false)} onSubmit={handleNovoEbook} />
      )}
          </div>
          {ebookSelecionado && (
  <ModalDetalhesEbook
    ebook={ebookSelecionado}
    onClose={() => setEbookSelecionado(null)}
  />
)}

    </div>
  );
}
