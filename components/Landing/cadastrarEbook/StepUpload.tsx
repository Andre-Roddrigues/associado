// components/BookFormSteps/StepUpload.tsx

"use client";

import { ChangeEvent } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";

type StepUploadProps = {
  format: 'ebook' | 'physical' | 'used';
  ebookFile: File | null;
  coverImage: string | null;
  extraImages: string[];
  onEbookFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCoverImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onExtraImagesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeExtraImage: (index: number) => void;
  ebookFileInputRef: React.RefObject<HTMLInputElement>;
  coverImageInputRef: React.RefObject<HTMLInputElement>;
  extraImagesInputRef: React.RefObject<HTMLInputElement>;
};

export default function StepUpload({
  format,
  ebookFile,
  coverImage,
  extraImages,
  onEbookFileChange,
  onCoverImageChange,
  onExtraImagesChange,
  removeExtraImage,
  ebookFileInputRef,
  coverImageInputRef,
  extraImagesInputRef,
}: StepUploadProps) {
  return (
    <div className="text-gray-600">
      {format === 'ebook' && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 mb-6">
          <UploadCloud className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Upload do Arquivo do Ebook</h3>
          <p className="text-gray-500 mb-6">Formatos suportados: PDF, EPUB, MOBI (Máx. 50MB)</p>
          <input
            type="file"
            ref={ebookFileInputRef}
            onChange={onEbookFileChange}
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
            <p className="mt-4 text-sm text-gray-500">Selecionado: {ebookFile.name}</p>
          )}
        </div>
      )}

      {/* Capa */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Imagem da Capa</label>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-32 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
            {coverImage ? (
              <img src={coverImage} alt="Prévia da capa" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="text-gray-400 w-8 h-8" />
            )}
          </div>
          <div>
            <input
              type="file"
              ref={coverImageInputRef}
              onChange={onCoverImageChange}
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

      {/* Imagens extras para livros usados */}
      {format === 'used' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagens Extras (Máx. 5)</label>
          <div className="flex flex-wrap gap-4 mb-3">
            {extraImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Extra ${index + 1}`}
                  className="w-24 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeExtraImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            ref={extraImagesInputRef}
            onChange={onExtraImagesChange}
            className="hidden"
            accept="image/*"
            multiple
          />
          <button
            type="button"
            onClick={() => extraImagesInputRef.current?.click()}
            disabled={extraImages.length >= 5}
            className={`px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium ${
              extraImages.length >= 5 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Adicionar Imagens ({extraImages.length}/5)
          </button>
          <p className="text-xs text-gray-500 mt-1">Mostre o estado atual do livro</p>
        </div>
      )}
    </div>
  );
}
