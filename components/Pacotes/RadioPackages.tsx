'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Dialog, DialogClose, DialogContainer, DialogContent, DialogDescription, DialogSubtitle, DialogTitle, DialogTrigger } from '../ui/Dialog';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

interface PackageOption {
  id: string;
  label: string;
  value: string;
  description: string;
}

interface RadioPackagesProps {
  options: PackageOption[];
  selectedPackage: string;
  onChange: (id: string) => void;
}

const RadioPackages: React.FC<RadioPackagesProps> = ({ options, selectedPackage, onChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pacote = searchParams.get('pacote') ?? '';



  function handlePacote(value: string) {
      const sp = new URLSearchParams(searchParams);
      if (value.trim() === '') {
        sp.delete('pacote');
      } else {
        sp.set('pacote', value);
      }
      router.push(`${pathname}?${sp.toString()}`,{scroll:false});
     
    }

  return (
    <div className='text-muted-foreground'>
      <h3 className='mb-5 text-left font-bold text-xl p-0 dark:text-white'>
        Escolha Um Pacote
      </h3>
      <ul className='gap-3 grid grid-cols-[repeat(auto-fit,minmax(320px,400px))]'>
        {options.map((option) => (
          <li key={option.id} className='w-full' onClick={()=> handlePacote(option.id)}>
            <Dialog>
            <input
              type='radio'
              id={option.id}
              name='package'
              value={option.value}
              checked={selectedPackage === option.id}
              onChange={() => onChange(option.id)}
              className='hidden peer'
              required
            />
            <label
              htmlFor={option.id}
              className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
            >
              <div className='block'>
                <div className='w-full text-lg font-semibold'>{option.label}</div>
                <div className='w-full'>{option.description}</div>
              </div>
              <DialogTrigger>
              <svg
                className='w-5 h-5 ms-3 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
              </DialogTrigger>
            </label>
            <DialogContainer>
          <DialogContent
            style={{
              borderRadius: '20px',
            }}
            className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
          >
           
            <div className=' flex flex-col items-center justify-center gap-4 text-muted-foreground'>
              <div className='w-full bg-gradient-to-tr from-green-600 to-emerald-00 p-4 flex justify-center items-center h-full'>
                <DialogTitle className='text-3xl text-primary-foreground'>
                  {option.label}8
                </DialogTitle>
                {/* <DialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
                  {option.value}
                </DialogSubtitle> */}
              </div>

              <span className='text-3xl font-semibold text-muted-foreground'>3490,00 / Mês</span>

              <DialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
              >
                <div className={` flex flex-col text-center gap-3 py-4 ${option.value !== "intermediario" && 'hidden'} `}>
                     <span className='flex gap-2 items-center'><Check className='text-green-700'/> Aulas em vídeo</span>
                     <span className='flex gap-2 items-center'><Check className='text-green-700'/> Direito a fichas apoio</span>
                     <span className='flex gap-2 items-center'><Check className='text-green-700'/> Aulas em vídeo</span>
                     <span className='flex gap-2 items-center'><Check className='text-green-700'/> Aulas em vídeo</span>
                     <span className='flex gap-2 items-center'><Check className='text-green-700'/> Aulas em vídeo</span>
                </div>

                <div className={`mt-2 text-zinc-500 dark:text-zinc-500 ${option.value !== "interactivos" && 'hidden'} `}>
                    Interativos LJKDHFVJKJLHKJ
                </div>
                <p className={`mt-2 text-zinc-500 dark:text-zinc-500 ${option.value !== "basico" && 'hidden'} `}>
                    Interativos
                </p>
                <Button className='px-10 rounded-lg mb-5 bg-gradient-to-tr from-green-600 to-emerald-500'>Inscrever-se</Button>
              </DialogDescription>
            </div>
            <DialogClose className='text-primary-foreground' />
          </DialogContent>
        </DialogContainer>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RadioPackages;
