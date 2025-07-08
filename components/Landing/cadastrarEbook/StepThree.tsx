"use client";

import { ChangeEvent } from "react";

interface StepThreeProps {
  formData: {
    price: string;
    language: string;
    premiumDistribution: boolean;
    enableDRM: boolean;
    publishDate: string;
    acceptPromotions: boolean;
  };
  languages: { value: string; label: string }[];
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleToggleChange: (name: string) => void;
}

export function StepThree({
  formData,
  languages,
  handleInputChange,
  handleToggleChange,
}: StepThreeProps) {
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Preço (BRL)</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">R$</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="0,00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        >
          <option value="">Selecione o idioma</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Opções de Publicação</label>
        <div className="space-y-3">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.premiumDistribution}
              onChange={() => handleToggleChange("premiumDistribution")}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <span className="font-medium">Distribuição Premium</span>
              <br />
              <span className="text-gray-500">Distribuir para grandes varejistas como Amazon, Apple Books, etc.</span>
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.enableDRM}
              onChange={() => handleToggleChange("enableDRM")}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <span className="font-medium">Ativar DRM</span>
              <br />
              <span className="text-gray-500">Adicionar proteção de gerenciamento de direitos digitais</span>
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              name="acceptPromotions"
              checked={formData.acceptPromotions}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <span className="font-medium">Aceitar Promoções</span>
              <br />
              <span className="text-gray-500">Receber ofertas especiais e promoções para este ebook</span>
            </span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="publish-date" className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
        <input
          type="date"
          id="publish-date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleInputChange}
          min={todayDate}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
        {formData.publishDate &&
          new Date(formData.publishDate) < new Date(new Date().setHours(0, 0, 0, 0)) && (
            <p className="text-sm text-red-500 mt-1">
              A data de publicação não pode ser no passado
            </p>
          )}
      </div>
    </div>
  );
}
