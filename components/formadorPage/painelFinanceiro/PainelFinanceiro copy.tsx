"use client";

import { useEffect, useState, useMemo } from "react";
import { getCursos } from "@/components/Cursos/actions";
import PaginatedTable from "../ui/PaginatedTable";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { ArrowUp, AlertCircle, DollarSign, Users, Wallet } from "lucide-react";
export default function PainelFormador() {
  const [cursos, setCursos] = useState<any[]>([]);
  
  useEffect(() => {
    async function fetchCursos() {
      const data = await getCursos();
      setCursos(data);
    }
    fetchCursos();
  }, []);

  const totalArrecadado = useMemo(() => {
    return cursos.reduce((total, curso) => {
      const inscritos = curso.CursoRegistados?.length || 0;
      return total + (inscritos * (parseFloat(curso.valor) || 0));
    }, 0);
  }, [cursos]);

  const totalAlunos = useMemo(() => {
    return cursos.reduce((total, curso) => total + (curso.CursoRegistados?.length || 0), 0);
  }, [cursos]);

  const registros = useMemo(() => {
    const lista: any[] = [];
    cursos.forEach((curso) => {
      curso.CursoRegistados?.forEach((inscricao: any) => {
        lista.push({
          aluno: inscricao.aluno?.nome || "Desconhecido",
          email: inscricao.aluno?.email || "-",
          curso: curso.nome,
          valor: parseFloat(curso.valor) || 0,
          dataCompra: inscricao.dataCompra || "-",
        });
      });
    });
    return lista;
  }, [cursos]);

  const vendasPorCurso = cursos.map((curso) => ({
    nome: curso.nome,
    total: (curso.CursoRegistados?.length || 0) * (parseFloat(curso.valor) || 0),
  }));

  const handleSaque = () => {
    alert("Solicitação de saque enviada!");
  };

  const formatarMetical = (valor: number) => {
    return valor.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });
  };
  const cards = [
    {
      title: "Total Arrecadado",
      value: formatarMetical(totalArrecadado),
      icon: <DollarSign className="w-6 h-6 text-white" />,
      iconBg: "bg-green-500",
      change: { direction: "up", value: "+12% este mês" },
    },
    {
      title: "Total de Alunos",
      value: totalAlunos,
      icon: <Users className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-500",
      change: { direction: "up", value: "+8% este mês" },
    },
    {
      title: "Saldo Disponível",
      value: formatarMetical(totalArrecadado),
      icon: <Wallet className="w-6 h-6 text-white" />,
      iconBg: "bg-yellow-500",
      change: { direction: "warning", value: "Aguardando saque" },
    },
  ];
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      {/* Cabeçalho */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel Financeiro</h2>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${card.iconBg}`}>
                {card.icon}
              </div>
              <div className="ml-4 flex flex-col">
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold break-words max-w-[150px] truncate">
                  {card.value}
                </p>
                <p
                  className={`text-xs flex items-center ${
                    card.change.direction === "up"
                      ? "text-green-500"
                      : card.change.direction === "warning"
                      ? "text-orange-500"
                      : "text-gray-500"
                  }`}
                >
                  {card.change.direction === "up" && (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  )}
                  {card.change.direction === "warning" && (
                    <AlertCircle className="w-4 h-4 mr-1" />
                  )}
                  {card.change.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-10 border">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Vendas por Curso</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={vendasPorCurso} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip formatter={(v: any) => formatarMetical(v)} />
          <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>

      

      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex justify-between mb-4 items-center ">
        <h3 className="text-lg font-semibold text-gray-700">Histórico de Compras</h3>
        <Button onClick={handleSaque} className="bg-primary  text-white px-6 py-2 rounded">
          Solicitar Saque
        </Button>
      </div>
        <PaginatedTable
            data={registros}
            headers={[
              { 
                key: "aluno", 
                label: "Aluno",
                render: (item) => <span className="font-medium text-gray-800">{item.aluno}</span>,
              },
              { 
                key: "email", 
                label: "Email",
                render: (item) => <span className="text-gray-600">{item.email}</span>,
              },
              { 
                key: "curso", 
                label: "Curso",
                render: (item) => (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                    {item.curso}
                  </span>
                ),
              },
              {
                key: "valor",
                label: "Valor",
                render: (item) => (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    {formatarMetical(item.valor)}
                  </span>
                ),
              },
              { 
                key: "dataCompra", 
                label: "Data",
                render: (item) => (
                  <span className="text-sm text-gray-600">{item.dataCompra}</span>
                ),
              },
            ]}
          />

      </div>
    </div>
  );
}
