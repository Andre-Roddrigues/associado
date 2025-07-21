"use client";
import { useState } from "react";
import EbookItem from "../ebookTable/EbookItem";

export default function TabelaEbooks() {
  const [ebooks, setEbooks] = useState<Ebook[]>([
    {
      id: 1,
      titulo: "React para Iniciantes",
      categoria: "Programação",
      preco: 29.99,
      vendas: 80,
      status: "Ativo",
      imagem: "/images/ICON-10.png"
    },
    {
      id: 3,
      titulo: "React Básico",
      categoria: "Programação",
      preco: 29.99,
      vendas: 80,
      status: "Ativo",
      imagem: "/images/ICON-12.png"
    },
    {
      id: 3,
      titulo: "React Avançado",
      categoria: "Programação",
      preco: 29.99,
      vendas: 80,
      status: "Ativo",
      imagem: "/images/ICON-16.png"
    },
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-gray-700">Últimos Ebooks</h3>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ebook</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Leitores</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ebooks.map(ebook => (
              <EbookItem key={ebook.id} ebook={ebook} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
