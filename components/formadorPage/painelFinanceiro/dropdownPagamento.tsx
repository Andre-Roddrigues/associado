"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getInstructorData } from "../actionsFormador/get-user-actions";

const bancos = [
  {
    label: "Millennium BCP",
    value: "millennium",
    logo: { src: "/logos/millennium.png" },
  },
  {
    label: "BIM",
    value: "bim",
    logo: { src: "/logos/bim.png" },
  },
  {
    label: "Standard Bank",
    value: "standard",
    logo: { src: "/logos/standard.png" },
  },
  {
    label: "BCI",
    value: "bci",
    logo: { src: "/logos/bci.png" },
  },
];

export default function PagamentoForm() {
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
    banco: "",
    descricao: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInstructorData();

        const bancoSelecionado = data.bank?.bankName?.toLowerCase() || "";

        const descricao = `
Banco: ${data.bank?.bankName ?? "N/A"}
Nº Conta: ${data.bank?.bankNumber ?? "N/A"}
Carteira: ${data.carteira?.wallet ?? "N/A"}
Telemóvel: ${data.carteira?.phoneNumber ?? "N/A"}
        `.trim();

        setFormData({
          nome: data.nomeCompleto || "",
          valor: "",
          banco: bancoSelecionado,
          descricao,
        });
      } catch (error) {
        console.error("Erro ao carregar dados do instrutor:", error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Enviar os dados para o backend aqui
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold">Formulário de Pagamento</h2>

      <div className="space-y-2">
        <label className="block font-medium">Nome</label>
        <Input
          type="text"
          value={formData.nome}
          onChange={(e) =>
            setFormData({ ...formData, nome: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Valor</label>
        <Input
          type="number"
          value={formData.valor}
          onChange={(e) =>
            setFormData({ ...formData, valor: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Escolha o Banco</label>
        <div className="grid grid-cols-2 gap-4">
          {bancos.map((banco) => (
            <label
              key={banco.value}
              className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-all
              ${
                formData.banco === banco.value
                  ? "border-green-600 ring-2 ring-green-400 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              <input
                type="radio"
                name="banco"
                value={banco.value}
                checked={formData.banco === banco.value}
                onChange={() =>
                  setFormData({ ...formData, banco: banco.value })
                }
                className="sr-only"
              />
              <div className="w-10 h-10">
                <img
                  src={banco.logo.src}
                  alt={banco.label}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-medium text-sm text-gray-800">
                {banco.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Enviar
      </Button>
    </form>
  );
}
