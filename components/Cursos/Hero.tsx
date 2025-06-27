import React from 'react'
import ButtonInscrever from './button-inscrever'

function HeroCursos() {
  return (
    <section className='h-80  md:h-[75vh] bg-[url("/images/HeroImageCurso.webp")]   bg-no-repeat  bg-cover bg-center lg:bg-cover md:bg-fixed relative'>

      <div className="h-full md:w-11/12 lg:w-[85%] flex flex-col justify-center p-5 sm:p-7 lg:p-9 xl:px-10  bg-gradiesnt-to-r from-blue-800 to-cyan-500 gap-2" >
        <h1 className='text-xl lg:text-3xl 2xl:text-4xl text-primary-foreground font-bold py-1  '>Unitec Academy</h1>

        <p className='text-sm w-10/12 lg:w-full opacity-85 lg:opacity-80 text-secondary py-2 pb-5 md:py-3'>Na Unitec você aprende com especialistas que irão instruir a sua capacitação e <br></br> despertar seu potencial profissional e empreendedor</p>
        <ButtonInscrever />
      </div>

    </section>
  )
}

export default HeroCursos