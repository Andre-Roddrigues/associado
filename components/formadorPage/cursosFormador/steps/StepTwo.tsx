"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/ui/inputField";
import { Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormStepTwoData {
  nomeCompleto: string;
  email: string;
  contacto: string;
}

interface Props {
  onNext: (data: FormStepTwoData) => void;
  onBack: () => void;
  defaultValues?: Partial<FormStepTwoData>;
}

export default function StepTwo({ onNext, onBack, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormStepTwoData>({
    defaultValues,
  });

  const onSubmit = (data: FormStepTwoData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Nome Completo"
        placeholder="Seu Nome"
        icon={<Users />}
        {...register("nomeCompleto", { required: "Nome Completo é obrigatório" })}
        errorMessage={errors.nomeCompleto?.message}
      />

      <InputField
        label="Email"
        placeholder="ex@unitec.ac.mz"
        icon={<Mail />}
        {...register("email", { required: "Email é obrigatório" })}
        errorMessage={errors.email?.message}
      />

      <InputField
        label="Contacto"
        placeholder="+123456789"
        icon={<Phone />}
        {...register("contacto", { required: "Contacto é obrigatório" })}
        errorMessage={errors.contacto?.message}
      />


      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Voltar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Próximo
        </Button>
      </div>
    </form>
  );
}
