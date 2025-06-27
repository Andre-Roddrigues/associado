import imagem from "@/public/images/curso.png";
import { Bookmark, Circle, Clock7, MoveRight, UserRound } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { Cursos } from "../types/types";
import LanguageCourseCard from "./LanguageCard";
import { getPackage } from "./actions";
import NameTooltip from "./NameTooltip";

export interface CursosProps {
  cursos: Cursos[];
}

async function CursosList({ cursos }: CursosProps) {
  const pacotes = await getPackage();
  const menorPacote = pacotes.reduce((prev: any, current: any) =>
    prev.percentagem < current.percentagem ? prev : current
  );

  function encontrarPacotePorCurso(idCurso: string) {
    return pacotes.find((pacote: any) =>
      pacote.PacotesCursos.some((curso: any) => curso.idCurso.toString() === idCurso)
    );
  }

  return (
    <ul className={`grid ${cursos.length < 4 && "grid-cols-[repeat(auto-fit,minmax(290px,400px))] justify-center"} grid-cols-[repeat(auto-fit,minmax(290px,1fr))]  gap-5 `}>
      {cursos.map((item: any) => {
        const cursoLink = item.id === 'language' ? '/language' : `/cursos/${item.id}`;

        let valorComDesconto = item.id === 'language' || item.tipocurso.toLocaleLowerCase() === "presencial"
          ? Number(item.valor)
          : Number(item.valor) * (1 + menorPacote.percentagem);

        if (item.desconto && item.desconto < 1) {
          valorComDesconto = valorComDesconto * (1 - item.desconto);
        }

        const possuiPacote = encontrarPacotePorCurso(item.id.toString());

        if (!possuiPacote) {
          valorComDesconto = item?.desconto < 1
            ? (item.valor - (item.valor * item.desconto))
            : item?.valor;
        }

        // Mostrar inscritos apenas para cursos online
        const isOnline = item.tipocurso?.toLowerCase().trim() === "online";
        const inscritos = isOnline ? Number(item.CursoRegistados?.length || 0) + 10 : null;

        return (
          <li key={item.id} className="bg-background p-3 px-[14px] w-full h-fit md:h-96 rounded-md shadow-sm flex flex-col gap-2">
            <Link href={cursoLink}
              className="relative w-full min-h-48 h-48 flex justify-center transition duration-300 hover:scale-105">
              <Image
                src={item.Imagens[0]?.url}
                fill
                alt={item.nome}
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-[80%] h-full rounded object-cover"
                blurDataURL="/images/skeleton.gif"
              />
            </Link>

            <div className="flex rounded justify-between items-center">
              <span className="flex items-center gap-1 bg-secondary text-xs px-1 py-1.5 pr-3 rounded-md">
                <Circle
                  size={10}
                  fill={isOnline ? "#30cc2a" : "#00a6fb"}
                  className={isOnline ? "text-[#30cc2a]" : "text-[#00a6fb]"}
                />
                <span className="text-muted-foreground">{item.categoria}</span>
              </span>

              <span className="text-primary text-base font-bold">
                <span className="text-xs font-normal text-muted-foreground">
                  {item.tipocurso.toLowerCase() !== "online" && item.id !== 'language' ? " " : !possuiPacote ? " " : "a partir de "}
                </span>
                MZN {Math.ceil(valorComDesconto)}.00
              </span>
            </div>

            <h3 className="w-full hover:text-primary transition-all duration-150  h-10 text-muted-foreground font-bold leading-5">
              <Link href={cursoLink} className="hidden md:block w-full p-1  h-full text-left ">
                {item.nome.length > 50
                  ? <NameTooltip trigger={item.nome.toLocaleUpperCase().slice(0, 45)} content={item.nome.toUpperCase()} />
                  : item.nome.toUpperCase()}
              </Link>
              <span className="block md:hidden">
                {item.nome.toUpperCase()}
              </span>
            </h3>

            <div className="flex justify-between items-center">
              <span className={`flex items-center gap-1.5 text-xs py-1.5 pr-3 rounded-md`}>
                <Clock7 size={18} fill="#003554" className="text-secondary" />
                <span className="text-muted-foreground">{item.duracao?.toUpperCase().includes("DIAS") ? item.duracao.split(" ")[0] + " Horas" : item.duracao}</span>
              </span>

              <span className="flex items-center gap-1.5 text-xs py-1.5 pr-3 rounded-md">
                <Bookmark size={18} fill="#00a6fb" className={`text-secondary ${item.id === "language" && "hidden "}`} />
                <span className="text-muted-foreground text-xs">{item.tipocurso}</span>
              </span>
            </div>

            <Separator orientation="horizontal" className="bg-gradient-to-r -mt-3 from-cyan-500 to-blue-500" />

            <div className="flex justify-between items-center -mt-2">
              {isOnline && (
                <span className="flex flex-row items-center gap-1.5 text-xs py-1.5 pr-3 rounded-md">
                  <UserRound className="text-muted-foreground" size={22} />
                  <span className="text-muted-foreground text-sm flex flex-row align-middle">
                    {inscritos} Inscritos
                  </span>
                </span>
              )}

              <Link href={cursoLink} className="w-10 h-10 mt-2 rounded-full bg-primary flex items-center justify-center">
                <MoveRight className="text-secondary" />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CursosList;
