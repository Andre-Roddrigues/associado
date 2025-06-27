interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number;
  alunos: number;
  status: string;
  imagem: string;
}
interface CursoItemProps {
    curso: Curso;
  }
  
  export default function CursoItem({ curso }: CursoItemProps) {
    return (
      <tr className="hover:bg-gray-50 group">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded overflow-hidden">
              <img src={curso.imagem} alt={curso.titulo} className="h-full w-full object-cover" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{curso.titulo}</div>
              <div className="text-sm text-gray-500">{curso.descricao}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{curso.categoria}</td>
        <td className="px-6 py-4 text-sm font-medium"><span className="bg-green-100 px-2 py-1 rounded-full text-green-600">{curso.preco.toFixed(2)}Mzn</span></td>
        <td className="px-6 py-4 text-sm text-gray-500">{curso.alunos} alunos</td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            curso.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {curso.status}
          </span>
        </td>
      </tr>
    );
  }
  