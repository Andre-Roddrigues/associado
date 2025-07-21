"use client";
import { useState } from "react";
import { X, Upload, FileText, Image, BookOpen, Calendar, User, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addBookAction } from '@/components/formadorPage/actionsFormador/addBookAction';
import { getInstructorData } from '@/components/formadorPage/actionsFormador/get-user-actions';
import toast from "react-hot-toast";


export default function ModalNovoEbook({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: "Programação",
    author: "Andre Guambe",
    description: "teste",
    price: "122",
    rating: "0",
    totalReviews: "0",
    format: "Ebook",
    pages: "20",
    publishDate: "2013-09-01",
    user_id: "10",
    imagem: null as File | null,
    ficheiro: null as File | null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [type === 'image' ? 'imagem' : 'ficheiro']: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.author || !formData.description || !formData.price) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    setIsUploading(true);
  
    try {
      const user = await getInstructorData();
  
      const bookData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        price: formData.price,
        rating: formData.rating || "0",
        totalReviews: formData.totalReviews || "0",
        format: "ebook",
        pages: formData.pages,
        publishDate: formData.publishDate,
        user_id: user.id.toString(),
      };
  
      const result = await addBookAction(bookData);
  
      if (result.success) {
        toast.success("Livro publicado com sucesso!");
        setUploadProgress(100);
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        toast.error(result.message || "Erro ao publicar o livro.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao obter dados do usuário ou enviar livro.");
    } finally {
      setIsUploading(false);
    }
  };
  

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>, type: 'image' | 'file') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (type === 'image' && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, imagem: file }));
    } else if (type === 'file' && 
              (file.type === 'application/pdf' || 
               file.name.endsWith('.epub'))) {
      setFormData(prev => ({ ...prev, ficheiro: file }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-[90%] max-w-4xl shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Adicionar Novo Ebook</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isUploading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Book Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author" className="text-gray-700 font-medium flex items-center gap-2">
                  <User className="h-4 w-4" /> Autor
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="border-gray-300 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Preço
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-gray-700 font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" /> Avaliação
                  </Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - File Uploads and Additional Info */}
            <div className="space-y-4">
              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="cover" className="text-gray-700 font-medium flex items-center gap-2">
                  <Image className="h-4 w-4" /> Imagem de Capa
                </Label>
                <label
                  htmlFor="cover"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    formData.imagem 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFileDrop(e, 'image')}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    {formData.imagem ? (
                      <>
                        <div className="text-green-600 mb-2">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 truncate max-w-full">
                          {formData.imagem.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Clique para enviar</span> ou arraste
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Ebook File Upload */}
              <div className="space-y-2">
                <Label htmlFor="ebook" className="text-gray-700 font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Ficheiro do Ebook
                </Label>
                <label
                  htmlFor="ebook"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    formData.ficheiro 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFileDrop(e, 'file')}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    {formData.ficheiro ? (
                      <>
                        <div className="text-blue-600 mb-2">
                          <FileText className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 truncate max-w-full">
                          {formData.ficheiro.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <FileText className="w-6 h-6 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Clique para enviar</span> ou arraste
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="ebook"
                    type="file"
                    accept=".pdf,.epub,.docx,.txt"
                    onChange={(e) => handleFileChange(e, 'file')}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format" className="text-gray-700 font-medium">
                    Formato
                  </Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-primary">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ebook">E-book</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="epub">EPUB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages" className="text-gray-700 font-medium">
                    Páginas
                  </Label>
                  <Input
                    id="pages"
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishDate" className="text-gray-700 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Data de Publicação
                </Label>
                <Input
                  id="publishDate"
                  name="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalReviews" className="text-gray-700 font-medium">
                  Total de Avaliações
                </Label>
                <Input
                  id="totalReviews"
                  name="totalReviews"
                  type="number"
                  value={formData.totalReviews}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Enviando arquivos...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
              disabled={isUploading || !formData.imagem || !formData.ficheiro}
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : "Salvar Ebook"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}