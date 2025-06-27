import Image from "next/image";
import team from "@/public/images/team.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InView } from "@/components/ui/in-view";

export function SectionCapacitacao() {
    return (
        <div className="grid grid-cols-1 justify-center sm:grid-cols-2  gap-4 bg-secondary h-full">
            <div className="lg:ml-8 justify-center items-center grid p-4">
            <InView
                        variants={{
                            hidden: { opacity: 0, x: -100, filter: 'blur(4px)' },
                            visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                        }}
                        viewOptions={{ margin: '0px 0px 0px 0px' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
            <div className="order-1 sm:order-2 flex flex-col justify-center items-center sm:items-start mt-4 sm:mt-7 text-muted-foreground flex-grow">
                <h2 className="font-bold text-xl sm:text-3xl text-center sm:text-left">
                    Unitec <span className="text-primary">Bpartner</span>
                </h2>
                <p className="text-xs w-10/12 sm:text-sm font-normal mt-4 text-center sm:text-left">
                    Capacite sua equipa para desenvolver habilidades e eleve a produtividade <br /> da sua equipe com uma formação sólida para o desenvolvimento de competências.
                </p>
                <Link href="/bpartner">
                <Button
                    className="text-background mb-5 md:mb-1 text-xs border-primary border-2 bg-primary hover:text-primary mt-4 sm:mt-8 lg:mt-11 w-40 h-9"
                    variant="outline"
                >
                    Solicitar Capacitação
                </Button>
                </Link>
            </div>
            </InView>
            </div>
            <InView
                        variants={{
                            hidden: { opacity: 0, x: 100, filter: 'blur(4px)' },
                            visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                        }}
                        viewOptions={{ margin: '0px 0px 0px 0px' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
            <div className="order-2 sm:order-1 flex justify-center items-end mt-3">
                <Image src={team} alt="Team Image" className="h-auto w-3/4 sm:w-2/4 md:w-6/12" />
            </div>
                </InView>
                
        </div>
    );
}
