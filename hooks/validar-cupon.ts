import { validarCupon } from "@/components/Cursos/actions"
import { useQuery } from "@tanstack/react-query"



export const useValidarCupon = (cuppon: string, preco:number) =>{
    return useQuery({
        queryKey: ["cuppon"],
        queryFn: async ()=> await validarCupon(cuppon, preco),  
        

    })
}