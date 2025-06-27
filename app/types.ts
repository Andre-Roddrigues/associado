import { Cursos } from "@/components/types/types";

interface User {
  accessToken?: string;
  estado?: string;
  email?: string;
  contacto?: number;
  nome?: string;
  apelido?: string;
  id?: number;
  curso?: Cursos[];
  iat?: number;
}