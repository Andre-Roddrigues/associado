import CursosList from "@/components/Cursos/CursosList";
import { getCursos } from "@/components/Cursos/actions";
import Image from "next/image";
import subtraction from "@/public/images/Subtraction.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function CursosP() {
    const cursos = await getCursos();

    const cursosFiltrados = cursos.filter((curso: any) => curso.id !== 35 && curso.id !== 46);
    
    const cursosOrdenados = cursosFiltrados.sort((a: any, b: any) => {
        const inscritosA = (a.CursoRegistados?.length || 0) + 10;
        const inscritosB = (b.CursoRegistados?.length || 0) + 10;
        return inscritosB - inscritosA;
    });

    return (
        <section className="h-full flex flex-col items-center w-full bg-secondary px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-screen-xl">
                <div className="text-left py-8 relative">
                    <h2 className="text-2xl sm:text-3xl font-bold text-muted-foreground">
                        Cursos <span className="text-primary">Populares</span>
                    </h2>
                    <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-1/4 sm:translate-x-0 sm:translate-y-0">
                        <Image src={subtraction} alt="" className="w-16 sm:w-24 md:w-32" />
                    </div>
                </div>
                <div className="bg-secondary w-full">
                    <CursosList cursos={cursosOrdenados.slice(0, 8)} />
                </div>
                <div className="flex justify-center sm:justify-end items-center mt-8 sm:mt-20">
                    <Link href="/cursos">
                        <Button
                            className='text-primary px-6 sm:px-10 text-xs sm:text-sm border-2 border-primary bg-background hover:text-background hover:bg-primary w-full sm:w-auto h-9'
                            variant={"outline"}
                        >
                            Ver todos Cursos
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
