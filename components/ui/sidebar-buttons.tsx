// components/Sidebar/SidebarButton.tsx
import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from'../ui/button';
import { cn } from '@/lib/utils';
import { SheetClose } from '../ui/sheet';

interface SidebarButtonProps extends ButtonProps {

}

export function SidebarButton({

  className,
  children,
  ...props
}: SidebarButtonProps) {

  return (
    <Button
      className={cn(
        'gap-3 w-full rounded-[10px] justify-start transition-all overflow-hidden duration-300', // Adicionando transição
        className
      )}
      {...props}
    > 
    <div className='flex items-center gap-3'>
       
        <span
          className={`text-base font-medium  transition-[opacity,transform]  duration-300 `}
        >
          {children}
        </span>
    </div>
    </Button>
  );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}

export default SidebarButton;
