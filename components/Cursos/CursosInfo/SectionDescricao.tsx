import React from "react";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CursoPrograma } from "@/components/types/types";
import ListLockIcon from "./listLockIcon";

interface DescricaoProps {
  descricao?: string;
  programa?: CursoPrograma[];
}

function SectionDescricao({ descricao,programa }: DescricaoProps) {
  const descricaoArray = descricao?.split("?")
    .map((item) => item.trim())
    .filter(Boolean);

    function formatarTexto(texto: string): string {
      if (!texto) return texto; // Se o texto for vazio, retorna ele mesmo
  
      // Remove os espaços no início do texto
      const textoSemEspacosIniciais = texto.trimStart();
  
      const primeiraLetra = textoSemEspacosIniciais.charAt(0).toUpperCase(); // Primeira letra em maiúscula
      const restoTexto = textoSemEspacosIniciais.slice(1).toLowerCase(); // O restante do texto em minúscula
  
      return primeiraLetra + restoTexto; // Junta a primeira letra com o restante
  }
  
  
  return (
    <section className="flex mt-4 gap-7 flex-wrap">
      <div className="flex-1 flex flex-col gap-3 ">
        <div className="">
          <h3 className="font-bold text-xl p-0">O que você aprenderá:</h3>
          <ScrollArea className="h-40 lg:h-32 p">
            <ul className="text-xs lg:text-sm flex flex-col gap-1 pt-3">
              {descricaoArray?.map((linha, index) => (
                <li key={index}>
                  {linha}.
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Separator className="bg-primary mt-2" />
        </div>
        {/* PROGRAMA */}
        <div className="">
          <h3 className="font-bold text-xl p-0">Programa:</h3>
          <ScrollArea className="h-40 lg:h-36 p">
            <ul className="text-xs lg:text-sm flex flex-col gap-2 pt-3">
                {programa?.map((item, index) => (
                    <ListLockIcon key={index}>{formatarTexto(item.programa)}</ListLockIcon>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}

export default SectionDescricao;
