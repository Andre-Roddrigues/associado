
import React from 'react'
import Header from './Header'
import SectionDescricao from './SectionDescricao'
import TabsCurso from './TabsCurso'
import SectionCursosRelacionados from './SectionCursosRelacionados'
import { getCursosById, getPrograma, getRequisitosByCursoId } from '../actions'
import excel from "@/public/images/excel.jpg"
import Image from 'next/image'
import { searchParamsProps } from '@/components/types/types'
import CardsPacotes from '@/components/Pacotes/CardsPacotes'




interface CursosInfoProps {
  cursoID:  any;
  pacote: any;
};

async function CursosInfo( {cursoID, pacote} : CursosInfoProps ) {

    const curso = await getCursosById(cursoID) ;
    const requisitos = await getRequisitosByCursoId(cursoID)
    const objectivo = curso?.objectivo || '';
    const programa = await getPrograma(cursoID);
    const tipoCurso = curso?.tipocurso;
    const image = curso?.Imagens[0].url;

return (
    <main className='text-muted-foreground p-4 flex flex-col  lg:p-7 lg:px-10'>
        <Header curso={curso} pacote={pacote} />

        <div className='grid grid-cols-1 md:grid-cols-2  md:grid-rows-[auto,auto] w-full flex-wrap gap-7 mb-4'>
           
           <div className='flex-1 mt-4 grid grid-rows-[auto,auto]'>
              
              <div className=' w-full min-h-64 md:min-h-[350px] h-full relative  justify-center items-center'>
                <Image src={image} 
                  fill
                  objectFit='cover'
                  alt='Curso de Curso'
                  className=' h-full '
                />
              </div>
            
              <div className=''>
                <TabsCurso objectivo={objectivo} requisitos={requisitos} tipoCurso={tipoCurso}/>
               </div>

            </div>

            <div className='flex-1'>
              <SectionDescricao descricao={curso?.descricao} programa={programa} />   
            </div>
        </div>    
           <CardsPacotes cursoId={cursoID} preco={curso.valor} />
           <SectionCursosRelacionados categoria={curso.categoria} cursoClicado={cursoID} />
  
    </main>
  )
}

export default CursosInfo