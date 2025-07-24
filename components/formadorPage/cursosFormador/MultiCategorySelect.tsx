"use client";

import { useState } from "react";
import { useCategories, Category } from "../actionsFormador/categories-actions";

interface MultiCategorySelectProps {
  selectedIds: number[];
  onChange: (selected: number[]) => void;
}

export default function MultiCategorySelect({ selectedIds, onChange }: MultiCategorySelectProps) {
  const { categories, loading, error } = useCategories();
  const [open, setOpen] = useState(false);

  const toggleCategory = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md bg-white text-left"
      >
        {selectedIds.length > 0
          ? `Selecionados: ${selectedIds.length}`
          : "Selecione a categoria"}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {loading && <p className="p-4 text-center">Carregando categorias...</p>}
          {error && <p className="p-4 text-red-500 text-center">{error}</p>}
          {!loading && !error && categories.length === 0 && (
            <p className="p-4 text-center text-gray-500">Nenhuma categoria disponível</p>
          )}
          <ul>
            {categories.map((cat) => (
              <li key={cat.id} className="px-4 py-2 text-gray-500 hover:bg-gray-100 flex items-center">
                <input
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  checked={selectedIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="mr-2 text-gray-500"
                />
                <label htmlFor={`cat-${cat.id}`} className="cursor-pointer text-gray-500">
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
