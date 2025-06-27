import React from "react";
import Category from "./Category";
import TipoCursos from "./TipoCursoslinks";
import { SearchInput } from "../ui/SearchInput";
import { LayoutGrid, ListTodo } from "lucide-react";
import CursosList from "./CursosList";
import { getCursosLinguas, getFilteredCursos, selectedCategoryProps } from "./actions";
import { courseLinguas, Cursos } from "../types/types";

async function CursosSection({
  category,
  tipo,
  nomeCurso,
}: selectedCategoryProps) {
  const cursos = await getFilteredCursos({ category, tipo, nomeCurso });
  const cursosFiltrados = cursos.filter((curso: any) => curso.id !== 35 && curso.id !== 46);
  
  const todosCursosLinguas = await getCursosLinguas()
  const cursoMaisBarato = todosCursosLinguas.reduce((prev:any, current:any) => 
    prev?.valor < current?.valor ? prev : current
  );
  courseLinguas.valor = cursoMaisBarato?.valor

  const incluirCourseLinguas = 
  !nomeCurso || courseLinguas.nome.toLowerCase().includes(nomeCurso.toLowerCase());

  const cursoComLinguas: Cursos[] =  (category?.toLowerCase() === "idioma" || !category) ? incluirCourseLinguas ? [courseLinguas, ...cursosFiltrados] : [...cursosFiltrados] :[...cursosFiltrados];

  const categorias = new Set<string>();

  cursoComLinguas.forEach((curso: Cursos) => {
    const categoriaNormalizada = curso.categoria.trim().toLowerCase();
    categorias.add(categoriaNormalizada);
  });

  const allCategories = Array.from(categorias);
  return (
    <section  className="text-muted-foreground w-full p-3 sm:p-4 md:p-5 lg:px-10">
      <h1 className=" text-xl lg:text-3xl sm:font-extrabold font-bold py-6 lg:pt-[3.125rem] md:px-8 lg:px-10 ">
        Cursos
      </h1>

      <div className="w-full  pb-6">
        <Category />
      </div>

      <section className="">
        <div className="">
          <div className="flex flex-col lg:w-full sm:flex-row justify-start md:justify-between flex-wrap md:items-center gap-4 py-4 lg:pb-8 md:px-8 lg:px-10">
            {/* <div className="flex gap-3 items-center  lg:justify-center">
              <span className="text-xs lg:text-sm">Modo de Visualização</span>{" "}
              <LayoutGrid
                fill="darkGray"
                size={16}
                className="font-black text-secondary-foreground ml-2"
              />{" "}
              <ListTodo size={16} />
            </div> */}

            <TipoCursos />

            <div className="md:w-56">
              <SearchInput
                placeholder="o que você deseja estudar?"
                className="text-xs placeholder:opacity-60 w-full  h-8 placeholder:"
              />
            </div>
          </div>

          <div className="bg-secondary w-full">
            <CursosList cursos={cursoComLinguas} />
          </div>
        </div>

      </section>
    </section>
  );
}

export default CursosSection;
