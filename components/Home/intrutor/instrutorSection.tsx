import Image from "next/image"
import teach from "@/public/images/teach.png"
import { Button } from "@/components/ui/button"
import subtraction from "@/public/images/Subtraction.svg"
import Link from "next/link"
import { InView } from "@/components/ui/in-view"
import { TextEffect } from "@/components/ui/text-effect"
import { InViewTypewriterD } from "@/components/ui/InViewTypewriterD"

export function SectionInstrutor() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full bg-secondary gap-4 items-center lg:items-start lg:justify-between">
                <Image src={subtraction} alt="" className="lg:absolute hidden" />
                <div className="lg:ml-8  p-4">
                    <InView
                        variants={{
                            hidden: { opacity: 0, x: -100, filter: 'blur(4px)' },
                            visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                        }}
                        viewOptions={{ margin: '0px 0px 0px 0px' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                        <h2 className="font-bold text-center md:text-left text-muted-foreground text-3xl">
                            Faça parte da <span className="text-primary">nossa <br /> equipe</span>
                        </h2>
                        <InViewTypewriterD className="mt-5 md:items-start text-center md:text-start md:justify-start text-xs font-normal text-muted-foreground">
                            Assim como os alunos online, os professores online
                            também desfrutam da flexibilidade e conveniência do meio. Eles podem ensinar no
                            conforto de suas próprias casas e não precisam estar em um local específico em um
                            horário específico para ensinar ou interagir com seus alunos.
                        </InViewTypewriterD>
                    </InView>
                    <div className="items-center mt-4  justify-center md:items-start md:justify-start flex">
                        <Link href="/instrutor">
                            <Button
                                className='text-background  text-xs border-2 bg-primary hover:text-primary hover:bg-background lg:mt-20 gap-3 w-40 h-9'
                                variant={"outline"}
                            >
                                Cadastre um Curso
                            </Button>
                        </Link>
                    </div>
                </div>
                <InView
                    variants={{
                        hidden: { opacity: 0, x: 100, filter: 'blur(4px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    }}
                    viewOptions={{ margin: '0px 0px 0px 0px' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className="flex justify-center lg:justify-around">
                        <Image src={teach} alt="Imagem de Instrutor" className="lg:absolute h-full  lg:h-96 w-56" />
                    </div>
                </InView>
            </div>
        </>
    )
}