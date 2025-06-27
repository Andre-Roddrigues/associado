import React from "react";
import { getCursosById, getPackage, getPrice } from "../Cursos/actions";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Basico, Interactivo, Intermediario } from "./PacotesConteudo";
import Title from "../Inscrever/Title";

async function CardsPacotes({ cursoId, preco }: { cursoId: number; preco: number }) {
  const initialPackages = await getPackage();
  const filteredPackages = initialPackages.filter((pkg: any) =>
    pkg.PacotesCursos.some(
      (pacoteCurso: any) => String(pacoteCurso.idCurso) === String(cursoId)
    )
  );

  const options = filteredPackages.map((pkg: any) => ({
    id: pkg.id,
    name: pkg.name.trim(),
    value: pkg.name.trim().toLowerCase(),
    percentagem: pkg.percentagem,
  }));

  const intermediarioOption = {
    id: "padrao",
    name: "padrão",
    value: "padrao",
    percentagem: 0,
  };

  const updatePackageOptions = (options: any, intermediarioOption: any) => {
    if (options.length > 1) {
      const firstPart = options.slice(0, 1);
      const secondPart = options.slice(1);
      return [...firstPart, intermediarioOption, ...secondPart];
    } else {
      return [intermediarioOption, ...options];
    }
  };

  function calcularValorDescontado(precoOriginal: number, desconto: number) {
    const valorDescontado = precoOriginal * desconto;
    const precoFinal = Math.ceil(precoOriginal - valorDescontado);
    const valorCDesconto = precoFinal;
    if (precoFinal <= 0) {
      return { valorDescontado, valorCDesconto, precoFinal: precoOriginal };
    }
    return { valorDescontado, valorCDesconto, precoFinal };
  }

  const pacotes = updatePackageOptions(options, intermediarioOption);
  const curso: any = await getCursosById(cursoId);
  const isPresencial = curso.tipocurso?.toLowerCase() === "presencial";
  if (isPresencial) {
    return (
      <></>
    );
  }

  const pacotesComPrecos = await Promise.all(
    pacotes.map(async (data: any) => {
      const precoCurso = await getPrice(data.name, preco);
      const desconto = Number(curso?.desconto) < 1 ? Number(curso?.desconto): 1;
      const { valorDescontado, valorCDesconto, precoFinal } = calcularValorDescontado (precoCurso, desconto); 
      return {
        ...data,
        precoCurso,
        valorDescontado,
        valorCDesconto,
        precoFinal,
        temDesconto: curso?.desconto !== 1,
      };
    })
  );

  const pacotesSemPadrao = pacotesComPrecos.filter(
    (pacote) => curso.tipocurso?.toLowerCase() === "online" && pacote.value !== "padrao"
  );
  const isOnlineWithoutPackages = curso.tipocurso?.toLowerCase() === "online" && pacotesSemPadrao.length === 0;

  return (
    <section className="w-full flex flex-col items-center justify-center mb-12">
      {/* Verifique se há pacotes antes de renderizar o título */}
      {pacotesComPrecos.length > 0 && !isOnlineWithoutPackages && (
        <Title className="text-center py-5">Escolha o pacote</Title>
      )}
      <div className="items-center justify-center grid lg:grid-cols-3 gap-10 max-w-screen-xl w-full h-full flex-wrap">
        {isOnlineWithoutPackages ? (
          <div className="hidden top-11 md:top-12 -right-16 w-full md:w-[19%] md:right-10 font-montserrat text-center py-6">
            <span className="hidden md:inline font-bold text-base md:text-xl lg:text-2xl">
              Preço </span> <span className="font-bold font-montserrat pr-2 md:pr-0 text-base md:text-xl lg:text-2xl text-primary"> {preco}.00<span> MZN</span></span> 
          
            <Link href={`/inscrever/${cursoId}`} className="w-full min-w-40">
              <Button className="bg-primary text-background mt-3 w-[25%] md:w-full text-xs md:text-base">
                Inscrever-se
              </Button>
            </Link>
          </div>
        ) : (
          pacotesComPrecos.map((data) => (
            <Card key={data.id} className="bg-background h-fit min-w-[23rem] flex flex-col justify-between pb-4">
              <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl font-normal text-primary">
                  {data.name.toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-3 items-center justify-between w-full h-full py-2">
                {data.valorCDesconto !== 0 && data.temDesconto ? (
                  <>
                    <span className="text-2xl font-bold -mt-5 text-zinc-400 line-through">
                      MZN {data.precoCurso}.00
                    </span>
                    <span className="text-3xl font-bold -mt-5">
                      MZN {data.precoFinal}.00
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold -mt-5">
                    MZN {data.precoCurso}.00
                  </span>
                )}
                <CardDescription className="text-center flex items-center gap-4 justify-between h-80">
                  {data.value === "essencial" && <Basico />}
                  {data.value === "padrao" && <Intermediario />}
                  {data.value === "interactivo" && <Interactivo />}
                </CardDescription>
                <Link
                  href={`/inscrever/${cursoId}?pacote=${data.name.toLowerCase()}`}
                  className="w-full"
                >
                  <Button className="bg-primary text-background w-full">
                    Inscrever-se
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}

export default CardsPacotes;
