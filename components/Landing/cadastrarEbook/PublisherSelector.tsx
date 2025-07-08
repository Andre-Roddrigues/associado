"use client";

import React from "react";

interface PublisherSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const PublisherSelector: React.FC<PublisherSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="publisherId" className="block text-sm font-medium text-gray-700 mb-1">Editora*</label>
      <select
        id="publisherId"
        name="publisherId"
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        <option value="">Selecione uma editora</option>
        <option value="1">Editora A</option>
        <option value="2">Editora B</option>
        <option value="3">Editora C</option>
      </select>
    </div>
  );
};
