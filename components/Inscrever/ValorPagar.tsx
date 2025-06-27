import React from "react";

interface ValorPagarProps {
  precoCurso: number;
  precoInscricao?: number;
  valorInscricaoDescontado?: number;
  isPresencial?: boolean;
  descontoInscricao?: number;
}
function ValorPagar({
  precoCurso,
  isPresencial,
  precoInscricao,
  valorInscricaoDescontado,
  descontoInscricao,
}: ValorPagarProps) {
  const hasDesconto = descontoInscricao === 0 ? "false" : "true";
  const preco =
    valorInscricaoDescontado === 0
      ? precoInscricao
      : precoInscricao! - valorInscricaoDescontado!;
  console.log("desconto", hasDesconto);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg flex-1 flex items-center flex-wrap">
        Preço:
        <span className="text-primary text-lg md:text-2xl lg:text-3xl font-montserrat font-bold ml-2">
          MZN {precoCurso}.00
        </span>
      </p>
      <p className="text-lg flex-1 flex items-center flex-wrap">
        {isPresencial && (
          <>
            Inscrição:
            <span className="flex-col flex  text-primary text-lg md:text-2xl lg:text-3xl font-montserrat font-bold ml-2">
              <span
                className={`${
                  valorInscricaoDescontado === 0 ? "hidden " : ` `
                }text-lg line-through text-muted-foreground md:text-2xl lg:text-xl font-montserrat font-bold ml-2`}
              >
                MZN {precoInscricao}.00
              </span>
              <span className="text-primary text-lg md:text-2xl lg:text-2xl font-montserrat font-bold ml-2">
                {descontoInscricao === 1 ? "GRATUITA" : `MZN ${preco}.00`}
              </span>
            </span>
          </>
        )}
      </p>
      {isPresencial && (
        <span className="text-lg font-bold font-montserrat flex gap-2 ">
          Total:{" "}
          <span className="text-primary md:text-2xl">
            MZN {precoCurso + preco!}.00
          </span>
        </span>
      )}
    </div>
  );
}

export default ValorPagar;
