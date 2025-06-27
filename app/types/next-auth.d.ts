import { Cursos } from '@/components/types/types';
import NextAuth from 'next-auth'


declare module 'next-auth' {
	interface Session {
		accessToken: string;
		user: {
			accessToken: string;
			iss?: string;
			aud?: string;
			sub?: number;
			estado?: string;
			email?: string;
			contacto?: number;
			nome?: string;
			apelido?: string;
			id?: number;
			curso?: Cursos[];
			iat?: number;
		}
		
	}
}