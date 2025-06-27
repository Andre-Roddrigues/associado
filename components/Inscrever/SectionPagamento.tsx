import React from "react";
import Image from "next/image";
import { getCursosById, getPrice } from "../Cursos/actions";
import InscreverForm from "./InscreverForm";
import { Cursos } from "../types/types";
import ValorPagar from "./ValorPagar";
import Title from "./Title";
import { getUser } from "@/app/(auth)/login/auth-actions";
import Horarios from "./horiarios";

interface PagamentoProps {
  cursoId: number;
  pacote: string;
}

export const dynamic = "force-dynamic";
export default async function SectionPagamento({
  cursoId,
  pacote,
}: PagamentoProps) {
  function calcularValorDescontado(precoOriginal: number, desconto: number) {
    const valorDescontado = precoOriginal * desconto;
    const precoFinal = Math.ceil(precoOriginal - valorDescontado);
    const valorCDesconto = precoFinal;
    if (precoFinal <= 0) {
      return { valorDescontado: 0, valorCDesconto, precoFinal: precoOriginal };
    }
    return { valorDescontado, valorCDesconto, precoFinal };
  }

  const curso: Cursos = await getCursosById(cursoId);
  const user = (await getUser()) as any;
  const precoBase = Number(curso?.valor);
  let precoPacote = await getPrice(pacote, precoBase);
  const isPresencial = curso?.tipocurso.toLowerCase() === "presencial";
  const cursosInteracao =[58,141, 138];
  const isInterativo = pacote === "interactivo";
  const valorInscricaoDescontado = curso?.inscricao?.valorDescontado;
  const valorIncricao =
    curso?.inscricao?.valor! - curso?.inscricao?.valorDescontado! || 0;

  const { precoFinal, valorDescontado } = calcularValorDescontado(
    precoPacote,
    Number(curso?.desconto)
  );

  if (curso?.desconto !== 1) {
    precoPacote = precoFinal;
    console.log("Preco com desconto: ", precoPacote);
  }
  if (isPresencial) {
    precoPacote = precoPacote + valorIncricao;
    console.log("Valor de inscricao: ", valorIncricao);
    console.log("Preco com inscrição presencial: ", precoPacote);
  }

  const userData = {
    alunoId: user?.id,
    nomeAluno: [user?.nome, user?.apelido].filter(Boolean).join(" "),
    emailAluno: user?.email,
    apelidoAluno: user?.apelido,
  };

  console.log("Dados do usuario: ", userData);
  console.log("Pacote é interativo:", isInterativo);

  return (
    <div className="text-muted-foreground h-full flex flex-col gap-3">
      <Title className="text-center">
        Inscreva-se e comece <span className="text-primary">a aprender!</span>
      </Title>
      <h4 className="md:text-2xl text-xl font-bold pb-1 font-montserrat">
        Detalhes <span className="text-primary">do Pagamento</span>
      </h4>
      <div className="flex gap-5 flex-wrap">
        <div className="w-full md:flex-[2] flex gap-3 flex-wrap">
          <div className="lg:w-32 md:w-64 w-full h-48 lg:h-20 relative">
            <Image
              src={curso?.Imagens?.[0]?.url || "/images/skeleton.gif"}
              alt={curso?.nome || "Curso"}
              fill
            />
          </div>
          <h1 className="text-lg font-bold">{curso?.nome}</h1>
        </div>
        <ValorPagar
          precoCurso={isPresencial ? precoBase : precoPacote}
          isPresencial={isPresencial}
          valorInscricaoDescontado={valorInscricaoDescontado}
          precoInscricao={curso?.inscricao?.valor}
          descontoInscricao={curso?.inscricao?.desconto}
        />
      </div>
      {isInterativo || cursosInteracao.includes(Number(cursoId)) ? <Horarios /> : null}
      <InscreverForm
        curso={curso}
        userData={userData}
        preco={precoPacote}
        valorDescontado={valorDescontado}
      />
    </div>
  );
}
