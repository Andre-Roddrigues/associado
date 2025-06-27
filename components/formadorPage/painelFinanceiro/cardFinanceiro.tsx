

import { DollarSign, Users, Wallet, HandCoins } from "lucide-react";

interface Props {
  totalArrecadado: number; // Saldo disponível (vendas - saques)
  totalAlunos: number;
  totalSacado: number; // Novo: Total já sacado
}

export default function CardFinanceiro({ totalArrecadado, totalAlunos, totalSacado }: Props) {
  const formatarMetical = (valor: number) => {
    return valor.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });
  };

  const cards = [
    {
      title: "Total Arrecadado",
      value: formatarMetical(totalArrecadado + totalSacado), // Total bruto vendido (disponível + já sacado)
      icon: <DollarSign className="w-6 h-6 text-white" />,
      iconBg: "bg-green-500",
    },
    {
      title: "Total de Alunos",
      value: totalAlunos,
      icon: <Users className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-500",
    },
    {
      title: "Saldo Disponível",
      value: formatarMetical(totalArrecadado),
      icon: <Wallet className="w-6 h-6 text-white" />,
      iconBg: "bg-yellow-500",
    },
    {
      title: "Total Sacado",
      value: formatarMetical(totalSacado),
      icon: <HandCoins  className="w-6 h-6 text-white" />,
      iconBg: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-3">
            <div className={`p-3 rounded-full ${card.iconBg}`}>
              {card.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-sm font-bold text-muted-foreground break-words max-w-[170px]">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
