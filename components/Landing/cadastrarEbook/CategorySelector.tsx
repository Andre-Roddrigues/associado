"use client";

import React from "react";

interface CategorySelectorProps {
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategories, onToggleCategory }) => {
  const categories = [
    { id: "1", name: "Ficção" },
    { id: "2", name: "Não-Ficção" },
    { id: "3", name: "Técnico" },
    { id: "4", name: "Infantil" },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Categorias*</label>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => (
          <div className="flex items-center" key={cat.id}>
            <input
              type="checkbox"
              id={`cat-${cat.id}`}
              value={cat.id}
              checked={selectedCategories.includes(cat.id)}
              onChange={() => onToggleCategory(cat.id)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor={`cat-${cat.id}`} className="ml-2 text-sm text-gray-700">{cat.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
