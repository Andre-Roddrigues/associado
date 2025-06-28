"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import business from "@/public/images/business.svg";
import logo from "@/public/images/bp.png";
import {
  BadgeDollarSign,
  BookA,
  ListCheck,
  ListCheckIcon,
  ListFilter,
  Mail,
  Phone,
  Text,
  Users,
} from "lucide-react";
import { InputField } from "../ui/inputField";
import { ColaboradoresSection } from "../Home/Colaboradores/sectionColabaores";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import LoadingButton from "../ui/loading-button";
import SectionCardsCourse from "./CardsAddCourse";
import { InputFieldCurrency } from "../ui/currencyInput";
import { routes } from "@/config/routes";
import { registerCursoInstrutor } from "../formadorPage/actionsFormador/actions";

const partnerSchema = z.object({
  nome: z.string().trim().min(1, { message: 'O nome do Curso é obrigatório' }),
  nomecompleto: z.string().trim().min(1, { message: 'O campo nome é obrigatório' }),
  categoria: z.string().trim().min(1, { message: 'Este campo é obrigatório' }),
  oqueEnsinara: z.string().trim().min(1, { message: 'Este campo é obrigatório' }),
  objectivo: z.string().trim().min(1, { message: 'Este campo é obrigatório' }),
  progrmas: z.string().trim().min(1, { message: 'Este campo é obrigatório' }),
  telefone: z.string()
    .trim()
    .min(9, { message: "O telefone deve ter no mínimo 9 dígitos" })
    .regex(/^\d+$/, { message: "O telefone deve conter apenas números" }),
  email: z.string().trim().email({ message: 'Endereço de e-mail inválido' }),
  modalidade: z.string().trim().min(1, { message: 'Selecione a modalidade' }),
  duracao: z.string().trim().min(1, { message: 'A duração é obrigatória' }),
  price: z.coerce.number().min(1, { message: "O preço deve ser maior que zero" }),
});

type PartnerSchema = z.infer<typeof partnerSchema>;

export function InstrutorForm() {
  const [duracaoOptions, setDuracaoOptions] = useState([
    { value: "1-10", label: "1h-10h" },
    { value: "11-50", label: "10h-50h" },
    { value: "51-100", label: "51h-100h" },
    { value: "101-500", label: "101h-500h" },
    { value: "500+", label: "500h+" },
  ]);

  const handleModalidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModalidade = event.target.value;
    if (selectedModalidade === "Presencial") {
      setDuracaoOptions([
        { value: "1-7", label: "1-7 Dias" },
        { value: "1-30", label: "1-30 Dias" },
        { value: "1-3m", label: "1-3 Meses" },
        { value: "1-6m", label: "1-6 Meses" },
        { value: "6m+", label: "6+ Meses" },
      ]);
    } else {
      setDuracaoOptions([
        { value: "1-10", label: "1h-10h" },
        { value: "11-50", label: "10h-50h" },
        { value: "51-100", label: "51h-100h" },
        { value: "101-500", label: "101h-500h" },
        { value: "500+", label: "500h+" },
      ]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PartnerSchema>({
    resolver: zodResolver(partnerSchema),
  });

  const onSubmit = async (data: PartnerSchema) => {
    const payload = {
      nomeCompleto: data.nomecompleto,
      email: data.email,
      contacto: data.telefone,
      nomeDoCurso: data.nome,
      idCategoria: data.categoria,
      objectivoDoCurso: data.objectivo,
      programaDoCurso: data.progrmas,
      preco: String(data.price),
      modalidade: data.modalidade,
      duracao: data.duracao,
    };

    try {
      await registerCursoInstrutor(payload);
      toast.success("Curso registrado com sucesso!");
      reset();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao registrar curso");
    }
  };

  return (
    <main className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="md:w-1/2 mx-auto py-7">
          <h2 className="text-2xl text-center font-bold text-muted-foreground">
            Transforme seu conhecimento em ganho financeiro na Unitec Academy!
          </h2>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Na Unitec Academy, você não é só mais um instrutor, é nosso parceiro! Junte-se agora e mostre seu talento para o mundo enquanto aumenta seus ganhos.
          </p>
        </div>
        <div className="px-8">
          <SectionCardsCourse />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 overflow-hidden py-10 px-8">
          <div className="flex flex-col text-center justify-center">
            <Image alt="instrutor" src={business} className="mx-auto" />
          </div>

          <div className="px-10 py-5">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="md:col-span-2">
                <InputField
                  className="text-xs"
                  icon={<BookA size={20} />}
                  label="Nome do Curso"
                  placeholder="Escreva o nome do curso"
                  type="text"
                  {...register("nome")}
                  errorMessage={errors.nome?.message}
                />
              </div>
              <InputField
                icon={<ListFilter size={20} />}
                label="Categoria"
                placeholder="Escreva a categoria do curso"
                type="text"
                {...register("categoria")}
                errorMessage={errors.categoria?.message}
              />
              <InputField
                icon={<ListCheck size={20} />}
                label="O que Ensinará"
                placeholder="Separado por vírgula"
                type="text"
                {...register("oqueEnsinara")}
                errorMessage={errors.oqueEnsinara?.message}
              />
              <div className="md:col-span-2">
                <InputField
                  icon={<Text size={20} />}
                  label="Objetivo do curso"
                  placeholder="Descreva o objetivo do curso"
                  type="text"
                  {...register("objectivo")}
                  errorMessage={errors.objectivo?.message}
                />
              </div>
              <InputField
                icon={<ListCheckIcon size={20} />}
                label="Programa do Curso"
                placeholder="Conteúdos separados por vírgula"
                type="text"
                {...register("progrmas")}
                errorMessage={errors.progrmas?.message}
              />
              <InputFieldCurrency
                label="Preço"
                placeholder="1.000"
                icon={<BadgeDollarSign size={20} />}
                className="w-full"
                {...register("price")}
                errorMessage={errors.price?.message}
              />
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Modalidade:
                </label>
                <select
                  className="w-full mt-1 p-2 border text-muted-foreground rounded-md text-sm"
                  {...register("modalidade", { onChange: handleModalidadeChange })}
                >
                  <option value="">Selecione</option>
                  <option value="Online">Online</option>
                  <option value="Presencial">Presencial</option>
                </select>
                <p className="text-xs text-red-600">{errors.modalidade?.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Duração:
                </label>
                <select
                  className="w-full mt-1 p-2 border text-muted-foreground rounded-md text-sm"
                  {...register("duracao")}
                >
                  <option value="">Selecione</option>
                  {duracaoOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-red-600">{errors.duracao?.message}</p>
              </div>
              <div className="md:col-span-2">
                <InputField
                  icon={<Users size={20} />}
                  label="Seu Nome"
                  placeholder="Nome completo"
                  type="text"
                  {...register("nomecompleto")}
                  errorMessage={errors.nomecompleto?.message}
                />
              </div>
              <InputField
                icon={<Mail size={20} />}
                label="Email"
                placeholder="email@unitec.ac.mz"
                type="text"
                {...register("email")}
                errorMessage={errors.email?.message}
              />
              <InputField
                icon={<Phone size={20} />}
                label="Telefone"
                placeholder="84xxxxxxx"
                type="text"
                {...register("telefone")}
                errorMessage={errors.telefone?.message}
              />

              <Button type="submit" disabled={isSubmitting} className="my-3 w-64">
                {isSubmitting ? (
                  <>
                    <LoadingButton /> Carregando
                  </>
                ) : (
                  "Submeter"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default InstrutorForm;
