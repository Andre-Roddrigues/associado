"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PaginatedTable from "../ui/PaginatedTable";
import BancoDropdown from "./dropdownPagamento";
import mpesaLogo from '@/public/images/Mpesa-logo.png';
import bciLogo from "@/public/images/bci.svg";
import absalogo from "@/public/images/absagroup.svg";
import emolalogo from '@/public/images/movitel.svg';
import mBimLogo from '@/public/images/BIM-01.png';
import { toast } from "react-hot-toast"

interface Registro {
  aluno: string;
  email: string;
  curso: string;
  valor: number;
  dataCompra: string;
  status: "Ativo" | "Pendente" | "Cancelado";
}

interface Props {
  registros: Registro[];
  totalDisponivel: number;
  onConfirmSaque: (dados: { nome: string; contacto: string; banco: string; nib?: string; valor: number }) => Promise<void>;
}

const bancos = [
  { label: "Mpesa", value: "Mpesa", logo: mpesaLogo, precisaNib: false },
  { label: "Emola", value: "Emola", logo: emolalogo, precisaNib: false },
  { label: "BIM", value: "BIM", logo: mBimLogo, precisaNib: true },
  { label: "BCI", value: "BCI", logo: bciLogo, precisaNib: true },
  { label: "ABSA", value: "ABSA", logo: absalogo, precisaNib: true },
];

export default function TabelaFinanceira({ registros, totalDisponivel, onConfirmSaque }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    contacto: "",
    banco: "Mpesa",
    nib: "",
  });

  const bancoSelecionado = bancos.find((b) => b.value === formData.banco) || bancos[0];

  const formatarMetical = (valor: number | undefined | null): string => {
    // Handle undefined or null values
    if (valor === undefined || valor === null || isNaN(valor)) {
      return "0,00 MZN";
    }
    
    // Format the number as currency
    return valor.toLocaleString("pt-MZ", { 
      style: "currency", 
      currency: "MZN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const validarCampos = (): boolean => {
    if (!formData.nome.trim()) {
      toast.error("Por favor, preencha o nome do beneficiário.");
      return false;
    }
    if (!formData.contacto.trim()) {
      toast.error(
        bancoSelecionado.precisaNib
          ? "Por favor, preencha o número da conta."
          : "Por favor, preencha o contacto."
      );
      return false;
    }
    if (bancoSelecionado.precisaNib && !formData.nib.trim()) {
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
        valor: totalDisponivel
      });
      setShowModal(false);
      setFormData({ nome: "", contacto: "", banco: "Mpesa", nib: "" });
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
            render: (item) => <span className="font-medium text-gray-800">{item.aluno}</span> 
          },
          { 
            key: "email", 
            label: "Email", 
            render: (item) => <span className="text-gray-600">{item.email}</span> 
          },
          { 
            key: "curso", 
            label: "Curso", 
            render: (item) => <span className="px-3 py-1 text-sm font-semibold text-blue-700">{item.curso}</span> 
          },
          { 
            key: "valor", 
            label: "Valor", 
            render: (item) => (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                {formatarMetical(item.valor)}
              </span>
            ) 
          },
          { 
            key: "dataCompra", 
            label: "Data", 
            render: (item) => <span className="text-sm text-gray-600">{item.dataCompra}</span> 
          },
          { 
            key: "status", 
            label: "Status", 
            render: (item) => (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold
                ${item.status === "Ativo" ? "bg-green-100 text-green-700" :
                  item.status === "Pendente" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-700"}`}>
                {item.status}
              </span>
            ),
          },
        ]}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Solicitar Saque</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Disponível:</span>
                  <span className="font-bold text-blue-700">
                    {formatarMetical(totalDisponivel)}
                  </span>
                </div>
              </div>

              <BancoDropdown
                bancos={bancos}
                selectedBanco={formData.banco}
                onChange={(value) => setFormData({ ...formData, banco: value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {bancoSelecionado.precisaNib ? "Número da Conta:" : "Contacto:"}
                </label>
                <input
                  type="text"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={bancoSelecionado.precisaNib ? "Digite o número da conta" : "Digite o contacto"}
                  required
                />
              </div>

              {bancoSelecionado.precisaNib && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIB:</label>
                  <input
                    type="text"
                    value={formData.nib}
                    onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite o NIB"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Beneficiário:</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex justify-center items-center"
                onClick={handleConfirmarSaque}
                disabled={loading || totalDisponivel <= 0}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  "Confirmar Saque"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}