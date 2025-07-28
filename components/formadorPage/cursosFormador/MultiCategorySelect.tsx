"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useCategories, Category } from "../actionsFormador/categories-actions";
import { registerNewCategory } from "../actionsFormador/add-new-category";

interface MultiCategorySelectProps {
  selectedIds: number[];
  onChange: (selected: number[]) => void;
}

export default function MultiCategorySelect({ selectedIds, onChange }: MultiCategorySelectProps) {
  const { categories, loading, error } = useCategories();
  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Inicializa a lista local de categorias
  useEffect(() => {
    if (!loading && categories.length > 0) {
      setLocalCategories(categories);
    }
  }, [categories, loading]);

  const toggleCategory = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;

    try {
      setIsLoading(true);
      const newCat = await registerNewCategory({ name });

      // Se a API não retornar a nova categoria, adiciona manualmente com id falso
      const newCategory: Category = {
        id: newCat?.id || Date.now(), // fallback para id falso
        name,
      };

      setLocalCategories((prev) => [...prev, newCategory]);
      setNewCategoryName("");
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err);
    } finally{
      setIsLoading(false);
    }
  };

  const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const filteredCategories = [...localCategories]
  .sort((a, b) => normalize(a.name).localeCompare(normalize(b.name)))
  .filter((cat) =>
    normalize(cat.name).includes(normalize(searchTerm))
  );



  return (
    <div className="relative w-full max-w-sm">
      <div className="flex justify-between items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-500 rounded-md bg-white text-left"
        >
          {selectedIds.length > 0
            ? `Selecionados: ${selectedIds.length}`
            : "Selecione a categoria"}
        </button>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
          title="Adicionar nova categoria"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {/* Campo de busca */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Pesquisar categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600"
            />
          </div>

          {loading && <p className="p-4 text-center">Carregando categorias...</p>}
          {/* {error && <p className="p-4 text-red-500 text-center">{error}</p>} */}
          {!loading && filteredCategories.length === 0 && (
            <p className="p-4 text-center text-gray-500">Nenhuma categoria encontrada</p>
          )}

          <ul>
            {filteredCategories.map((cat) => (
              <li
                key={cat.id}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 flex items-center"
              >
                <input
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  checked={selectedIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="mr-2"
                />
                <label htmlFor={`cat-${cat.id}`} className="cursor-pointer">
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal para nova categoria */}
      {modalOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-500">Adicionar Nova Categoria</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nome da categoria"
              className="w-full border text-gray-400 border-gray-300 px-3 py-2 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >{isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "Adicionar"
              )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
