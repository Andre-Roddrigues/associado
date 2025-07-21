interface Image {
  url: string;
  id?: number;
  originalname?: string;
  filename?: string;
  curso_id?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface Usuario {
  id: string;
  nome: string;
  apelido: string;
  contacto: string;
  email: string;
  curso: [];
}

export interface UserProfile {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  courseCount: number;
}

export interface Video {
  id: number;
  url: string;
  fileName: string;
  originalName: string;
  uri: string;
  idInstrutor: number;
  idCourse: number;
  listNumber: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Curso {
  id: number;
  nomeDoCurso: string;
  IdCategoria: number;
  objectivoDoCurso: string;
  descricaoDoCurso: string;
  programaDocurso: string;
  preco: number;
  modalidade: string;
  duracao: string;
  idInstrutor: number;
  estado: boolean;
  maxQnt: number | null;
  createdAt: string;
  updatedAt: string;
  video: Video[];
}

export interface searchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export interface Requisito {
  id: number;
  nomecurso: string;
  id_curso: number;
  requisitos: string;
}
export interface CursoPrograma {
  id: number;
  nomecurso: string;
  programa: string;
  id_curso: number;
}

export const courseLinguas = {
  id: "language",
  nome: "Cursos de Línguas",
  categoria: "Idioma",
  tipocurso: " ",
  valor: "1890",
  duracao: "a partir de 60h",
  Imagens: [
    {
      url: "/images/imageLinguas.jpg",
      createdAt: "2024-08-27T08:46:07.000Z",
    },
  ],
};

export interface Cupom {
  id: string;
  code: string;
  validity: string;
  percent: number;
}

export interface StudentData {
  id: number;
  nome: string;
  apelido: string;
  contacto: number;
  email: string;
  codigo: number;
  createdAt: string;
  updatedAt: string;
  Cupoms: Cupom[];
}

export interface UserSession {
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
  curso?: Curso[];
  exp?: string;
}
