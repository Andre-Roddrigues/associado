import { getPackage } from "@/components/Cursos/actions"
import { useQuery } from "@tanstack/react-query"



export const usePackages =() =>{
    return useQuery({
        queryKey: ["pacotes"],
        queryFn: async ()=> await getPackage(),  
        staleTime: 1000 * 60 * 5, // 5 minutos

    })
}