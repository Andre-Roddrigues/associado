import React from "react";
import { Book, Users, DollarSign, FileText } from "lucide-react";
import CardsFormador from "@/components/formadorPage/cardsFormador/cardsFormador";
import TabelaEbooks from "@/components/formadorPage/ebookTable/TabelaEbooks";
import TabelaCursos from "@/components/formadorPage/cursosTable/TabelaCursos";

export default function FormadorDashboard() {
  const formador = {
    nome: "João Silva",
    biografia: "Formador especialista em desenvolvimento web e mobile.",
    alunos: 450,
    vendasCursos: 1500.50,
    vendasEbooks: 300.75,
    cursos: [],
    ebooks: [],
  };

  const cards = [
    {
      title: "Total Alunos",
      value: "450",
      icon: <Users className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-500",
    },
    {
      title: "Vendas Cursos",
      value: "15000Mzn",
      icon: <DollarSign className="w-6 h-6 text-white" />,
      iconBg: "bg-green-500",
    },
    {
      title: "Vendas Ebooks",
      value: "300",
      icon: <Book className="w-6 h-6 text-white" />,
      iconBg: "bg-purple-500",
    },
    {
      title: "Ebooks Vendidos",
      value: "120",
      icon: <FileText className="w-6 h-6 text-white" />,
      iconBg: "bg-yellow-500",
    },
  ] as const;

  return (
    <div className="flex p-8">
      <main className="flex-1 bg-white rounded-lg min-h-screen p-8">
        <h1 className="text-xl text-gray-600 font-bold mb-8">Meu <span className="text-primary">Painel</span></h1>
        <div className="gap-6 mb-10">
          <CardsFormador cards={cards} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="">
          <TabelaCursos/>
          </div>
          <div className="">
          <TabelaEbooks />
          </div>
        </div>
      </main>
    </div>
  );
}
