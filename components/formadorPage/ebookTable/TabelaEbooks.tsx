"use client";

import { useEffect, useState } from "react";

type Ebook = {
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
  imageUrl?: string; // URL da imagem do ebook (opcional)
};

export default function TabelaEbooks() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEbooks() {
      try {
        const res = await fetch("/api/ebook");
        const data = await res.json();

        // Adiciona uma imagem temporária em cada item (para exemplo)
        const dataWithImages = data.map((item: Ebook) => ({
          ...item,
          imageUrl:
            item.imageUrl ||
            "https://via.placeholder.com/80x100.png",
        }));

        setEbooks(dataWithImages);
      } catch (error) {
        console.error("Erro ao buscar ebooks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEbooks();
  }, []);

  const formatTipo = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "ebook":
        return "Ebook";
      case "book":
        return "Livro Novo";
      case "livro usado":
        return "Livro Usado";
      default:
        return tipo;
    }
  };

  const formatarMetical = (valor: string) => {
    const numero = parseFloat(valor);
    return numero.toLocaleString("pt-MZ", {
      style: "currency",
      currency: "MZN",
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes spin2 {
            0% {
              stroke-dasharray: 1, 800;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 400, 400;
              stroke-dashoffset: -200px;
            }
            100% {
              stroke-dasharray: 800, 1;
              stroke-dashoffset: -800px;
            }
          }
          .spin2 {
            transform-origin: center;
            animation: spin2 0.2s ease-in-out infinite,
              spin 2.5s linear infinite;
            animation-direction: alternate;
          }
        `}</style>
        <svg
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20"
        >
          <circle
            className="spin2"
            cx="400"
            cy="400"
            fill="none"
            r="218"
            strokeWidth="67"
            stroke="#E387FF"
            strokeDasharray="1131 1400"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );

  if (ebooks.length === 0)
    return <p className="text-center py-8">Nenhum ebook disponível.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-gray-700">Lista de Ebooks</h3>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Imagem
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Autor
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Páginas
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Data de Publicação
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ebooks.map((ebook) => (
              <tr key={ebook.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={ebook.imageUrl}
                    alt={ebook.title}
                    className="w-20 h-24 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {ebook.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {ebook.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">
                  {formatarMetical(ebook.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-semibold">
                  {formatTipo(ebook.format)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {ebook.pages}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {new Date(ebook.publishDate).toLocaleDateString("pt-MZ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
