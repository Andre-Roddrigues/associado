"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/ui/inputField";
import { BadgeDollarSign, BookA, ListCheck, ListFilter, Text } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onNext: (data: any) => void;
  defaultValues?: any;
}

export default function StepOne({ onNext, defaultValues }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Nome do Curso"
        placeholder="Nome do Curso"
        icon={<BookA />}
        {...register("nome", { required: "Nome obrigatório" })}
        errorMessage={errors.nome?.message}
      />
      <InputField
        label="Categoria"
        placeholder="Categoria"
        icon={<ListFilter />}
        {...register("categoria", { required: "Categoria obrigatória" })}
        errorMessage={errors.categoria?.message}
      />
      <InputField
        label="O que Ensinará"
        placeholder="Lista separada por vírgulas"
        icon={<ListCheck />}
        {...register("oqueEnsinara")}
        errorMessage={errors.oqueEnsinara?.message}
      />
      <InputField
        label="Objetivo"
        placeholder="Objetivo"
        icon={<Text />}
        {...register("objectivo")}
        errorMessage={errors.objectivo?.message}
      />
      <InputField
        label="Preço"
        placeholder="Preço"
        icon={<BadgeDollarSign />}
        {...register("price")}
        errorMessage={errors.price?.message}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          Próximo
        </Button>
      </div>
    </form>
  );
}
