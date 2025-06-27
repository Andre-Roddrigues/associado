import Image from "next/image";
import sos from "@/public/images/sos.png"
import adpp from "@/public/images/addpp white.png"
import avsi from "@/public/images/avsi white.png"
import bni from "@/public/images/bnm white.png"
import municipio from "@/public/images/municipio.png"
import terre from "@/public/images/terre white.png"
import ispm from "@/public/images/logo white.png"
import cooperacao from "@/public/images/ez.png"
import inp from "@/public/images/inp.png"
import { InView } from "@/components/ui/in-view";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
export function ColaboradoresSection() {
  return (
    <section className="bg-secondary h-full w-full">

      <div className="grid grid-cols-1 grid-rows-1 gap-4 w-full lg:clip-path-custom-sectioncolaboradores bg-gradient-to-r from-blue-800 to-cyan-600  md:grid-rows-2 lg:p-24 p-10 md:gap-4">
        <div className=" md:text-2xl text-xl flex justify-center text-center md:mt-40 mb-4 font-extrabold text-muted">
        <InView
          variants={{
            hidden: { opacity: 0, x: 100, filter: 'blur(4px)' },
            visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
          }}
          viewOptions={{ margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <TextEffect
          className=" font-montserrat"
            per='char'
            delay={0.5}
            variants={{
              container: {
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  rotateX: 90,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  transition: {
                    duration: 0.2,
                  },
                },
              },
            }}
          >
            Instituições que colaboram
          </TextEffect>
          <TextEffect per='char' delay={1.5} className="font-montserrat text-2xl">
            connosco
          </TextEffect>
          </InView>
        </div>
        <AnimatedGroup 
        preset='scale'
        className="grid grid-cols-3 p-5 md:p-1 lg:grid-cols-9 grid-rows-1 gap-4"
        >
            <div className=" w-full h-10 flex justify-center">
              <Image src={adpp} alt="ADPP" className="object-contain h-auto w-24" />
            </div>
            <div className=" w-full h-10 flex justify-center">
              <Image src={avsi} alt="AVSI" className="object-contain h-auto w-14" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={bni} alt="BNI" className="object-contain h-auto w-24" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={municipio} alt="Municipio de Chimoio" className="object-contain h-auto w-24" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={terre} alt="Terre des Hommes" className="object-contain h-auto w-24" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={ispm} alt="ISPM" className="object-contain h-auto w-20" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={cooperacao} alt="Cooperacao Alema" className="object-contain h-auto w-24" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={sos} alt="SOS" className="object-contain h-auto w-24" />
            </div>
            <div className="md: w-full h-10 flex justify-center">
              <Image src={inp} alt="INP" className="object-contain h-auto w-24" />
            </div>
          

        </AnimatedGroup>
      </div>
    </section>

  )
}