"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PaginatedTable from "../ui/PaginatedTable";
import { toast } from "react-hot-toast";
import { getInstructorData } from "../actionsFormador/get-user-actions";

interface Registro {
  aluno: string;
  email: string;
  curso: string;
  valor: number;
  dataCompra: string;
  status: "Ativo" | "Pendente" | "Cancelado";
}

interface Banco {
  id: number;
  fullName: string;
  bankName: string;
  bankNumber: string;
  nib: string | null;
}

interface Carteira {
  id: number;
  fullName: string;
  wallet: string;
  phoneNumber: string;
}

interface Props {
  registros: Registro[];
  totalDisponivel: number;
  onConfirmSaque: (dados: {
    nome: string;
    contacto: string;
    bancoOuCarteira: string;
    nib?: string;
    valor: number;
  }) => Promise<void>;
}

export default function TabelaFinanceira({
  registros,
  totalDisponivel,
  onConfirmSaque,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [banco, setBanco] = useState<Banco | null>(null);
  const [carteira, setCarteira] = useState<Carteira | null>(null);

  // Tipo e Id selecionados (banco ou carteira)
  const [selecionadoTipo, setSelecionadoTipo] = useState<"banco" | "carteira">("banco");

  // Valor para saque selecionado
  const [valorSaque, setValorSaque] = useState<number>(0);

  // Carregar dados do instrutor ao abrir modal
  useEffect(() => {
    if (!showModal) return;

    (async () => {
      try {
        const data = await getInstructorData();

        setBanco(data.bank ?? null);
        setCarteira(data.carteira ?? null);

        // Seleciona banco se existir, senão carteira
        if (data.bank) {
          setSelecionadoTipo("banco");
        } else if (data.carteira) {
          setSelecionadoTipo("carteira");
        }

        setValorSaque(totalDisponivel);
      } catch (error) {
        toast.error("Erro ao carregar dados do banco/carteira.");
        console.error(error);
      }
    })();
  }, [showModal, totalDisponivel]);

  // Formatar valor em Meticais
  const formatarMetical = (valor: number): string => {
    return valor.toLocaleString("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Confirmar saque
  const handleConfirmarSaque = async () => {
    if (valorSaque <= 0 || valorSaque > totalDisponivel) {
      toast.error("Valor inválido para saque.");
      return;
    }

    if (selecionadoTipo === "banco" && !banco) {
      toast.error("Banco não selecionado.");
      return;
    }

    if (selecionadoTipo === "carteira" && !carteira) {
      toast.error("Carteira não selecionada.");
      return;
    }

    setLoading(true);
    try {
      await onConfirmSaque({
        nome: selecionadoTipo === "banco" ? banco!.fullName : carteira!.fullName,
        contacto:
          selecionadoTipo === "banco" ? banco!.bankNumber : carteira!.phoneNumber,
        bancoOuCarteira:
          selecionadoTipo === "banco" ? banco!.bankName : carteira!.wallet,
        nib: selecionadoTipo === "banco" ? banco!.nib || undefined : undefined,
        valor: valorSaque,
      });
      toast.success("Saque solicitado com sucesso!");
      setShowModal(false);
      setValorSaque(0);
    } catch (error) {
      toast.error("Erro ao processar saque. Tente novamente.");
      console.error(error);
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
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

            <div className="mb-4">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Total Disponível:</span>
                <span className="font-bold text-blue-700">{formatarMetical(totalDisponivel)}</span>
              </div>
            </div>

            {/* Seleção Banco ou Carteira */}
            <div className="mb-6">
              <p className="mb-2 font-semibold text-gray-700">Escolha o método para saque:</p>
              <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                {banco && (
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="metodoSaque"
                      checked={selecionadoTipo === "banco"}
                      onChange={() => setSelecionadoTipo("banco")}
                    />
                    <span>
                      Banco: <strong>{banco.bankName}</strong> - {banco.fullName}
                    </span>
                  </label>
                )}

                {carteira && (
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="metodoSaque"
                      checked={selecionadoTipo === "carteira"}
                      onChange={() => setSelecionadoTipo("carteira")}
                    />
                    <span>
                      Carteira: <strong>{carteira.wallet}</strong> - {carteira.fullName}
                    </span>
                  </label>
                )}

                {!banco && !carteira && (
                  <p className="text-sm text-gray-500">Nenhum banco ou carteira cadastrado.</p>
                )}
              </div>
            </div>

            {/* Seleção de valor */}
            <div className="mb-6">
              <p className="mb-2 font-semibold text-gray-700">Escolha o valor para saque:</p>
              <div className="space-y-2">
                {[0.25, 0.5, 1].map((percent) => {
                  const valor = Math.floor(totalDisponivel * percent);
                  return (
                    <label key={percent} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="valorSaque"
                        checked={valorSaque === valor}
                        onChange={() => setValorSaque(valor)}
                      />
                      <span>{formatarMetical(valor)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex justify-center items-center"
              onClick={handleConfirmarSaque}
              disabled={loading || totalDisponivel <= 0 || valorSaque === 0}
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
      )}
    </div>
  );
}
