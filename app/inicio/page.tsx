import React from 'react';
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
