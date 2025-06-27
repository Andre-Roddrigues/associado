import React, { Suspense } from 'react'
import { LayoutGrid, ListTodo } from 'lucide-react'
import { SearchInput } from '../ui/SearchInput'
import { getCursos, getFilteredCursos, selectedCategoryProps } from './actions'
import CursosList from './CursosList'
import Category from './Category'
import { Cursos, searchParamsProps } from '../types/types'
import Link from 'next/link'
import TipoCursos from './TipoCursoslinks'



async function SectionCursos({category, tipo ,nomeCurso} : selectedCategoryProps){

   
    // const cursos = await getCursos();
    const cursos = await getFilteredCursos({category,tipo,nomeCurso}) 


    const categorias = new Set<string>();

    cursos.forEach((curso : Cursos) => {
        const categoriaNormalizada = curso.categoria.trim().toLowerCase();
        categorias.add(categoriaNormalizada);
      });
    
      const allCategories  =  Array.from(categorias)
   //   console.log(allCategories)

  return (
    <section className='p-5 lg:px-10 text-muted-foreground '>

        <h1 className='text-3xl sm:font-extrabold font-bold pt-[3.125rem] '>Cursos</h1>

        
        <div className='lg:grid lg:grid-cols-[1fr,11.5rem]  lg:grid-rows-[1fr] py-6 gap-10'>
            <div className=' lg:col-[1/2] '>
                
          

                <div className=' flex justify-between items-center p-b6 lg:pb-8'>
                    <div className='flex gap-3 items-center  justify-center'>
                       <span className='text-xs hidden lg:block'>Modo de Visualização</span> <LayoutGrid  size={16} className='font-black text-secondary-foreground ml-2'/> <ListTodo size={16}/> 
                    </div>

           
                    <TipoCursos/>
                    
                    <SearchInput placeholder='o que você deseja estudar?'
                      className='text-xs placeholder:opacity-60 w-56 h-8 placeholder:'
                    />
                    
                </div>
                
                <div className='w-full lg:hidden pb-6 flex flex-col justify-center items-center'>
                   <h3 className='font-bold text-muted-foreground mb-2 text-sm lg:hidden'>Categoria</h3>
                    <Category/>
                </div>

                <div className='bg-secondary w-full'>
                   
                        <CursosList cursos={cursos} />
                </div>


            </div>

           <div className='hidden lg:block'>
                   <Category/>
                </div>
        </div>

    </section>
  )
}

export default SectionCursos