"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { registerCursoInstrutor } from "../actionsFormador/add-new-course";
import {
  X, ChevronDown, BookOpen, Target, FileText,
  Clock, Monitor, Tag, ImagePlus
} from "lucide-react";
import { getInstructorData } from "../actionsFormador/get-user-actions";

interface ModalNovoCursoProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ModalNovoCurso({ onClose, onSubmit }: ModalNovoCursoProps) {
  const [formData, setFormData] = useState({
    nomeDoCurso: "",
    idCategoria: "",
    objectivoDoCurso: "",
    descricaoDoCurso: "",
    preco: "",
    modalidade: "",
    duracao: "",
    idInstructor: "", // será preenchido depois
  });

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const user = await getInstructorData();
        if (user?.id) {
          setFormData((prev) => ({
            ...prev,
            idInstructor: user.id.toString(),
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do instrutor:", error);
      }
    };

    fetchInstructor();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagem(file);
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  const dataToSend = {
    ...formData,
    programaDoCurso: tags.join(", "),
    programa: tags,
    imagem: null, // você pode enviar a imagem como `base64` futuramente, se necessário
  };

  try {
    const response = await registerCursoInstrutor(dataToSend);
    onSubmit(response);
    onClose();
  } catch (err) {
    console.error("Erro ao adicionar curso:", err);
    alert("Erro ao registrar o curso.");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-[90%] md:w-[80%] lg:w-[50%] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl p-8 border border-gray-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Criar Novo Curso</h2>
          <p className="text-gray-600">Preencha os detalhes do seu curso</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 text-gray-500 md:grid-cols-2 gap-5">
            {/* Nome do Curso */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BookOpen className="mr-2 w-4 h-4" />
                Nome do Curso
              </label>
              <input
                type="text"
                name="nomeDoCurso"
                placeholder="Introduza o nome do curso"
                value={formData.nomeDoCurso}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Categoria */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <ChevronDown className="mr-2 w-4 h-4" />
                Categoria
              </label>
              <input
                type="text"
                name="idCategoria"
                placeholder="ID da categoria"
                value={formData.idCategoria}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Objetivo */}
            <div className="md:col-span-2 space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Target className="mr-2 w-4 h-4" />
                Objetivo do Curso
              </label>
              <textarea
                name="objectivoDoCurso"
                placeholder="Descreva os objetivos de aprendizagem"
                value={formData.objectivoDoCurso}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-2 space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="mr-2 w-4 h-4" />
                Descrição do Curso
              </label>
              <textarea
                name="descricaoDoCurso"
                placeholder="Descrição detalhada do curso"
                value={formData.descricaoDoCurso}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Programa */}
            <div className="md:col-span-2 space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="mr-2 w-4 h-4" />
                Programa do Curso
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg flex flex-wrap gap-2 min-h-[56px] bg-white">
                {tags.map((tag, index) => (
                  <span key={index} className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} className="ml-2 text-blue-600 hover:text-red-500">
                      &times;
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  name="programaDoCurso"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder={tags.length === 0 ? "Digite e pressione Enter ou vírgula" : ""}
                  className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none"
                />
              </div>
            </div>

            {/* Preço */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Tag className="mr-2 w-4 h-4" />
                Preço (MZN)
              </label>
              <input
                type="number"
                name="preco"
                placeholder="0"
                value={formData.preco}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Modalidade */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Monitor className="mr-2 w-4 h-4" />
                Modalidade
              </label>
              <select
                name="modalidade"
                value={formData.modalidade}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Selecione</option>
                <option value="Online">Online</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>

            {/* Duração */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="mr-2 w-4 h-4" />
                Duração
              </label>
              <select
                name="duracao"
                value={formData.duracao}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Selecione</option>
                <option value="1 Mês">1 Mês</option>
                <option value="3 Meses">3 Meses</option>
                <option value="6 Meses">6 Meses</option>
                <option value="12 Meses">12 Meses</option>
              </select>
            </div>

            {/* Imagem */}
            <div className="space-y-1 md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <ImagePlus className="mr-2 w-4 h-4" />
                Capa do Curso
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Criar Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
