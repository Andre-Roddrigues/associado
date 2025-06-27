import { InputField } from "@/components/ui/inputField";
import { Cursos } from "@/components/types/types";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { routes } from "@/config/routes";
import api from "@/lib/axiosConfig";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { ErrorIcon } from "react-hot-toast";
import { CirclePercent, CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
import FileUpload from "@/components/FileUpload";
import { InputCuppon } from "@/components/InputCuppon";
import { useValidarCupon } from "@/hooks/validar-cupon";
import {
  actualizarCupum,
  addassociationPackage,
  carregarComprovativo,
  confirmarCupom,
  isAlunoInscrito,
  registarPagamento,
  validarCupon,
} from "@/components/Cursos/actions";
import LoadingBounce from "@/components/ui/loadingBounce";
import apiClient from "@/lib/axios-config-clientResquests";
import { response } from "express";

interface Props {
  curso: Cursos;
  userData: {
    alunoId: string;
    nomeAluno: string;
    emailAluno: string;
  };
  preco: number;
  pacote: string;
  idAssociacao: string;
  valorDescontado: number;
  horario?: string;
}

const paymentSchema = z.object({
  cuppon: z.string().optional(),
});

type PaymentSchema = z.infer<typeof paymentSchema>;

function Transferencia({
  curso,
  userData,
  preco,
  pacote,
  idAssociacao,
  horario,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [valorPagar, setValorPagar] = useState<number | null>(null);
  const [desconto, setDesconto] = useState<number>(
    Number(curso?.desconto) || 0
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingCupon, setLoadingCupon] = useState<boolean>(false);
  const [cuppon, setCuppon] = React.useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
  });
  const router = useRouter();

  const handleFileUpload = (file: File | null) => {
    setSelectedFile(file);
  };

  const handlePaymentTransferencia = async () => {
    if (!selectedFile || selectedFile.size <= 0) {
      toast.error("Por favor carregue o comprovativo de Pagamento");
      return;
    }
    const formData = new FormData();
    const pagamentoValor = valorPagar || preco;
    formData.append("nomeCurso", curso.nome);
    formData.append("nomealuno", userData.nomeAluno);
    formData.append("id_curso", curso.id.toString());
    formData.append("id_aluno", userData.alunoId);
    formData.append("emailaluno", userData.emailAluno);
    formData.append("tipocurso", curso.tipocurso);
    formData.append("desconto", desconto.toString());
    formData.append("imagem", selectedFile);
    formData.append("valor", preco.toString());
    formData.append("pacote", pacote.toString());
    formData.append(
      "HorarioInteracao",
      horario ? horario.toString() : "Sem interacao"
    );
    // if(cuppon && valorPagar){
    //   formData.append('valor', valorPagar.toString());
    // }
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`Campo: ${key}`);
        console.log(`Nome do arquivo: ${value.name}`);
        console.log(`Tipo do arquivo: ${value.type}`);
        console.log(`Tamanho do arquivo: ${value.size} bytes`);
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    try {
      setLoading(true);
      const response = await api.post(routes.registarPagamento, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      let id_curso_registado;
      if (response.status === 200) {
        console.log("Pagamento sent", response.data);
        id_curso_registado = response.data?.id_curso_registado;
      }
      console.log("Id curso registado", id_curso_registado);

      const cuponData = {
        cupom: cuppon.toString(),
        valor: valorPagar?.toString(),
        idStudantUse: userData.alunoId.toString(),
        idCourse: curso.id.toString(),
        idCursoRegistado: id_curso_registado,
      };

      // console.log("Response data: ", response.data)
      // console.log("Response status: ", response.status)
      // console.log("Response : ", response)
      if (idAssociacao) {
        // setPaymentStatus('Associando ao pacote...');
        const response = await addassociationPackage(
          idAssociacao,
          curso.id,
          userData.alunoId
        );
        if (response?.status === 200) {
          toast.success("Associado ao pacote com sucesso.");
        } else if (response?.status === 400) {
          toast.error(`Já está associado ao (${pacote}) neste curso `);
        }
      }

      if (response.status === 200 && cuppon) {
        try {
          console.log(cuponData);
          const cupomResponse = await api.post(
            routes.cuponAssociacion,
            cuponData
          );
          // const cupomConfirm = await actualizarCupum(id_curso_registado)
          // console.log("Cupom Confirm: " ,cupomConfirm)
          console.log("Cupon Response: ", cupomResponse);
          // toast.success('Inscrição finalizada com sucesso!');
          // router.push("/user/perfil")
        } catch (error) {
          console.log(error);
          console.error("Error: ", error);
          toast.error("Ocorreu um erro ao associar o cupão!");
        }
      }
      toast.success("Inscrição finalizada com sucesso!");
      router.push("/user/cursos");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Verifica se o erro é uma instância de AxiosError
        if (error.response) {
          // Verifica o status da resposta
          if (error.response.status === 400) {
            toast.error("Já está inscrito neste curso!");
          } else {
            toast.error(
              error.response.data.message || "Erro ao finalizar a inscrição."
            );
            console.log("Mensagem de Erro: ", error.response.data.message);
            console.log("Mensagem de Erro: ", error.message);
          }
        } else {
          // Se não houver resposta, mostra uma mensagem genérica
          toast.error("Erro ao finalizar a inscrição.");
          console.log("Mensagem de Erro: ", error.message);
        }
      } else {
        // Caso o erro não seja do Axios
        toast.error("Erro inesperado ao finalizar a inscrição.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const validateCupom = async () => {
      if (cuppon) {
        try {
          setErrorMessage("");
          setValorPagar(null);
          setLoadingCupon(true);

          const response = await validarCupon(cuppon, preco);
          if (response.status) {
            setErrorMessage("Cupão Inválido.");
            setLoadingCupon(false);
          }
          if (cuppon.length === 3) {
            setLoadingCupon(false);
            setErrorMessage("");
          }
          setValorPagar(
            response.valorDescontado
              ? Number(response.valorDescontado.toFixed(2))
              : null
          );
          setDesconto(
            response.desconto ? Number(response?.desconto.toFixed(2)) : 0
          );
          console.log("Cupom validado:", response);
          setLoadingCupon(false);
        } catch (error) {
          console.error("Erro ao validar cupom:", error);
        }
      }
    };

    validateCupom();
  }, [cuppon]);

  return (
    <form onSubmit={handleSubmit(handlePaymentTransferencia)}>
      <div className="mb-2">
        <label htmlFor="tranferencia-email" className="block mb-1">
          Comprovativo de pagamento:
        </label>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>

      <InputCuppon cuppon={cuppon} setCuppon={setCuppon} />

      {loadingCupon && (
        <span className="-mt-2 flex items-center text-sm py-2">
          Calculando desconto
          <LoadingBounce />
        </span>
      )}

      {errorMessage && (
        <span className="-mt-2 text-sm text-red-500 flex items-center gap-1 py-1">
          <CircleX className="w-4 text" /> {errorMessage}
        </span>
      )}

      {valorPagar && (
        <div className=" -mt-2 text-muted-foreground flex flex-col gap-1 py-2">
          <p className="text- font-bold">
            Desconto:{" "}
            <span className="text-primary text-base">
              {desconto.toFixed(2)} MZN
            </span>
          </p>
          <p className="text- font-bold">
            Valor a pagar:{" "}
            <span className="text-primary text-lg">
              {valorPagar.toFixed(2)} MZN
            </span>
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full sm:w-1/3 lg:w-1/2 dark:text-accent-foreground mb-6"
      >
        {loading ? (
          <>
            <LoadingButton /> Carregando...
          </>
        ) : (
          "Finalizar inscrição"
        )}
      </Button>
    </form>
  );
}

export default Transferencia;
