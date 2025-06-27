import Image from "next/image";
import { Circle, Clock7, Bookmark, Star, MoveRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import imageLanguage from "@/public/images/imageLinguas.jpg"
import { id } from "date-fns/locale";



const LanguageCourseCard = () => {
  const course = {
    id : "/language",
    nome: "Cursos de Línguas",
    categoria: "Idiomas",
    tipocurso: "",
    valor: "1790",
    duracao: "",
    Imagens: [
      {
        url: "/images/imageLinguas.jpg",
        createdAt: "2024-08-27T08:46:07.000Z",
      },
    ],
  };


  return (
    <li className="bg-background p-3 px-[14px] w-full h-[25.5rem] md:h-96 rounded-md shadow-sm flex flex-col gap-3">
      <Link href={`/language`} className="relative w-full h-[12rem] transition duration-300 hover:scale-105">
        <Image
          src={course.Imagens[0].url}
          fill
          alt={course.nome}
          priority
          loading="eager"
          className="w-full h-full rounded"
          blurDataURL="/images/skeleton.gif"
        />
      </Link>

      <div className="flex rounded justify-between items-center">
        <span className="flex items-center gap-1.5 bg-secondary text-xs px-2 py-1.5 pr-3 rounded-md ">
          <Circle
            size={10}
            fill={`${course.tipocurso.toLowerCase() === "online" ? "#30cc2a" : "#00a6fb"}`}
            className={`${course.tipocurso.toLowerCase() === "online" ? "text-[#30cc2a]" : "text-[#00a6fb]"} `}
          />
          <span className="text-muted-foreground">{course.categoria}</span>
        </span>

        <span className="text-primary text-lg font-bold"><span className="text-muted-foreground">A partir de </span>{course.valor}.00</span>
      </div>

      <h3 className="w-full hover:text-primary transition-all duration-150 text-muted-foreground font-bold leading-5">
        <Link href={`/language`} className="w-full p-1 h-full">
          {course.nome}
        </Link>
      </h3>

      <div className="flex justify-between items-center">
        <span className="flex items-center gap-1.5 text-xs py-1.5 pr-3 rounded-md ">
          <Clock7 size={18} fill={`#003554`} className={`text-secondary`} />
          <span className="text-muted-foreground">{course.duracao.toUpperCase()}</span>
        </span>

        <span className="flex items-center gap-1.5 text-xs py-1.5 pr-3 rounded-md ">
          <Bookmark size={18} fill={`#00a6fb`} className={`text-secondary`} />
          <span className="text-muted-foreground text-xs">{course.tipocurso}</span>
        </span>
      </div>

      <Separator orientation="horizontal" className="bg-gradient-to-r -mt-3 from-cyan-500 to-blue-500 " />

      <div className="flex justify-between items-center -mt-2">
        <span className="flex items-center gap-1.5 text-xs py-1.5 pr-3 rounded-md ">
          <div className="flex ">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={16} fill={`#f6de26`} className="text-[#f6de26]" />
            ))}
          </div>
          <span className="text-muted-foreground text-xs">votos</span>
        </span>

        <Link href={`/language`} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <MoveRight className="text-secondary" />
        </Link>
      </div>
    </li>
  );
};

export default LanguageCourseCard;
