import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Requisito } from "@/components/types/types";
import ListCircleIcon from "./listCircleIcon"; 
import { Grid } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface RequisitosProps {
  requisitos: Requisito[];
  objectivo: string | string[];
  tipoCurso: string ;
}

function TabsCurso({ requisitos, objectivo ,tipoCurso}: RequisitosProps) {
  return (
    
    <div className="w-full h-full">
      <Tabs defaultValue="requisitos" className=" w-full h-full " >
            <TabsList className={`grid w-full  grid-cols-3 justify-center items-center my-2 gap-1 text-xs lg:text-base lg:gap-0`} >
            <TabsTrigger
            value="requisitos"
            className="text-wrap md:text-nowrap text-xs md:text-sm pb-0  relative rounded-none border-b-2 border-b-transparent px-4 pb pt-2  focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]: "
            >
            Requisitos
            </TabsTrigger>

            <TabsTrigger
            value="objectivo"
            className=" text-wrap md:text-nowrap text-xs md:text-sm pb-0  relative rounded-none border-b-2 border-b-transparent px-4 pb pt-2  focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]: "
            >
            Objectivo
            </TabsTrigger>
            
            <TabsTrigger
                  value="comoFunciona"
                  className={`${tipoCurso.toLowerCase() === 'presencial' && "hidden"}  text-nowrap text-xs lg:text-sm  mt-2 md:mt-0    relative rounded-none border-b-2 border-b-transparent px-4  pt-2  focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                  Como Funciona
            </TabsTrigger>
            <TabsTrigger
                  value="horarios"
                  className={`${tipoCurso.toLowerCase() !== 'presencial' && "hidden"}  text-nowrap text-xs lg:text-sm      relative rounded-none border-b-2 border-b-transparent px-4  pt-2  focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                  Horários
            </TabsTrigger>


            </TabsList>

            <Separator className="bg-primary  opacity-20" />

            <TabsContent value="requisitos">
            <ul className="pt-3 text-xs xl:text-sm lg:min-h-32 ">
            {requisitos.map((item) => (
                  <li key={item.id}>
                  <p>{item.requisitos}</p>
                  </li>
            ))}
            </ul>
            </TabsContent>

            <TabsContent value="objectivo" className="">
            <ul className="pt-3 text-xs xl:text-sm lg:min-h-32 ">
                  <li>{objectivo}</li>
            </ul>
            </TabsContent>


            <TabsContent value="material" >
                  <ul className="pt-3 text-xs text-left xl:text-sm lg:min-h-32 ">
                        <li>{tipoCurso.toLowerCase() === 'online' ? "Vídeos" : "Manual"}</li>
                        <li>Brochuras</li>
                        <li>Documentos</li>
                  </ul>
            </TabsContent>

            <TabsContent value="comoFunciona" className="" >

                        <ul className="pt-2 text-xs xl:text-sm flex flex-col gap-2   lg:min-h-40 ">
                              <ListCircleIcon>Pode aceder às aulas a qualquer hora do dia ou da noite, bem como fins-de-semana e feriados, em função da sua disponibilidade e disposição, tendo apenas a restrição de ter de terminar o curso até ao último dia de formação.</ListCircleIcon>
                              <ListCircleIcon>As aulas são disponibilizadas na sua Área de Membro.</ListCircleIcon>
                              <ListCircleIcon>Pode ainda interromper uma aula a qualquer momento e recomeçá-la mais tarde, podendo frequentar cada aula quantas vezes desejar.</ListCircleIcon>
                        </ul>
            </TabsContent>
            <TabsContent value="horarios" className="" >

                        <ul className="pt-2 text-xs xl:text-sm flex flex-col gap-2   lg:min-h-40 ">
                              <ListCircleIcon>06:45 - 08:30</ListCircleIcon>
                              <ListCircleIcon>08:35 - 10:20</ListCircleIcon>
                              <ListCircleIcon>10:25 - 12:10</ListCircleIcon>
                              <ListCircleIcon>12:15 - 14:00</ListCircleIcon>
                              <ListCircleIcon>14:05 - 15:50</ListCircleIcon>
                              <ListCircleIcon>15:55 - 17:40</ListCircleIcon>
                              <ListCircleIcon>17:45 - 19:30</ListCircleIcon>
                              <li className="mt-6 text-wrap  text-left"><span className="font-semibold">Nota: </span>Para que determinado curso inicie na data e horário selecionado é necessário que tenha no mínimo 8 inscritos</li>
                              {/* <ListCircleIcon>19:35 - 21:05</ListCircleIcon> */}
                        </ul>
            </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsCurso;
