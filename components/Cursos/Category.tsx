"use client"
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import { selectedCategoryProps } from './actions';

interface categoryProps{
    categorias: string[];
}



// function Category({searchParams}:{ searchParams: { [key: string]: string | string | undefined | null }}) {
export default function Category() {

    const categoriasArray = [
        'Idioma',
        'Administração',
        'Saúde',
        'Comunicação',
        'Construção',
        'Informática',
        'Eletrónica',
      ]

     const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const category = searchParams.get('category') ?? '';



    function handleCategoria(value: string) {
        const sp = new URLSearchParams(searchParams);
        if (value.trim() === '') {
          sp.delete('category');
        } else {
          sp.set('category', value);
        }
        router.push(`${pathname}?${sp.toString()}`,{scroll:false});
       
      }
    // console.log("testando se o valor chega: ", category)

  return (
    <div className='w-full flex flex-col items-center gap-2'>
                            <h2 className='font-bold mb-2 text-sm md:text-lg  hidden lg:block'>Categoria</h2>
      <ul className=' lg:pl-5 border-muted-foreground  flex flex-wrap gap-x-4 text-xs lg:text-sm'>
    
      <li onClick={() => handleCategoria('')} className={`cursor-pointer px-2 text-[10px] sm:text-xs lg:text-sm  ${!category && "text-primary border-b border-primary"}`}> Todos</li>
      {categoriasArray.map((item) => (
        <li  key={item} onClick={() => handleCategoria(item)}
            className={`cursor-pointer text-[10px] sm:text-xs lg:text-sm px-2 mb-1 hover:text-primary ${category.toLocaleLowerCase() === item.toLocaleLowerCase() ? 'text-primary border-b border-primary': ''}`}
        >
            {item}
          </li>
        ))}
  </ul>
    </div>
  )
}



