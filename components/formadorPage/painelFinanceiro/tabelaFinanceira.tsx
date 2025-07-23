"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PaginatedTable from "../ui/PaginatedTable";
import { toast } from "react-hot-toast";
import { getInstructorData } from "../actionsFormador/get-user-actions";
import axios from "axios";

interface Registro {
  aluno: string;
  email: string;
  curso: string;
  valor: number;
  dataCompra: string;
  status: "Ativo" | "Pendente" | "Cancelado";
}

interface PaymentOption {
  id: string;
  name: string;
  logo: any;
  needsNIB: boolean;
  accountNumber?: string;
  fullName?: string;
}

interface Props {
  registros: Registro[];
  totalDisponivel: number;
  onConfirmSaque: (dados: { 
    metodo: string; 
    accountNumber: string; 
    nib?: string; 
    valor: number;
    fullName?: string;
  }) => Promise<void>;
}

export default function TabelaFinanceira({ registros, totalDisponivel, onConfirmSaque }: Props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [nib, setNib] = useState("");
  const [valorSaque, setValorSaque] = useState("");
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [userInfo, setUserInfo] = useState<{ nome: string; email: string }>({
  nome: "",
  email: "",
});
  

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const instructorData = await getInstructorData();
        
        const options: PaymentOption[] = [];
        setUserInfo({
          nome: instructorData.nomeCompleto,
          email: instructorData.email,
        });
        if (instructorData?.bank) {
          options.push({
            id: "bank",
            name: instructorData.bank.bankName,
            logo: getBankLogo(instructorData.bank.bankName),
            needsNIB: true,
            accountNumber: instructorData.bank.bankNumber,
            fullName: instructorData.bank.fullName
          });
        }

        if (instructorData?.carteira) {
          options.push({
            id: "mobile",
            name: instructorData.carteira.wallet,
            logo: getWalletLogo(instructorData.carteira.wallet),
            needsNIB: false,
            accountNumber: instructorData.carteira.phoneNumber,
            fullName: instructorData.carteira.fullName
          });
        }

        setPaymentOptions(options);
      } catch (error) {
        toast.error("Erro ao carregar dados bancários");
        console.error("Error fetching payment options:", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchPaymentOptions();
  }, []);

  const getBankLogo = (bankName: string): any => {
    const bankLogos: Record<string, any> = {
      "BCI": require('@/public/images/bci.svg'),
      "BIM": require('@/public/images/BIM-01.png'),
      "ABSA": require('@/public/images/absagroup.svg'),
    };
    return bankLogos[bankName] || require('@/public/images/uniteclogo.png');
  };

  const getWalletLogo = (walletName: string): any => {
    const walletLogos: Record<string, any> = {
      "M-Pesa": require('@/public/images/Mpesa-logo.png'),
      "Vodacom M-Pesa": require('@/public/images/Mpesa-logo.png'),
      "e-Mola": require('@/public/images/movitel.svg'),
      "Emola": require('@/public/images/movitel.svg'),
      "Movitel e-Mola": require('@/public/images/movitel.svg')
    };
    return walletLogos[walletName] || require('@/public/images/uniteclogo.png');
  };

  const formatarMetical = (valor: number | undefined | null): string => {
    if (valor === undefined || valor === null || isNaN(valor)) {
      return "0,00 MZN";
    }
    return valor.toLocaleString("pt-MZ", { 
      style: "currency", 
      currency: "MZN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleWithdrawRequest = async () => {
    if (!selectedOption) {
      toast.error("Por favor, selecione um método de pagamento");
      return;
    }
  
    const selectedPayment = paymentOptions.find(opt => opt.id === selectedOption);
    
    if (!selectedPayment) {
      toast.error("Método de pagamento inválido");
      return;
    }
  
    if (selectedPayment.needsNIB && !nib.trim()) {
      toast.error("Por favor, preencha o NIB");
      return;
    }
  
    if (!valorSaque || isNaN(Number(valorSaque))) {
      toast.error("Por favor, insira um valor válido");
      return;
    }
  
    const amount = Number(valorSaque);
    if (amount <= 0) {
      toast.error("O valor deve ser maior que zero");
      return;
    }
  
    if (amount > totalDisponivel) {
      toast.error("O valor solicitado excede o saldo disponível");
      return;
    }
  
    try {
      setLoading(true);
      
      // Prepare withdrawal data for email
      const withdrawalData = {
  metodo: selectedPayment.name,
  accountNumber: selectedPayment.accountNumber || "",
  nib: selectedPayment.needsNIB ? nib : undefined,
  valor: amount,
  fullName: selectedPayment.fullName,
  data: new Date().toLocaleString("pt-MZ"),

  // ⬇️  novos campos
  nome: userInfo.nome,
  email: userInfo.email,
};

  
      // First send the email
      await axios.post('/api/sendEmail/levantasaldo', withdrawalData);
      toast.success('Pedido de saque enviado por e-mail!');
  
      // Then process the withdrawal
      await onConfirmSaque(withdrawalData);
      
      setShowModal(false);
      setSelectedOption("");
      setNib("");
      setValorSaque("");
      toast.success("Pedido de saque processado com sucesso!");
    } catch (error) {
      console.error("Erro ao processar o saque:", error);
      toast.error("Erro ao processar o saque");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-lg font-semibold text-gray-700">Histórico de Compras</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            Saldo Disponível: <span className="text-green-600">{formatarMetical(totalDisponivel)}</span>
          </span>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:from-green-500 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={fetchingData}
          >
            {fetchingData ? "Carregando..." : "Solicitar Saque"}
          </Button>
        </div>
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


      {/* Withdrawal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-500">Solicitar Saque</h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedOption("");
                  setNib("");
                  setValorSaque("");
                }} 
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Valor Disponível: <span className="text-green-600">{formatarMetical(totalDisponivel)}</span>
                </label>
                <input
                  type="number"
                  value={valorSaque}
                  onChange={(e) => setValorSaque(e.target.value)}
                  placeholder="Digite o valor a sacar"
                  className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>

              {paymentOptions.length > 0 ? (
                <>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Selecione o método de pagamento:</h4>
                    <div className="space-y-3">
                      {paymentOptions.map((option) => (
                        <div 
                          key={option.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedOption === option.id 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:bg-gray-50'
                          } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                          onClick={() => !loading && setSelectedOption(option.id)}
                        >
                          <input
                            type="radio"
                            id={option.id}
                            name="paymentMethod"
                            checked={selectedOption === option.id}
                            onChange={() => !loading && setSelectedOption(option.id)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                            disabled={loading}
                          />
                          <div className="ml-3 flex items-center">
                            <Image 
                              src={option.logo} 
                              alt={option.name} 
                              width={30} 
                              height={30} 
                              className="object-contain mr-3"
                            />
                            <div>
                              <label htmlFor={option.id} className="block text-sm font-medium text-gray-700">
                                {option.name}
                              </label>
                              <p className="text-xs text-gray-500">{option.accountNumber}</p>
                              {option.fullName && (
                                <p className="text-xs text-gray-500">Titular: {option.fullName}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOption && paymentOptions.find(opt => opt.id === selectedOption)?.needsNIB && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">NIB</label>
                      <input
                        type="text"
                        value={nib}
                        onChange={(e) => setNib(e.target.value)}
                        placeholder="Digite o NIB da conta"
                        className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Nenhuma conta bancária ou carteira móvel cadastrada</p>
                  <p className="text-sm text-gray-400 mt-2">Cadastre seus dados bancários para solicitar saques</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedOption("");
                  setNib("");
                  setValorSaque("");
                }}
                disabled={loading}
                className="bg-gray-500 text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleWithdrawRequest}
                disabled={loading || paymentOptions.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : "Confirmar Saque"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}