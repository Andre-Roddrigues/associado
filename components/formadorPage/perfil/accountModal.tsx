import React from "react";

interface Props {
  isOpen: boolean;
  isBank: boolean;
  formData: any;
  setFormData: (data: any) => void;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AccountModal = ({ isOpen, isBank, formData, setFormData, onClose, onSubmit }: Props) => {
  if (!isOpen) return null;

  const banks = ["BCI", "BIM", "FNB"];
  const mobileWallets = ["M-Pesa", "Emola", "M-Kesh"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isBank ? "Adicionar Conta Bancária" : "Adicionar Carteira Móvel"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isBank ? "Preencha os dados da sua conta bancária" : "Informe os dados da sua carteira digital"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
            <input
              name="fullName"
              placeholder="Digite seu nome completo"
              value={formData.fullName || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm"
            />
          </div>

          {isBank ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banco</label>
                <div className="relative">
                  <select
                    name="bankName"
                    value={formData.bankName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm bg-white pr-10"
                  >
                    <option value="">Selecione o banco</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número da conta</label>
                <input
                  name="bankNumber"
                  placeholder="Digite o número da conta"
                  value={formData.bankNumber || ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIB <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  name="nib"
                  placeholder="Digite o NIB se desejar"
                  value={formData.nib || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carteira Móvel</label>
                <div className="relative">
                  <select
                    name="wallet"
                    value={formData.wallet || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm bg-white pr-10"
                  >
                    <option value="">Selecione a carteira</option>
                    {mobileWallets.map((wallet) => (
                      <option key={wallet} value={wallet}>
                        {wallet}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de telefone</label>
                <input
                  name="phoneNumber"
                  placeholder="Digite o número de telefone"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50/80 transition-all duration-200 font-medium shadow-sm hover:shadow-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium shadow-md hover:shadow-sm"
            >
              Salvar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;