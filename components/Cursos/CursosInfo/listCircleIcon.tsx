import { Circle } from 'lucide-react'
import React, { ReactNode } from 'react'

interface ListCircleIconProps {
    children: ReactNode;
  }
  
  export default function ListCircleIcon({ children }: ListCircleIconProps) {
    return (
      <li className='flex text-wrap items-start text-left'>
        <Circle  className='mr-2 -mt-1 max-w-1.5' />
        {children}
      </li>
    );
  }