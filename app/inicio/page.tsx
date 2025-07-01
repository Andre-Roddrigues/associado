import React from 'react';
// import { Hero } from '@/components/Home/hero/hero';
// import { LanguageSection } from '@/components/Home/languageSection/sectionLanguage';
// import { CursosP } from '@/components/Home/Cursos Populares/cursosPopulares';
// import { CursosNovos } from '@/components/Home/Cursos Novos/novosCursos';
// import { SectionInstrutor } from '@/components/Home/intrutor/instrutorSection';
// import { ColaboradoresSection } from '@/components/Home/Colaboradores/sectionColabaores';
// import { SectionCapacitacao } from '@/components/Home/Capacitacao/capacitacao';
// import { RegistoSection } from '@/components/Home/SectionRegisto/registoSection';
// import { ComentariosSection } from '@/components/Home/Comentarios/sectionComentarios';
// import { SeIsncrever } from '@/components/Home/CardsSection/ComoSeInscrver';
// import { CardSection } from '@/components/Home/CardsSection/CardsSection';

import subtraction from "@/public/images/Subtraction.svg"
import Image from 'next/image';
import ParallaxImage from '@/components/Home/languageSection/test';
import { StepsSection } from '@/components/Landing/ComoFunciona/comoFunciona';
import { HeroSection } from '@/components/Landing/Hero/heroPage';
import { Header } from '@/components/Landing/Header/header';
import { SaqueSection } from '@/components/Landing/Saques/saquesSection';
import { CoursesSection } from '@/components/Landing/CadastrarCurso/cadastrarcurso';
import { FAQ } from '@/components/FAQ/FAQ';
import {PremiumPlatformSection} from '@/components/Landing/info/informacao';

const Cards: React.FC = () => {
  return (
    <div className='overflow-hidden transition-all bg-gradient-to-br from-blue-900 to-blue-500 text-white min-h-screen scroll-smooth'>
      <HeroSection />
      <StepsSection />
      <SaqueSection />
      <CoursesSection />
      <PremiumPlatformSection />
    </div>
  );
};

export default Cards;
