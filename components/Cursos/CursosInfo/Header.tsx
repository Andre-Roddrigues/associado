"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getPackage } from "../actions";
import { Cursos } from "@/components/types/types";

interface HeaderProps {
  curso: Cursos;
  pacote: any;
}

// Função para buscar pacotes filtrados para o curso
async function fetchFilteredPackages(cursoId: string) {
  try {
    const initialPackages = await getPackage();
    const filteredPackages = initialPackages.filter((pkg: any) =>
      pkg.PacotesCursos.some(
        (pacoteCurso: any) => String(pacoteCurso.idCurso) === String(cursoId)
      )
    );
    return filteredPackages.map((pkg: any) => ({
      id: pkg.id,
      name: pkg.name.trim(),
      value: pkg.name.trim().toLowerCase(),
      percentagem: pkg.percentagem,
    }));
  } catch (error) {
    console.log("Erro ao buscar pacotes:", error);
    return [];
  }
}

const Header: React.FC<HeaderProps> = ({ curso }) => {
  const [pacotes, setPacotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const fetchedPacotes = await fetchFilteredPackages(curso.id.toString());
        setPacotes(fetchedPacotes);
      } catch (error) {
        console.error("Erro ao carregar os pacotes", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPackages();
  }, [curso.id]);
  
  const basePrice =  curso?.desconto && curso.desconto < 1 ? Number(curso.valor) - (Number(curso.valor) * Number(curso.desconto)) : Number(curso?.valor) ;
  const isPresencial = curso?.tipocurso.toLowerCase().trim() === "presencial";
  const desconto = curso?.desconto || 0
  const isOnline = curso?.tipocurso.toLowerCase().trim() === "online";
  const hasEssentialAndInteractive =
    pacotes.some((pkg) => pkg.name.toLowerCase() === "essencial") &&
    pacotes.some((pkg) => pkg.name.toLowerCase() === "interactivo");

  const showInscreverButton = isPresencial || !hasEssentialAndInteractive;

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-5">
      <div className="flex-1 flex flex-col w-full gap-1 min-w-80">
        <h1 className="text-2xl lg:text-3xl font-bold">{curso?.nome}</h1>
        <ul className="text-xs lg:text-sm flex gap-4 lg:gap-5 items-center">
          <li>
            Categoria:{" "}
            <span className="text-foreground">{curso?.categoria}</span>
          </li>
          <li>
            Duração:{" "}
            <span className="text-foreground">
              {curso.duracao?.toUpperCase().includes("DIAS")
                ? curso.duracao.split(" ")[0] + " Horas"
                : curso.duracao}
            </span>
          </li>
          <li>
            Regime: <span className="text-foreground">{curso?.tipocurso}</span>
          </li>
        </ul>
      </div>

      {showInscreverButton && (
        <div className="lg:flex grid grid-cols-2 grid-rows-2 items-center w-full  lg:w-fit lg:flex-col lg:gap-2 lg:justify-normal lg:items-baseline">
          {isOnline && desconto < 1 && (
            <div className="font-bold text-lg lg:text-2xl font-montserrat">
              Antes:{" "}<span className="line-through text-muted-foreground">
              {curso.valor}.00 <span>MZN</span></span>
            </div>
          )}
          <div className="font-bold row-start-2 text-lg lg:text-2xl font-montserrat">
            Preço:{" "}
            <span className="text-primary">
              {basePrice.toFixed(2)} <span>MZN</span>
            </span>
          </div>
          <Link href={`/inscrever/${curso.id}`} className="lg:w-full row-span-2 min-w-40">
            <Button className="bg-primary text-background w-full">
              Inscrever-se
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
