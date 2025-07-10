"use client";

import React, { useState } from "react";
import { Pencil, Trash2, PlusCircle, Banknote, Smartphone } from "lucide-react";
import AccountModal from "./accountModal";
import { addAccount } from "../actionsFormador/addaccount-actions";


const PerfilBancos = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBankModal, setIsBankModal] = useState(true);
  const [formData, setFormData] = useState<any>({});

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bank: "Banco BIM",
      accountNumber: "•••• 5678",
      type: "Conta Corrente",
      logo: "/images/BIM-01.PNG",
    },
  ]);

  const [mobileAccounts, setMobileAccounts] = useState([
    {
      id: 1,
      provider: "Mpesa",
      number: "+25887654321",
      name: "Unitec",
      logo: "/images/mpesa-logo.png",
    },
  ]);

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
          id: Date.now(),
          bank: data.bankName,
          accountNumber: data.bankNumber,
          type: "Conta Corrente",
          logo: "/images/BIM-01.PNG",
        },
      ]);
    } else {
      setMobileAccounts((prev) => [
        ...prev,
        {
          id: Date.now(),
          provider: data.wallet,
          number: data.phoneNumber,
          name: data.fullName,
          logo: "/images/mpesa-logo.png",
        },
      ]);
    }

    handleCloseModal();
  };

  const handleRemove = (id: number, isBank: boolean) => {
    if (isBank) {
      setBankAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } else {
      setMobileAccounts((prev) => prev.filter((acc) => acc.id !== id));
    }
  };

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
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="p-5 border rounded-xl bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition shadow-sm hover:shadow-md relative group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center p-2">
                  <img src={account.logo} alt={account.bank} className="max-h-8 max-w-8" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{account.bank}</p>
                  <p className="text-gray-600 text-sm">{account.accountNumber}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleRemove(account.id, true)} className="p-1.5 rounded-full bg-white hover:bg-red-50 text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contas Móveis */}
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
          {mobileAccounts.map((account) => (
            <div
              key={account.id}
              className="p-5 border rounded-xl bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition shadow-sm hover:shadow-md relative group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center p-2">
                  <img src={account.logo} alt={account.provider} className="max-h-8 max-w-8" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{account.provider}</p>
                  <p className="text-gray-600 text-sm">{account.number}</p>
                  <p className="text-gray-500 text-sm mt-1">{account.name}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleRemove(account.id, false)} className="p-1.5 rounded-full bg-white hover:bg-red-50 text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
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
