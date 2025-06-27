import { routes } from "@/config/routes";

export interface CursoData {
    nomeCompleto: string;
    email: string;
    contacto: string;
    nomeDoCurso: string;
    idCategoria: string;
    objectivoDoCurso: string;
    programaDoCurso: string;
    preco: string;
    modalidade: string;
    duracao: string;
  }
  
  export async function registerCursoInstrutor(data: CursoData) {
    try {
      const response = await fetch(routes.registarcursoinstrutor, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",},
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao registar o curso.");
      }
  
      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error("Erro no envio do curso:", error.message);
      throw error;
    }
  }
  