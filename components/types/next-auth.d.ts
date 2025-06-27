import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			nome: string
			apelido: string
            contactos: string
            curso: []
		}
	}
	
interface FotoAlunos {
    url: string;
    id: number;
    originalname: string;
    filename: string;
    aluno_id: number;
    createdAt: string;
    updatedAt: string;
}

interface AlunoData {
    nome: string;
    apelido: string;
    email: string;
    contacto: number;
    codigo: number;
    createdAt: string;
    updatedAt: string;
    FotoAlunos: FotoAlunos[];
}
}