"use client";
import {
  addassociationPackage,
  getCursoRegistado,
  inscreverAlunoNoCurso,
  validarCupon,
} from "@/components/Cursos/actions";
import { InputCuppon } from "@/components/InputCuppon";
import { Cursos } from "@/components/types/types";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import LoadingBounce from "@/components/ui/loadingBounce";
import { routes } from "@/config/routes";
import apiClient from "@/lib/axios-config-clientResquests";
import { adicionarAlunoCursoMoodle } from "@/services/moodle";
import { cadastrarAlunoMoodle } from "@/services/moodle-actions";
import { CircleX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Image from "next/image";
import masterCardLogo from "@/public/images/masterCardIcon.png";
import visaLogo from "@/public/images/visaIcon.png";
import { pagamentoMilleniumBim } from "@/services/milenium-bim-actions";
import Script from "next/script";

interface Props {
  curso: Cursos;
  userData: {
    alunoId: string;
    nomeAluno: string;
    emailAluno: string;
    apelidoAluno: string;
  };
  preco: number;
  pacote: string;
  idAssociacao: string;
  horario: string;
}

function CartaoCredito({
  curso,
  userData,
  preco,
  pacote,
  idAssociacao,
  horario,
}: Props) {
  const [valorPagar, setValorPagar] = useState<number | null>(null);
  const [desconto, setDesconto] = useState<number>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingCupon, setLoadingCupon] = useState<boolean>(false);
  const [cuppon, setCuppon] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null); // Controla a mensagem de status do pagamento
  const [returnUrl, setReturnUrl] = useState(" ");

  const router = useRouter();

  const searchParams = useSearchParams();
  const resultIndicator = searchParams.get("resultIndicator") ?? "";
  console.log(" Result indicator", resultIndicator);
  // const returnUrl = window.location.href
  // console.log(" URL retorno", returnUrl)

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
          setDesconto(Number(response?.desconto.toFixed(2))); // Pegar o desconto do cupom
          setLoadingCupon(false);
        } catch (error) {
          console.error("Erro ao validar cupom:", error);
        }
      }
    };

    setReturnUrl(window.location.href);
    if (resultIndicator) {
      handlePayment();
    }

    validateCupom();
  }, [cuppon]);

  const loadCheckoutScript = () => {
    const script = document.createElement("script");
    // script.src = "https://test-millenniumbim.mtf.gateway.mastercard.com/checkout/version/57/checkout.js";
    script.src =
      "https://millenniumbim.gateway.mastercard.com/checkout/version/57/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Checkout script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Checkout script.");
    };
    document.body.appendChild(script);
  };

  // Chamar a função para carregar o script
  useEffect(() => {
    loadCheckoutScript();
  }, []);

  const cuponData = {
    cupom: cuppon.toString(),
    valor: valorPagar?.toString(),
    idStudantUse: userData.alunoId.toString(),
    idCourse: curso.id.toString(),
  };
  const handlePayment = async () => {
    setLoading(true);

    const PaymentMethod = "Cartão de Crédito";
    const PRECO = valorPagar ? valorPagar : preco;

    // Dados para pagamento e Moodle
    const cuponData = {
      cupom: cuppon.toString(),
      valor: valorPagar?.toString(),
      idStudantUse: userData.alunoId.toString(),
      idCourse: curso.id.toString(),
    };

    const dadosMoodle = {
      idAluno: userData.alunoId,
      nome: userData.nomeAluno,
      lastname: userData.apelidoAluno,
      email: userData.emailAluno,
    };

    // Passo 1: Verificar se o aluno está inscrito
    try {
      setShowModal(true);
      setPaymentStatus("Verificando inscrição...");
      const cursoRegistado = await getCursoRegistado(Number(userData.alunoId));
      const estaInscrito = cursoRegistado.some(
        (course: any) => course.id_curso === curso.id
      );

      if (estaInscrito) {
        toast.error("Já está inscrito neste curso!");
        setPaymentStatus("Já está inscrito neste curso!");
        return;
      }
    } catch (error) {
      toast.error("Erro ao verificar inscrição.");
      setPaymentStatus("Erro ao verificar inscrição.");
      return;
    }

    if (!resultIndicator) {
      setPaymentStatus("Processando o pagamento...");
      const pagamento = await pagamentoMilleniumBim(PRECO, returnUrl);
      if (pagamento.sucess) {
        const sessionId = pagamento.data.sessionId;
        const orderId = pagamento.data.orderId;

        window.Checkout.configure({
          merchant: "102593",
          order: {
            amount: () => PRECO,
            currency: "MZN",
            description: `Pagamento do curso de ${curso.nome} na UNITEC `,
            id: orderId,
          },
          session: {
            id: sessionId,
          },
          interaction: {
            operation: "PURCHASE",
            locale: "pt_PT",
            merchant: {
              name: "Unitec Academy",
              address: {
                line1: "Av. Karl Markx, 1128, Maputo",
                line2: "Maputo",
              },
              email: "geral@paytech.tech",
              phone: "+258 123456789",
            },
            displayControl: {
              billingAddress: "HIDE",
              customerEmail: "HIDE",
            },
          },
        });

        (window as any).Checkout.showLightbox();
      }
      setPaymentStatus("Processando...");
      return;
    }
    // Passo 2: Processar Pagamento
    try {
      // LOGICA DE SUCESSO DO PAGAMENTO
      // ================================================================================

      // INSCRICAO NO CURSO PRESENCIAL
      if (
        curso.tipocurso.toLocaleLowerCase() === "presencial" &&
        resultIndicator
      ) {
        setPaymentStatus("Inscrevendo ao curso");
        const inscrever = await inscreverAlunoNoCurso(
          curso.id.toString(),
          userData?.alunoId,
          PRECO.toString(),
          PaymentMethod,
          horario
        );

        if (inscrever?.sucess) {
          setPaymentStatus("Inscrição finalizada com sucesso!");
          router.replace("/user/perfil");
          return;
        } else if (inscrever?.status === 400) {
          // console.error("erro ao inscrever no curso:", inscrever?.data)
          setPaymentStatus("Já está inscrito no curso!");
          return;
        }

        return;
      }

      // INSCRICAO NO CURSO ONLINE
      setPaymentStatus("Inscrevendo no curso");
      const inscrever = await inscreverAlunoNoCurso(
        curso.id.toString(),
        userData?.alunoId,
        PRECO.toString(),
        PaymentMethod,
        horario
      );
      console.log("Inscrever: ", inscrever);
      if (inscrever?.sucess) {
        setPaymentStatus("Inscrição finalizada com sucesso!");
      } else if (inscrever.status === 400) {
        setPaymentStatus("Já está inscrito no curso!");
      }

      if (idAssociacao) {
        setPaymentStatus("Associando ao pacote...");
        const response = await addassociationPackage(
          idAssociacao,
          curso.id,
          userData.alunoId
        );
        if (response?.status === 200) {
          toast.success("Associação com sucesso.");
        } else if (response?.status === 400) {
          setPaymentStatus(`Já está associado ao (${pacote}) neste curso `);
        }
      }
      // Passo 4: Inscrever no Moodle
      try {
        setPaymentStatus("Cadastrando no Moodle...");
        const moodleResponse = await cadastrarAlunoMoodle(
          userData.alunoId,
          userData.nomeAluno,
          userData.apelidoAluno,
          userData.emailAluno
        );
        console.log("Moddle responde", moodleResponse);
        if (moodleResponse?.sucess) {
          const userIdMoodle = moodleResponse?.user.id;
          setPaymentStatus("Adicionando o ao curso ");

          const addAoCurso = await adicionarAlunoCursoMoodle(
            Number(curso.id),
            userIdMoodle,
            pacote
          );

          if (addAoCurso?.sucess) {
            // toast.success('Aluno adicionado ao curso e ao grupo com sucesso!');
            // Associar cupom, se existir
            if (cuppon) {
              try {
                const cupomResponse = await apiClient.post(
                  routes.cuponAssociacion,
                  cuponData
                );
                if (cupomResponse.status === 200) {
                  toast.success("Cupão associado com sucesso!");
                } else {
                  toast.error("Erro ao associar o cupão.");
                  console.error("Erro ao associar o cupão:,cupomResponse");
                }
              } catch (error: any) {
                toast.error("Erro ao associar o cupão: " + error.message);
              }
            }
            setPaymentStatus("Inscrição finalizada com sucesso");
            router.replace("/user/perfil");
            return;
          } else {
            toast.error("Erro ao adicionar ao curso.");
            setPaymentStatus(
              addAoCurso?.message || "Erro ao adicionar ao curso"
            );
            return;
          }
        } else {
          setPaymentStatus("Erro ao cadastrar no Moodle");
          throw new Error("Erro ao cadastrar no Moodle");
        }
      } catch (err) {
        console.error("Erro ao registrar no Moodle:", err);
        setPaymentStatus("Erro ao registrar no Moodle.");
      }
    } catch (error) {
      setPaymentStatus("Erro no processo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    setShowModal(false); // Fecha o modal
    setLoading(false);
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="w-full h-[30vh] md:h[40vh] lg:h-[40vh] flex flex-col justify-between items-center py-5">
          <div className="w-full flex gap-3 px-5"></div>
          <div className="p-4 h-full text-center flex flex-col justify-center items-center ">
            {paymentStatus && (
              <div className="flex flex-col gap-3">
                <p className="whitespace-pre-line">{paymentStatus}</p>
                {loading && <LoadingBounce />} {/* Ícone de carregamento */}
              </div>
            )}
          </div>
          <Button className="w-1/3" onClick={closeModal}>
            Fechar
          </Button>
        </div>
      </Modal>
      <form>
        <div className="flex gap-2">
          <Image src={visaLogo} alt="visa logo" className="h-14 w-auto" />
          <Image
            src={masterCardLogo}
            alt="MasterCard logo"
            className="h-14 w-auto"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Serviço indisponível.</p>
          <p className="lg:text-sm text-xs">
            Este servço encontra-se em manutenção, por favor , selecione os
            demais serviços.
          </p>
        </div>
        <div className="mt-2">
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
                  {desconto?.toFixed(2)} MZN
                </span>
              </p>
              <p className="text- font-bold">
                Valor a pagar:{" "}
                <span className="text-primary text-lg">{valorPagar} MZN</span>
              </p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          onClick={handlePayment}
          disabled={loading}
          className="mt-2 w-full sm:w-1/3 lg:w-1/2 dark:text-accent-foreground "
        >
          {loading ? (
            <>
              <LoadingButton /> Carregando...
            </>
          ) : (
            "Finalizar inscrição"
          )}
        </Button>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></Script>
        {/* <Script src="https://test-millenniumbim.mtf.gateway.mastercard.com/checkout/version/57/checkout.js"></Script> */}
        <Script src="https://millenniumbim.gateway.mastercard.com/checkout/version/57/checkout.js"></Script>
      </form>
    </>
  );
}

export default CartaoCredito;
