import React from 'react';
import { StepsSection } from '@/components/Landing/ComoFunciona/comoFunciona';
import { HeroSection } from '@/components/Landing/Hero/heroPage';
import { Header } from '@/components/Landing/Header/header';
import { SaqueSection } from '@/components/Landing/Saques/saquesSection';
import { CoursesSection } from '@/components/Landing/CadastrarCurso/cadastrarcurso';
import { FAQ } from '@/components/FAQ/FAQ';
import {PremiumPlatformSection} from '@/components/Landing/info/informacao';
import {AutoresSection} from '@/components/Home/intrutor/SectionAutores';
import { isAuthenticated } from '@/lib/auth-utils';

const Cards: React.FC = () => {
  return (
    <div className='overflow-hidden transition-all  text-white min-h-screen scroll-smooth'>
                  {/* <HeaderWrapper /> */}

      <HeroSection />
      <StepsSection />
      <AutoresSection />
      <SaqueSection />
      <CoursesSection />
      <PremiumPlatformSection />
    </div>
  );
};

export default Cards;
async function HeaderWrapper() {
  const userIsAuthenticated = await isAuthenticated();
  return <Header isAuthenticated={userIsAuthenticated} />;
}