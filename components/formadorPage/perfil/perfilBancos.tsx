"use client";

import React, { useState } from "react";
import { Pencil, Trash2, PlusCircle, Banknote, Smartphone } from "lucide-react";
import AccountModal from "./accountModal";

const PerfilBancos = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBankModal, setIsBankModal] = useState(true);

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bank: "Banco BCI",
      accountNumber: "•••• 5678",
      type: "Conta Corrente",
      logo: "/images/bci-logo.png" // Add your bank logo
    },
  ]);

  const [mobileAccounts, setMobileAccounts] = useState([
    {
      id: 1,
      provider: "Mpesa",
      number: "+25887654321",
      name: "Unitec",
      logo: "/images/mpesa-logo.png" // Add your mobile money logo
    },
  ]);

  const handleOpenModal = (isBank: boolean) => {
    setIsBankModal(isBank);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleEdit = (id: number, isBank: boolean) => {
    handleOpenModal(isBank);
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
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
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
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            onClick={() => handleOpenModal(true)}
          >
            <PlusCircle size={16} />
            Adicionar Conta
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="p-5 border rounded-xl bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition-all shadow-sm hover:shadow-md relative group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                  <img
                    src={account.logo}
                    alt={account.bank}
                    className="max-h-8 max-w-8 object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{account.bank}</p>
                  <p className="text-gray-600 text-sm">{account.accountNumber}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                    {account.type}
                  </span>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(account.id, true)}
                  className="p-1.5 rounded-full bg-white shadow-sm hover:bg-blue-50 text-blue-600 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleRemove(account.id, true)}
                  className="p-1.5 rounded-full bg-white shadow-sm hover:bg-red-50 text-red-600 transition-colors"
                >
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
            Contas Móveis
          </h3>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            onClick={() => handleOpenModal(false)}
          >
            <PlusCircle size={16} />
            Adicionar Conta
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mobileAccounts.map((account) => (
            <div
              key={account.id}
              className="p-5 border rounded-xl bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition-all shadow-sm hover:shadow-md relative group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                  <img
                    src={account.logo}
                    alt={account.provider}
                    className="max-h-8 max-w-8 object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{account.provider}</p>
                  <p className="text-gray-600 text-sm">{account.number}</p>
                  <p className="text-gray-500 text-sm mt-1">{account.name}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(account.id, false)}
                  className="p-1.5 rounded-full bg-white shadow-sm hover:bg-blue-50 text-blue-600 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleRemove(account.id, false)}
                  className="p-1.5 rounded-full bg-white shadow-sm hover:bg-red-50 text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AccountModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleAddAccount}
        isBankModal={isBankModal}
      />
    </section>
  );
};

export default PerfilBancos;