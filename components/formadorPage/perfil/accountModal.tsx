// components/AccountModal.tsx
"use client";

import React from "react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isBankModal: boolean;
}

export default function AccountModal({
  isOpen,
  onClose,
  onSubmit,
  isBankModal,
}: AccountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {isBankModal ? "Adicionar Conta Bancária" : "Adicionar Conta Móvel"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isBankModal ? "Banco" : "Operadora"}
            </label>
            <select className="w-full px-4 py-2 border rounded-lg">
              {isBankModal ? (
                <>
                  <option>BIM</option>
                  <option>BCI</option>
                  <option>ABSA</option>
                </>
              ) : (
                <>
                  <option>Emola</option>
                  <option>Mpesa</option>
                  <option>Mkesh</option>
                </>
              )}
            </select>
          </div>

          {isBankModal ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número da Conta
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome do Beneficiário
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">NIB</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="NIB"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de Telefone
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+258 84 xxx xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome do Proprietário
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Nome completo"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
