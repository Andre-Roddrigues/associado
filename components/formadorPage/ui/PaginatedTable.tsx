"use client";

import { useState, useMemo } from "react";

interface PaginatedTableProps<T> {
  data: T[];
  headers: {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
    className?: string; // Para permitir classes como "hidden sm:table-cell"
  }[];
}

export default function PaginatedTable<T>({
  data,
  headers,
}: PaginatedTableProps<T>) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      headers.some((header) => {
        const value = item[header.key];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data, headers]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="w-full overflow-x-auto rounded-lg">
        <div className="min-w-[700px]">
          <table className="w-full border bg-white rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={String(header.key)}
                    className={`px-6 py-3 text-left text-sm font-semibold text-gray-600 ${
                      header.className || ""
                    }`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b text-gray-700 hover:bg-gray-50 transition"
                >
                  {headers.map((header) => (
                    <td
                      key={String(header.key)}
                      className={`px-6 py-4 text-sm ${header.className || ""}`}
                    >
                      {header.render
                        ? header.render(item)
                        : (item[header.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1); // Reset page on change
          }}
        >
          <option value={5}>5 por página</option>
          <option value={15}>15 por página</option>
          <option value={50}>50 por página</option>
        </select>

        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/80"
            }`}
          >
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/80"
            }`}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
