import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InViewTypewriter } from "@/components/ui/InViewTypewriter";

export function RegistoSection() {
    return (
        <div className="flex flex-col justify-between items-center p-6 gap-4 bg-gradient-to-r from-blue-800 to-cyan-600 ">
            <div className="flex justify-center md:m-3">
                <div className="lg:text-3xl text-3xl font-bold font-montserrat text-background">
                    Quem Somos
                </div>
            </div>
            <div className="flex justify-center text-center ">
                <p className="text-background text-xs py-2  lg:px-10 lg:w-[80%]">
                    A Unitec Academy é uma instituição de educação com regimes presencial e online que conecta pessoas ao conhecimento, oferecendo cursos de alta qualidade para capacitação pessoal e profissional. Também actuamos como um marketplace, permitindo que criadores compartilhem seus conhecimentos e gerem renda.

                    Com foco na excelência, inovação e inclusão, proporcionamos uma experiência de aprendizado flexível e personalizada. Nossa missão é democratizar o acesso à educação e empoderar indivíduos para alcançar seu potencial máximo.
                </p>
            </div>
            <div className="items-center  justify-center flex py-4">
                <Link href="/registro">
                    <Button
                        className='text-primary text-xs border-2 bg-background hover:text-primary hover:bg-background gap-3 w-40 h-9'
                        variant={"outline"}
                    >
                        Inscreva-se Já
                    </Button>
                </Link>
            </div>
        </div>
    );
}
