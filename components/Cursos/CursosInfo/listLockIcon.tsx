import { Check, Circle, Lock } from 'lucide-react'
import React, { ReactNode } from 'react'

interface ListLockIconProps {
    children: ReactNode;
  }
  
  export default function ListLockIcon({ children }: ListLockIconProps) {
    return (
      <li className='flex text-wrap items-start text-left'>
        <Lock  className='mr-2 -mt-1 max-w-3' />
        {children}
      </li>
    );
  }