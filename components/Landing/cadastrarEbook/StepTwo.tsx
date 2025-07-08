"use client";

import { ChangeEvent, KeyboardEvent, RefObject } from "react";
import { X, Plus } from "lucide-react";



interface StepTwoProps {
  formData: {
    title: string;
    author: string;
    description: string;
    categories: string[];
  };
  defaultCategories: string[];
  newCategory: string;
  showCategoryInput: boolean;
  setNewCategory: (val: string) => void;
  setShowCategoryInput: (val: boolean) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleAddCategory: () => void;
  handleNewCategoryKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  removeCategory: (index: number) => void;
  categoryInputRef: RefObject<HTMLInputElement>;
}


export function StepTwo({
  formData,
  defaultCategories,
  newCategory,
  showCategoryInput,
  categoryInputRef,
  handleInputChange,
  handleCategoryChange,
  handleAddCategory,
  setNewCategory,
  handleNewCategoryKeyDown,
  removeCategory,
  setShowCategoryInput,
}: StepTwoProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título do Ebook*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          placeholder="Digite o título do ebook"
          required
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Nome do Autor*</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          placeholder="Digite o nome do autor"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          placeholder="Escreva uma descrição atraente para seu ebook"
        />
      </div>

      <div>
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">Categorias</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.categories.map((category, index) => (
            <div key={index} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
              {category}
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="ml-2 text-indigo-600 hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <select
            id="categories"
            name="categories"
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            {defaultCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {showCategoryInput && (
          <div className="mt-2">
            <input
              type="text"
              ref={categoryInputRef}
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleNewCategoryKeyDown}
              onBlur={() => setShowCategoryInput(false)}
              placeholder="Digite uma nova categoria e pressione Enter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">Mantenha pressionado Ctrl para selecionar múltiplas categorias</p>
      </div>
    </div>
  );
}
