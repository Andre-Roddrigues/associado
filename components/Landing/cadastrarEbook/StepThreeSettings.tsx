"use client";

import { ChangeEvent } from "react";

interface Props {
  formData: any;
  format: string;
  languages: { value: string; label: string }[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleToggleChange: (field: string) => void;
}

export default function StepThreeSettings({ formData, format, languages, handleInputChange, handleToggleChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">Selecione o idioma</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      {format === 'ebook' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Opções de Publicação</label>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.enableDRM}
              onChange={() => handleToggleChange('enableDRM')}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <span className="font-medium">Ativar DRM</span><br />
              <span className="text-gray-500">Adicionar proteção de gerenciamento de direitos digitais</span>
            </span>
          </label>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleInputChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
        {formData.publishDate && new Date(formData.publishDate) < new Date(new Date().setHours(0, 0, 0, 0)) && (
          <p className="text-sm text-red-500 mt-1">A data de publicação não pode ser no passado</p>
        )}
      </div>

      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            name="acceptPromotions"
            checked={formData.acceptPromotions}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            <span className="font-medium">Aceitar Promoções</span><br />
            <span className="text-gray-500">Receber ofertas especiais e promoções para este livro</span>
          </span>
        </label>
      </div>
    </div>
  );
}
