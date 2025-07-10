"use client";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";

interface Props {
  vendasPorCurso: { nome: string; total: number }[];
  alunos: { nome: string; total: number }[];
}

export default function GraficoFinanceiro({ vendasPorCurso, alunos }: Props) {
  const formatarMetical = (valor: number) => {
    return valor.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10 border">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Vendas por Curso</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={vendasPorCurso} barSize={30} barGap={15}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip formatter={(v: any) => formatarMetical(v)} />
          <Legend />
          <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
