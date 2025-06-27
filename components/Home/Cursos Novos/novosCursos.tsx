import CursosList from "@/components/Cursos/CursosList";
import { getCursosNovos } from "@/components/Cursos/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function CursosNovos() {
    const cursos = await getCursosNovos();

    // Filtrando os cursos para remover os que têm categoria "idioma"
    const cursosFiltrados = cursos.filter((curso: any) => curso?.categoria?.toLowerCase() !== "idioma");

    return (
        <section className="h-full flex flex-col items-center w-full bg-secondary px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-screen-xl">
                <div className="text-left py-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-muted-foreground">
                        Cursos <span className="text-primary">Novos</span>
                    </h2>
                </div>
                <div className="bg-secondary w-full">
                    <CursosList cursos={cursosFiltrados.slice(0, 4)} />
                </div>
                <div className="flex justify-center sm:justify-end items-center mt-8 sm:mt-20">
                    <Link href="/cursos">
                        <Button
                            className="text-primary px-6 sm:px-10 text-xs sm:text-sm border-2 border-primary bg-background hover:text-background hover:bg-primary w-full sm:w-auto h-9"
                            variant={"outline"}
                        >
                            Ver todos cursos
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
