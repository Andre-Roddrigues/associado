import { Check } from 'lucide-react'
import React from 'react'

interface props{
    children: React.ReactNode; 
    pacote? : string;
 
}
function PacotesItem({children ,pacote}:props ) {
  return (
    <div className={`flex gap-1 `}>
        <Check className={``}/> <div className='text-muted-foreground text-left'>{children}</div>
    </div>
  )
}

export default PacotesItem