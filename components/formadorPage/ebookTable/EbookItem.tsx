import { Ebook } from "../types/types";

interface EbookItemProps {
  ebook: Ebook;
}

export default function EbookItem({ ebook }: EbookItemProps) {
  return (
    <tr className="hover:bg-gray-50 group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {/* <div className="h-10 w-10 rounded overflow-hidden bg-gray-200">
            {ebook.imagem ? (
              <img src={ebook.imagem} alt={ebook.title} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs text-gray-500 flex items-center justify-center h-full">Sem imagem</span>
            )}
          </div> */}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{ebook.title}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{ebook.author}</td>
      <td className="px-6 py-4 text-sm font-medium">
        <span className="bg-green-100 px-2 py-1 rounded-full text-green-600">
          {parseFloat(ebook.price).toFixed(2)} MTn
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {ebook.format === "ebook" ? "Ebook" : "Livro Físico"}
      </td>
    </tr>
  );
}
