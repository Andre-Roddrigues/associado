import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/ui/inputField";
import {
  BadgeDollarSign,
  BookA,
  ListCheck,
  ListFilter,
  Text,
  Clock,
  Laptop,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormStepOneData {
  nomeDoCurso: string;
  idCategoria: string;
  programaDoCurso: string;
  objectivoDoCurso: string;
  preco: string;
  modalidade: string;
  duracao: string;
}

interface Props {
  onNext: (data: FormStepOneData) => void;
  defaultValues?: Partial<FormStepOneData>;
}

export default function StepOne({ onNext, defaultValues }: Props) {
  const [tags, setTags] = useState<string[]>(
    defaultValues?.programaDoCurso?.split(",").map((tag) => tag.trim()) || []
  );
  const [inputValue, setInputValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormStepOneData>({
    defaultValues,
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setValue("programaDoCurso", newTags.join(", "));
        setInputValue("");
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("programaDoCurso", newTags.join(", "));
  };

  const onSubmit = (data: FormStepOneData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Nome do Curso"
        placeholder="Nome do Curso"
        icon={<BookA />}
        {...register("nomeDoCurso", { required: "Nome do Curso é obrigatório" })}
        errorMessage={errors.nomeDoCurso?.message}
      />

      <InputField
        label="Categoria"
        placeholder="Administração"
        icon={<ListFilter />}
        {...register("idCategoria", { required: "Categoria é obrigatória" })}
        errorMessage={errors.idCategoria?.message}
      />

      {/* Custom Tags Input for Programa do Curso */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <ListCheck className="w-4 h-4" /> Programa do Curso
        </label>
        <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 min-h-[42px]">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Digite e pressione Enter ou vírgula"
            className="flex-1 border-none outline-none text-sm text-gray-700 min-w-[120px]"
          />
        </div>
        {errors.programaDoCurso && (
          <span className="text-red-500 text-sm">
            {errors.programaDoCurso.message}
          </span>
        )}
        <input type="hidden" {...register("programaDoCurso", { required: "Programa do Curso é obrigatório" })} />
      </div>

      <InputField
        label="Objetivo do Curso"
        placeholder="Qual é o objetivo do seu curso?"
        icon={<Text />}
        {...register("objectivoDoCurso", {
          required: "Objectivo do Curso é obrigatório",
        })}
        errorMessage={errors.objectivoDoCurso?.message}
      />

      <InputField
        label="Preço"
        placeholder="1000"
        icon={<BadgeDollarSign />}
        {...register("preco", { required: "Preço é obrigatório" })}
        errorMessage={errors.preco?.message}
      />

      {/* Modalidade */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <Laptop className="w-4 h-4" /> Modalidade
        </label>
        <select
          {...register("modalidade", { required: "Modalidade é obrigatória" })}
          className="border border-gray-300 rounded-md px-3 text-muted-foreground py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione a modalidade</option>
          <option value="Online">Online</option>
          <option value="Presencial">Presencial</option>
          <option value="Híbrido">Híbrido</option>
        </select>
        {errors.modalidade && (
          <span className="text-red-500 text-sm">{errors.modalidade.message}</span>
        )}
      </div>

      {/* Duração */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <Clock className="w-4 h-4" /> Duração
        </label>
        <select
          {...register("duracao", { required: "Duração é obrigatória" })}
          className="border border-gray-300 rounded-md px-3 text-muted-foreground py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione a duração</option>
          <option value="1 mês">1 mês</option>
          <option value="2 meses">2 meses</option>
          <option value="3 meses">3 meses</option>
          <option value="6 meses">6 meses</option>
        </select>
        {errors.duracao && (
          <span className="text-red-500 text-sm">{errors.duracao.message}</span>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          Próximo
        </Button>
      </div>
    </form>
  );
}
