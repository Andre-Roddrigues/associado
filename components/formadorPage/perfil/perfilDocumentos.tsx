import React from 'react';
import { Upload, FileText, Eye, CheckCircle, Clock } from 'lucide-react';

const PerfilDocumentos = () => {
  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-600">
        <FileText className="text-blue-600 mr-3" size={24} />
        Documentos de Identificação
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <label className="block text-gray-500 font-medium">Carregar Documento de Identificação</label>
          <div className="border-2 border-dashed border-blue-100 rounded-xl p-6 text-center bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 transition-all cursor-pointer group">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Upload className="text-blue-600" size={28} />
            </div>
            <p className="text-gray-600 mb-4">Arraste seu documento aqui ou clique para selecionar</p>
            <input 
              type="file" 
              id="id-upload" 
              className="hidden" 
              accept="image/*,.pdf" 
            />
            <label 
              htmlFor="id-upload"
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Selecionar Arquivo
            </label>
            <p className="text-xs text-gray-400 mt-4">Formatos aceitos: JPG, PNG, PDF (até 5MB)</p>
          </div>
        </div>
        
        {/* Current Document Section */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">Documento Atual</label>
          <div className="border border-gray-200 rounded-xl p-5 flex items-center justify-between bg-white hover:bg-blue-50 transition-colors shadow-sm">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">BI 1234567LA</p>
                <p className="text-sm text-gray-500 mt-1">Carregado em: 15/03/2023</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors">
              <Eye size={20} />
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Data de Expiração</label>
            <div className="relative">
              <input 
                type="date" 
                id="doc-expiry" 
                defaultValue="2028-03-15" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilDocumentos;