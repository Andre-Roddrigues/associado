"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PaginatedTable from "../ui/PaginatedTable";
import { toast } from "react-hot-toast";
import ModalSaque from "./ModalSaque";

interface Registro {
  aluno: string;
  email: string;
  curso: string;
  valor: number;
  dataCompra: string;
  status: "Ativo" | "Pendente" | "Cancelado";
}

interface Banco {
  label: string;
  value: string;
  logo: any; // ajuste conforme tipo real das logos
  precisaNib: boolean;
}

interface Props {
  registros: Registro[];
  bancos?: Banco[]; // pode ser opcional e inicializado como []
  totalDisponivel: number;
  onConfirmSaque: (dados: { nome: string; contacto: string; banco: string; nib?: string; valor: number }) => Promise<void>;
}

export default function TabelaFinanceira({
  registros,
  bancos = [],
  totalDisponivel,
  onConfirmSaque,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    contacto: "",
    banco: "",
    nib: "",
  });

  // Atualiza banco selecionado quando bancos forem carregados/alterados
  useEffect(() => {
    if (bancos.length > 0) {
      setFormData((prev) => ({
        ...prev,
        banco: prev.banco || bancos[0].value,
      }));
    }
  }, [bancos]);

  const bancoSelecionado = bancos.find((b) => b.value === formData.banco) || bancos[0];

  const formatarMetical = (valor: number | undefined | null): string => {
    if (valor === undefined || valor === null || isNaN(valor)) {
      return "0,00 MZN";
    }
    return valor.toLocaleString("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const validarCampos = (): boolean => {
    if (!formData.nome.trim()) {
      toast.error("Por favor, preencha o nome do beneficiário.");
      return false;
    }
    if (!formData.contacto.trim()) {
      toast.error(
        bancoSelecionado?.precisaNib
          ? "Por favor, preencha o número da conta."
          : "Por favor, preencha o contacto."
      );
      return false;
    }
    if (bancoSelecionado?.precisaNib && !formData.nib.trim()) {
      toast.error("Por favor, preencha o NIB.");
      return false;
    }
    return true;
  };

  const handleConfirmarSaque = async (): Promise<void> => {
    if (!validarCampos() || totalDisponivel <= 0) return;

    setLoading(true);
    try {
      await onConfirmSaque({
        ...formData,
        valor: totalDisponivel,
      });
      setShowModal(false);
      setFormData({ nome: "", contacto: "", banco: bancos.length > 0 ? bancos[0].value : "", nib: "" });
      toast.success("Saque solicitado com sucesso!");
    } catch (error) {
      console.error("Erro ao processar saque:", error);
      toast.error("Erro ao processar saque. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-lg font-semibold text-gray-700">Histórico de Compras</h3>
        <Button
          onClick={() => setShowModal(true)}
          disabled={totalDisponivel <= 0}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
              <span className="px-3 py-1 text-sm font-semibold text-blue-700">{item.curso}</span>
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
            render: (item) => <span className="text-sm text-gray-600">{item.dataCompra}</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  item.status === "Ativo"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Pendente"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status}
              </span>
            ),
          },
        ]}
      />

      <ModalSaque
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        bancos={bancos}
        totalDisponivel={totalDisponivel}
        onConfirmSaque={onConfirmSaque}
      />
    </div>
  );
}
