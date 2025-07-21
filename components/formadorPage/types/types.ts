export interface Curso {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    preco: number;
    alunos: number;
    status: 'Ativo' | 'Desativado';
    imagem: string;
  }

export type Ebook = {
  id: string;
  title: string;
  author: string;
  price: string;
  description: string;
  rating: number;
  totalReviews: number;
  format: string;
  pages: number;
  publishDate: string;
  statePublisher: boolean;
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

  
export interface InstructorResponse {
  id: number;
  nomeCompleto: string;
  email: string;
  contacto: number | string;
  estado: boolean;
  createdAt: string;
  updatedAt: string;
  photoPerfil?: {
    url: string;
    id: number;
    fileName: string;
    originalName: string;
    idInstructor: number;
    createdAt: string;
    updatedAt: string;
  };
  bank?: {
    id: number;
    fullName: string;
    bankName: string;
    bankNumber: string;
    nib: string | null;
    idInstructor: number;
    createdAt: string;
    updatedAt: string;
  };
  carteira?: {
    id: number;
    fullName: string;
    wallet: string;
    phoneNumber: string;
    idInstructor: number;
    createdAt: string;
    updatedAt: string;
  };
}
