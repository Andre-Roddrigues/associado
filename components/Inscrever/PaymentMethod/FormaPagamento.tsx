import React from 'react'
import masterCardLogo from '@/public/images/masterCardIcon.png'
import visaLogo from '@/public/images/visaIcon.png'
import emola from '@/public/images/emola.png';
import mpesaLogo from '@/public/images/Mpesa-logo.png';
import Image from 'next/image';

function FormaPagamento() {
  return (
    <div className='flex gap-3 items-center'>
      <Image src={mpesaLogo} alt="Forma de pagamento" className='h-[1.65rem] rounded-md w-auto' />
      <Image src={emola} alt="Forma de pagamento" className='h-[1.65rem] rounded-md w-auto' />
        <Image src={visaLogo} alt="Forma de pagamento" className='h-9 w-auto' />
        <Image src={masterCardLogo} alt="Forma de pagamento" className='h-9 w-auto' />
    </div>
  )
}

export default FormaPagamento