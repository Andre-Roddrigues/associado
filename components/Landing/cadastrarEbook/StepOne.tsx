"use client";

import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { ChangeEvent, RefObject } from "react";

interface StepOneProps {
  ebookFile: File | null;
  coverImage: string | null;
  ebookFileInputRef: RefObject<HTMLInputElement>;
  coverImageInputRef: RefObject<HTMLInputElement>;
  handleEbookFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCoverImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


export default function StepOne({
  ebookFile,
  coverImage,
  ebookFileInputRef,
  coverImageInputRef,
  handleEbookFileChange,
  handleCoverImageChange,
}: StepOneProps) {
  return (
    <div>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
        <UploadCloud className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Upload do Arquivo do Ebook</h3>
        <p className="text-gray-500 mb-6">Formatos suportados: PDF, EPUB, MOBI (Máx. 50MB)</p>
        <input
          type="file"
          ref={ebookFileInputRef}
          onChange={handleEbookFileChange}
          className="hidden"
          accept=".pdf,.epub,.mobi"
        />
        <button
          type="button"
          onClick={() => ebookFileInputRef.current?.click()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Selecionar Arquivo
        </button>
        {ebookFile && (
          <p className="mt-4 text-sm text-gray-500">
            Selecionado: {ebookFile.name}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Imagem da Capa</label>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-32 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Prévia da capa"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="text-gray-400 w-8 h-8" />
            )}
          </div>
          <div>
            <input
              type="file"
              ref={coverImageInputRef}
              onChange={handleCoverImageChange}
              className="hidden"
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => coverImageInputRef.current?.click()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Upload da Capa
            </button>
            <p className="text-xs text-gray-500 mt-1">Recomendado: 1200x1800px, JPG ou PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
