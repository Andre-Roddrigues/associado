"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { listarEditoras } from "../actionsFormador/listar-editora-actions";
import { criarEditora } from "../actionsFormador/create-editora-actions";
import { getInstructorData } from "../actionsFormador/get-user-actions";

interface Editora {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  selectedId?: number;
  onChange: (id: number | null) => void;
}

export default function EditoraSelect({ selectedId, onChange }: Props) {
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEditora, setNewEditora] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchEditoras();

    const fetchUserDefaults = async () => {
      try {
        const data = await getInstructorData();

        setNewEditora((prev) => ({
          ...prev,
          email: data.email || "",
          phone: data.contacto?.toString() || "",
        }));
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    fetchUserDefaults();
  }, []);

  const fetchEditoras = async () => {
    try {
      const data = await listarEditoras();
      setEditoras(data);
    } catch (err) {
      console.error("Erro ao buscar editoras:", err);
    }
  };

  const handleAddEditora = async () => {
    const { name, email, phone } = newEditora;
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setIsLoading(true);
    try {
      const created = await criarEditora({ name, email, phone });
      const newItem: Editora = {
        id: created?.id || Date.now(), 
        name,
        email,
        phone,
      };
      setEditoras((prev) => [...prev, newItem]);
      setNewEditora((prev) => ({
        name: "",
        email: prev.email,  
        phone: prev.phone,  
      }));
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar editora:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredEditoras = [...editoras]
    .sort((a, b) => normalize(a.name).localeCompare(normalize(b.name)))
    .filter((ed) => normalize(ed.name).includes(normalize(searchTerm)));

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex justify-between items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-500 rounded-md bg-white text-left"
        >
          {selectedId
            ? `${editoras.find((e) => e.id === selectedId)?.name || "..."}` 
            : "Selecione a editora"}
        </button>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
          title="Adicionar nova editora"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Pesquisar editora..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600"
            />
          </div>

          {filteredEditoras.length === 0 && (
            <p className="p-4 text-center text-gray-500">Nenhuma editora encontrada</p>
          )}

          <ul>
            {filteredEditoras.map((ed) => (
              <li
                key={ed.id}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(ed.id);
                  setOpen(false);
                }}
              >
                {ed.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-500">Adicionar Nova Editora</h2>

            <input
              type="text"
              value={newEditora.name}
              onChange={(e) => setNewEditora((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nome"
              className="w-full border text-gray-400 border-gray-300 px-3 py-2 rounded-md mb-2"
              autoFocus
            />
            {/* <input
              type="email"
              value={newEditora.email}
              readOnly
              className="w-full border text-gray-400 border-gray-300 px-3 py-2 rounded-md mb-2 bg-gray-100"
            />
            <input
              type="tel"
              value={newEditora.phone}
              readOnly
              className="w-full border text-gray-400 border-gray-300 px-3 py-2 rounded-md mb-4 bg-gray-100"
            /> */}

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
                onClick={handleAddEditora}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isLoading ? (
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
