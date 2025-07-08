"use client";

import React from "react";

interface LibrarySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LibrarySelector: React.FC<LibrarySelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="libraryId" className="block text-sm font-medium text-gray-700 mb-1">Biblioteca*</label>
      <select
        id="libraryId"
        name="libraryId"
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        <option value="">Selecione uma biblioteca</option>
        <option value="1">Biblioteca Central</option>
        <option value="2">Biblioteca Setorial A</option>
        <option value="3">Biblioteca Setorial B</option>
      </select>
    </div>
  );
};
