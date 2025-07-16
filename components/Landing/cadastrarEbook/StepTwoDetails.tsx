"use client";

import { ChangeEvent } from "react";

interface Props {
  formData: any;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  categories: { id: string; name: string }[];
  categoryInputRef: React.RefObject<HTMLSelectElement>;
}

export default function StepTwoDetails({ formData, handleInputChange, categories, categoryInputRef }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          ref={categoryInputRef}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">Selecionar Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}