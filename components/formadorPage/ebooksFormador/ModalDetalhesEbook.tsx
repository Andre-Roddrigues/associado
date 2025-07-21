// components/ModalDetalhesEbook.tsx
import { X } from "lucide-react";
import Image from "next/image";

export default function ModalDetalhesEbook({ ebook, onClose }: { ebook: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl w-[90%] max-w-4xl shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">
    <button 
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 hover:bg-white transition-all shadow-sm border border-gray-200 hover:border-gray-300 z-10"
          onClick={onClose}
        >
          <X size={18} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-gray-600 p-6">
          <h2 className="text-2xl font-bold text-gray-500">Detalhes do Ebook</h2>
          <p className="text-indigo-100 text-sm mt-1 text-gray-400">Informações completas sobre a publicação</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover + Description */}
            <div className="w-full md:w-1/3 space-y-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src={ebook.Imagens?.[0]?.url || "/images/eventos(3).jpg"}
                  alt={ebook.nome}
                  fill
                  className="object-cover"
                  priority
                />
                {ebook.status === 'Aprovado' && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                    Destaque
                  </div>
                )}
              </div>

              
            </div>

            {/* Details */}
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{ebook.nome}</h3>
                <p className="text-gray-600 font-medium">{ebook.autor}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Categoria</p>
                  <p className="font-medium text-gray-800">{ebook.categoria}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Formato</p>
                  <p className="font-medium text-gray-800">{ebook.format}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Páginas</p>
                  <p className="font-medium text-gray-800">{ebook.pages}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Leitores</p>
                  <p className="font-medium text-gray-800">{ebook.EbookRegistados?.length ?? 0}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex-1 min-w-[120px]">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Preço</p>
                  <p className="text-xl font-bold text-gray-800">
                    {typeof ebook.valor === 'number' 
                      ? `R$ ${ebook.valor.toFixed(2).replace('.', ',')}` 
                      : ebook.valor}
                  </p>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Publicação</p>
                  <p className="font-medium text-gray-800">
                    {ebook.publishDate ? new Date(ebook.publishDate).toLocaleDateString("pt-BR") : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Descrição</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {ebook.description || "Sem descrição disponível."}
                </p>
              </div>
              </div>
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
