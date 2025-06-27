interface Curso {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    preco: number;
    alunos: number;
    status: 'Ativo' | 'Desativado';
    imagem: string;
  }
  interface Ebook {
    id: number;
    titulo: string;
    categoria: string;
    preco: number;
    vendas: number;
    status: 'Ativo' | 'Desativado';
    imagem: string;
  }
    