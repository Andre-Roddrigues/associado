"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle, Banknote, Smartphone } from "lucide-react";
import AccountModal from "./accountModal";
import { addAccount } from "../actionsFormador/addaccount-actions";
import { getInstructorData } from "../actionsFormador/get-user-actions";

interface BankAccount {
  id: number;
  bankName: string;
  bankNumber: string;
  fullName: string;
  nib?: string | null;
}

interface MobileAccount {
  id: number;
  wallet: string;
  phoneNumber: string;
  fullName: string;
}

const PerfilBancos = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBankModal, setIsBankModal] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [mobileAccounts, setMobileAccounts] = useState<MobileAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorData = await getInstructorData();
        
        if (instructorData?.bank) {
          setBankAccounts([{
            id: instructorData.bank.id,
            bankName: instructorData.bank.bankName,
            bankNumber: instructorData.bank.bankNumber,
            fullName: instructorData.bank.fullName,
            nib: instructorData.bank.nib
          }]);
        }

        if (instructorData?.carteira) {
          setMobileAccounts([{
            id: instructorData.carteira.id,
            wallet: instructorData.carteira.wallet,
            phoneNumber: instructorData.carteira.phoneNumber,
            fullName: instructorData.carteira.fullName
          }]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (isBank: boolean) => {
    setIsBankModal(isBank);
    setFormData({ accountTytpe: isBank ? "bank" : "wallet" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = async (data: any) => {
    const success = await addAccount(data);
    if (!success) return;

    if (data.accountTytpe === "bank") {
      setBankAccounts((prev) => [
        ...prev,
        {
          id: Date.now(), // Temporary ID until you refresh from server
          bankName: data.bankName,
          bankNumber: data.bankNumber,
          fullName: data.fullName,
          nib: data.nib
        },
      ]);
    } else {
      setMobileAccounts((prev) => [
        ...prev,
        {
          id: Date.now(), // Temporary ID until you refresh from server
          wallet: data.wallet,
          phoneNumber: data.phoneNumber,
          fullName: data.fullName
        },
      ]);
    }

    handleCloseModal();
  };

  const handleRemove = async (id: number, isBank: boolean) => {
    // Here you would call your API to delete the account
    // For now, just update the local state
    if (isBank) {
      setBankAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } else {
      setMobileAccounts((prev) => prev.filter((acc) => acc.id !== id));
    }
  };

  const getBankLogo = (bankName: string) => {
    const logos: Record<string, string> = {
      "BCI": "/images/bci.svg",
      "BIM": "/images/BIM-01.PNG",
      "Standard Bank": "/images/standard-bank-logo.png",
      "Millennium BIM": "/images/millennium-bim-logo.png"
    };
    return logos[bankName] || "/images/bank-default.png";
  };

  const getWalletLogo = (walletName: string) => {
    const logos: Record<string, string> = {
      "M-Pesa": "/images/mpesa-logo.png",
      "Vodacom M-Pesa": "/images/mpesa-logo.png",
      "e-Mola": "/images/emola.png",
      "Emola": "/images/emola.png",
      "Movitel e-Mola": "/images/emola.png"
    };
    return logos[walletName] || "/images/wallet-default.png";
  };

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-500">
          <Banknote className="text-blue-600" size={24} />
          Informações Financeiras
        </h2>
        <div className="space-y-6 animate-pulse">
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-24 bg-gray-100 rounded-xl"></div>
              <div className="h-24 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-24 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-500">
        <Banknote className="text-blue-600" size={24} />
        Informações Financeiras
      </h2>

      {/* Contas Bancárias */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
            <Banknote size={18} className="text-blue-500" />
            Contas Bancárias
          </h3>
          <button
            onClick={() => handleOpenModal(true)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={16} />
            Adicionar Conta
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.length > 0 ? (
            bankAccounts.map((account) => (
              <div
                key={account.id}
                className="p-5 border rounded-xl bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition shadow-sm hover:shadow-md relative group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center p-2">
                    <img 
                      src={getBankLogo(account.bankName)} 
                      alt={account.bankName} 
                      className="max-h-8 max-w-8" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{account.bankName}</p>
                    <p className="text-gray-600 text-sm">{account.bankNumber}</p>
                    <p className="text-gray-500 text-sm mt-1">{account.fullName}</p>
                    {account.nib && <p className="text-gray-500 text-xs mt-1">NIB: {account.nib}</p>}
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleRemove(account.id, true)} 
                    className="p-1.5 rounded-full bg-white hover:bg-red-50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma conta bancária cadastrada</p>
          )}
        </div>
      </div>

      {/* Carteira Móvel */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
            <Smartphone size={18} className="text-blue-500" />
            Carteira Móvel
          </h3>
          <button
            onClick={() => handleOpenModal(false)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={16} />
            Adicionar Conta
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mobileAccounts.length > 0 ? (
            mobileAccounts.map((account) => (
              <div
                key={account.id}
                className="p-5 border rounded-xl bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition shadow-sm hover:shadow-md relative group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center p-2">
                    <img 
                      src={getWalletLogo(account.wallet)} 
                      alt={account.wallet} 
                      className="max-h-8 max-w-8 rounded-lg" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{account.wallet}</p>
                    <p className="text-gray-600 text-sm">{account.phoneNumber}</p>
                    <p className="text-gray-500 text-sm mt-1">{account.fullName}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleRemove(account.id, false)} 
                    className="p-1.5 rounded-full bg-white hover:bg-red-50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma carteira móvel cadastrada</p>
          )}
        </div>
      </div>

      <AccountModal
        isOpen={showModal}
        isBank={isBankModal}
        formData={formData}
        setFormData={setFormData}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default PerfilBancos;