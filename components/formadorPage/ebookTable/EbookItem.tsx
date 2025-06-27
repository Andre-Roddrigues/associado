interface EbookItemProps {
    ebook: Ebook;
  }
  
  export default function EbookItem({ ebook }: EbookItemProps) {
    return (
      <tr className="hover:bg-gray-50 group">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded overflow-hidden">
              <img src={ebook.imagem} alt={ebook.titulo} className="h-full w-full object-cover" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{ebook.titulo}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{ebook.categoria}</td>
        <td className="px-6 py-4 text-sm font-medium"><span className="bg-green-100 px-2 py-1 rounded-full text-green-600">{ebook.preco.toFixed(2)} Mzn</span></td>
        <td className="px-6 py-4 text-sm text-gray-500">{ebook.vendas} vendas</td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            ebook.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {ebook.status}
          </span>
        </td>
      </tr>
    );
  }
  