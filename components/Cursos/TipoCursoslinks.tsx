"use client"
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


function TipoCursos() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tipoCurso = searchParams.get('tipo') ?? 'online';

    const sp = new URLSearchParams(searchParams);

    function handleTipoCurso(value: string) {
        const sp = new URLSearchParams(searchParams);
        if (value.trim() === '') {
          sp.delete('tipo');
        } else {
          sp.delete('search');
          sp.set('tipo', value);
        }
        router.push(`${pathname}?${sp.toString()}`,{scroll:false});
       
      }
    
   //   console.log(tipoCurso)
    
  return (
    <nav>
        <ul className='flex items-center gap-4 text-xs lg:text-sm' >
            <li onClick={() => handleTipoCurso("")}
               className={`relative ${tipoCurso === 'online' && " text-primary"} cursor-pointer p-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] `}> 
                        Cursos Online                 
                
            </li>

            {/* <li onClick={() => handleTipoCurso("aovivo")}
               className={`relative ${tipoCurso === 'aovivo' && " text-primary"} cursor-pointer p-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] `}> 
                        
                        Cursos ao vivo                 
            </li> */}

            <li onClick={() => handleTipoCurso("presencial")}
               className={`relative ${tipoCurso === 'presencial' && " text-primary "} cursor-pointer p-1 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] `}> 
                    
                    Cursos Presenciais                 
            </li>
            
        </ul>
    </nav>
  )
}

export default TipoCursos