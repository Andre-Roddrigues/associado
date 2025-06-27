"use client";
import PaginatedTable from "../ui/PaginatedTable";

interface Saque {
  nome: string;
  contacto: string;
  banco: string;
  nib?: string;
  data: string;
  valor: number;
  status: string;  // <-- Adicionamos o status aqui
}

interface Props {
  saques: Saque[];
}

export default function TabelaHistoricoSaques({ saques }: Props) {
  const formatarMetical = (valor: number) => {
    return valor.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });
  };

  const headers = [
    { key: "nome" as const, label: "Beneficiário" },
    { key: "banco" as const, label: "Banco" },
    { key: "contacto" as const, label: "Contacto / Conta" },
    { key: "nib" as const, label: "NIB" },
    { key: "valor" as const, label: "Valor", render: (item: Saque) => formatarMetical(item.valor) },
    { key: "data" as const, label: "Data" },
    { 
      key: "status" as const, 
      label: "Status", 
      render: (item: Saque) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold
          ${item.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
          {item.status}
        </span>
      ) 
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Histórico de Saques</h3>
      <PaginatedTable data={saques} headers={headers} />
    </div>
  );
}
