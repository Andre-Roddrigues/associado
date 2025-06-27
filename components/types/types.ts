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

export interface Cursos {
  valorDescontado?: number;
  desconto?: number;
  id: number | string;
  nome: string;
  objectivo?: string;
  categoria: string;
  descricao?: string;
  valor: string;
  duracao?: string;
  tipocurso: string;
  horario?: string;
  estado?: string;
  Imagens: Image[];
  PacotesCursos?: [
    {
      id: string;
      idCurso: string;
      idPacote: string;
      idMoodle: string;
    }
  ];
  CursoRegistados?: [
    {
      id_aluno: string;
    }
  ];
  inscricao?: {
    id?: string;
    valorDescontado?: number;
    valor?: number;
    desconto?: number;
    idCurso?: number;
  };
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
  curso?: Cursos[];
  exp?: string;
}
