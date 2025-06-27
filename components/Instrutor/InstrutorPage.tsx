"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import teach from "@/public/images/teacher.svg";
import { InputField } from "../ui/inputField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, DollarSign, List, BookA } from "lucide-react";
import LoadingButton from "../ui/loading-button";
import axios from "axios";

const courseSchema = z.object({
  nomeCurso: z.string().trim().min(1, { message: "O campo Nome do Curso é obrigatório" }),
  nomeuser: z.string().trim().min(1, { message: "O campo Nome do Curso é obrigatório" }),
  category: z.string().trim().min(1, { message: "O campo Categoria é obrigatório" }),
  price: z.string().trim().min(1, { message: "O campo Preço é obrigatório" }),
  modalidade: z.string().trim().min(1, { message: "Selecione a modalidade" }),
  hours: z.string().trim().min(1, { message: "O campo Horas do Curso é obrigatório" }),
  telefone: z.string().trim().min(1, { message: "O campo telefone é obrigatório" }),
  email: z.string().trim().email({ message: "Endereço de e-mail inválido" }),
  duracao: z.string().trim().min(1, { message: "Selecione a duração do curso" }),
});

type CourseSchema = z.infer<typeof courseSchema>;

export function AddCourseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
  });

  const handleAddCourse = async (data: CourseSchema) => {
    console.log("Dados enviados:", data); // Log dos dados do formulário
    try {
      await axios.post("/api/sendEmail/instrutor", {
        nome: data.nomeCurso,
        nomeuser: data.nomeuser,
        email: data.email,
        telefone: data.telefone,
        instituicao: data.category,
        mensagem: "Informações adicionais para adicionar o curso",
        modalidade: data.modalidade,
        numTrabalhadores: data.duracao,
      });
      toast.success("E-mail enviado com sucesso!");
      reset(); // Resetar o formulário após envio bem-sucedido
    } catch (error) {
      toast.error("Erro ao enviar o e-mail.");
      console.error("Erro ao enviar o e-mail:", error); // Log de erro detalhado
    }
  };

  return (
    <main className="w-full">
      <form
        onSubmit={(e) => {
          console.log("Formulário submetido"); // Log de depuração
          e.preventDefault(); // Previne o comportamento padrão temporariamente para logs
          handleSubmit(handleAddCourse)(e); // Aciona a função de envio
        }}
        className="w-full"
      >
        <h2 className="text-2xl text-center mt-7 font-bold text-muted-foreground">
          Adicionar Novo Curso
        </h2>
        <p className="text-sm text-center text-muted-foreground mt-2">
          Preencha os detalhes abaixo para adicionar um novo curso.
        </p>
        <div className="grid gap-4 py-10 px-8 grid-cols-1 md:grid-cols-2">
          <div className="text-center">
            <Image alt="instrutor" src={teach} className="mx-auto" />
          </div>
          <div className="px-10 py-5">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {/* Nome do Curso */}
              <InputField
                icon={<BookA size={20} />}
                label="Nome do Curso"
                placeholder="Marketing"
                type="text"
                {...register("nomeCurso")}
                errorMessage={errors.nomeCurso?.message}
              />
              {/* Categoria */}
              <InputField
                icon={<List size={20} />}
                label="Categoria do Curso"
                placeholder="Comunicação"
                type="text"
                {...register("category")}
                errorMessage={errors.category?.message}
              />
              {/* Preço */}
              <InputField
                icon={<DollarSign size={20} />}
                label="Preço do Curso"
                placeholder="123"
                type="text"
                {...register("price")}
                errorMessage={errors.price?.message}
              />
              {/* Modalidade */}
              <select
                id="modalidade"
                className="w-full mt-1 p-2 border rounded-md"
                {...register("modalidade")}
              >
                <option value="">Selecione a Modalidade</option>
                <option value="Online">Online</option>
                <option value="Presencial">Presencial</option>
              </select>
              {/* Botão Submeter */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="my-3 w-64 sm:1/2 dark:text-accent-foreground"
              >
                {isSubmitting ? <LoadingButton /> : "Submeter"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default AddCourseForm;
