"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback} from "use-debounce"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

  }

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // const debounce = useDebounceCallback(handleSearchTitle, 500);
    const debounce = useDebouncedCallback(handleSearchCursos, 500);
    const search = searchParams.get('search') ?? '';


    function handleSearchCursos(value: string) {
        const sp = new URLSearchParams(searchParams)
        if(value.trim() === '') {
            sp.delete('search')
        }else { 
            sp.delete('category')
            sp.delete('tipo')
            sp.set('search', value)
        }
        router.push(`/cursos?${sp.toString()}`,{scroll: false});
    
    }

    return (

          <div className="relative ">
              <input
                type={type}
                className={cn(
                  "flex h-10 w-full items-center p-4 py-2 rounded-md border border-border bg-background text-sm  placeholder:text-zinc-400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50",className
                 
                )}
                ref={ref}
                {...props}
                onChange={e => debounce(e.target.value)}
                defaultValue={search}
                
              />
              
             
              <Search size={30} 
                className="absolute  p-2  inset-y-0 right-0 rounded-r-md top-1/2 transform -translate-y-1/2 cursor-pointer bg-accent text-primary"/>
        </div>
        
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
