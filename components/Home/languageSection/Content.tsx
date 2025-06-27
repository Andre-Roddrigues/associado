import { Button } from '@/components/ui/button'
import { InView } from '@/components/ui/in-view'
import Link from 'next/link'
import React from 'react'

function ContentLanguage() {
  return (
    <div className="relative z-10 h-full p-4 flex flex-col justify-center gap-3 lg:p-10  opacity-95 bg-gradient-to-r from-blue-800 to-cyan-600 clip-path-halfClipMobile lg:clip-path-halfClip">
         <InView
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 30,
                            scale: 0.95,
                            filter: 'blur(4px)',
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                        },
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    viewOptions={{ margin: '0px 0px -50px 0px' }}
                >

                    <div className=" flex flex-col justify-center h-full gap">

                        <h1 className='text-xl lg:text-3xl 2xl:text-5xl text-primary-foreground font-bold  lg:py- '>Unitec Language Center</h1>

                        <h2 className='w-full text-xl 2xl:text-3xl  text-secondary opacity-75 font-bold py-2 pr-10'>Inglês, Francês, Mandarim e Português </h2>

                        <p className='text-xs 2xl:text-lg w-[85%] lg:w-1/2 text-secondary py-2'>Torne-se fluente de forma pratica e rápida através do nosso método definitivo e inovador</p>

                        <Link href="/language" className="">
                            <Button
                                className='text-primary text-xs border-primary xl:mt- border-2 bg-background hover:text-primary-foreground mt-0 hover:bg-primary lg:mt- gap-3 2xl:h-12 2xl:text-base w-40 2xl:w-52 h-9'
                                variant={"outline"}
                            >
                                Inscrever-se
                            </Button>
                        </Link>
                    </div>
                    
                </InView>
                
            </div>
  )
}

export default ContentLanguage