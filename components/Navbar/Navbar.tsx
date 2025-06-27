'use client';

import React from 'react';
import logo from '@/public/images/icon.ico';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from './navbarItems';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import MenuMobile from './MenuMobile';
import { UserSession } from '../types/types';
import Profile from './profile/Profile';
import PerfilUser from './PerfilUser';

interface props{
  user : any
}
function Navbar({ user} : props) {
  const pathname = usePathname();
 
  const status = user ? "authenticated" : "unauthenticated";
 

  
  return (
    <header className='flex bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 shadow-xl px-4 md:px-10 fixed top-0 left-0 w-full justify-between  items-center h-[8vh]    z-[100]'>
      <Link href={"/"} className=' hidden xl:block'>
        <Image
          src={logo}
          width={41}
          height={41}
          alt="Logotipo da Instituicao - Unitec"
          className='rounded-full hidden xl:block border border-gray-600'
        />
      </Link>

      <div className='pl-0 justify-self-start -ml-4 lg:hidden'>
        <MenuMobile status={status} />
      </div>

      <h1 className=' font-bold text-background md text-lg lg:hidden'>
        Unitec Academy
      </h1>

      <Link href="/" className={`md:hidden flex gap-2.5 pr-2 ${status !== "unauthenticated" ? "hidden" : ""}`}>
        <Image
          src={logo}
          width={35}
          alt="Logotipo da Instituicao - Unitec"
          className='bg-[#030B72] rounded-full'
        />
      </Link>

      <nav className='hidden lg:flex justify-between ml-10 xl:pl-20 xl:ml-20'>
        <ul>
          <li className='flex gap-4'>
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`p-1 transition-all duration-300 text-sm text-white
        hover:text-primary hover:font-bold 
        ${pathname === item.href ? 'text-[#1799d3] font-bold' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </li>

        </ul>
      </nav>

      <div className={`hidden lg:flex gap-5 items-center ${status !== "unauthenticated" ? "lg:hidden" : ""}`}>
        <Link href="/login">
          <Button
            className='text-muted-foreground text-xs border-primary
              hover:text-primary w-20 md:w-24 h-4/5'
            variant={"outline"}
          >
            Entrar
          </Button>
        </Link>
      </div>


      <div className={`${status !== "authenticated" ? "hidden" : ""}`}>
        <PerfilUser status={status} user={user} />
      </div>
    </header>
  );
} 

export default Navbar;
