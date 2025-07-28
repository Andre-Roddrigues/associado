"use client";
import { useState, useRef, useEffect } from "react";
import { X, Upload, Image as ImageIcon, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { addBookAction } from "../actionsFormador/addBookAction";
import { getInstructorData } from "../actionsFormador/get-user-actions";
import { Progress } from "@/components/ui/progress";
import MultiCategorySelect from "../cursosFormador/MultiCategorySelect";
import EditoraSelect from "../cursosFormador/EditoraSelect";

export default function ModalLivroNovo({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    synopsis: "",
    price: "",
    rating: "0",
    totalReviews: "0",
    format: "Livro Novo",
    pages: "",
    publishDate: new Date().toISOString().split('T')[0],
    user_id: "",
    imagem: null as File | null
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [editoraId, setEditoraId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagem: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imagem: null }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.author || !formData.description || !formData.price) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    setIsUploading(true);
    setUploadProgress(0);
  
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
  
    try {
      const user = await getInstructorData();
  
      const bookData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        synopsis: formData.synopsis,
        price: formData.price,
        rating: formData.rating || "0",
        totalReviews: formData.totalReviews || "0",
        format: "Livro Novo",
        pages: formData.pages,
        publishDate: formData.publishDate,
        user_id: user.id.toString(),
      };
  
      const result = await addBookAction(bookData);
  
      if (result.success) {
        setUploadProgress(100);
        toast.success("Livro publicado com sucesso!");
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
      clearInterval(interval);
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl w-full max-w-4xl shadow-xl border border-gray-200 overflow-y-auto max-h-[95vh]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Adicionar Livro Novo</h3>
            <p className="text-sm text-gray-500">Preencha os detalhes do seu livro</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Book Cover Upload */}
            <div className="space-y-6">
              <div>
                <Label className="text-gray-700 font-medium block mb-2">
                  Capa do Livro
                </Label>
                <div 
                  onClick={triggerFileInput}
                  className={`relative group border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${
                    previewImage ? 'border-transparent' : 'border-gray-300 hover:border-gray-400'
                  } cursor-pointer bg-gray-50`}
                >
                  {previewImage ? (
                    <>
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-64 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 h-64">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-600 mb-1">Clique para enviar</p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {previewImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" /> Remover imagem
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                                <Label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                  Categorias *
                                </Label>
                                <MultiCategorySelect
                                  selectedIds={selectedCategories}
                                  onChange={setSelectedCategories}
                                />
                              </div>
                <div>
                  <Label htmlFor="pages" className="text-gray-700 font-medium block mb-2">
                    Número de Páginas
                  </Label>
                  <Input
                    id="pages"
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-primary focus:ring-primary h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="publishDate" className="text-gray-700 font-medium block mb-2">
                    Data de Publicação
                  </Label>
                  <Input
                    id="publishDate"
                    name="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-primary focus:ring-primary h-11"
                  />
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-700 font-medium block mb-2">
                  Título do Livro *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título do livro"
                  className="border-gray-300 focus:border-primary focus:ring-primary h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author" className="text-gray-700 font-medium block mb-2">
                  Autor *
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Nome do autor"
                  className="border-gray-300 focus:border-primary focus:ring-primary h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-700 font-medium block mb-2">
                  Preço *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="pl-8 border-gray-300 focus:border-primary focus:ring-primary h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishDate" className="text-gray-700 font-medium flex items-center gap-2">
                  <NotebookPen className="h-4 w-4" /> Editora
                </Label>
                      <EditoraSelect selectedId={editoraId ?? undefined} onChange={setEditoraId} />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700 font-medium block mb-2">
                  Descrição *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Breve descrição do livro"
                  className="border-gray-300 focus:border-primary focus:ring-primary min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="synopsis" className="text-gray-700 font-medium block mb-2">
                  Sinopse
                </Label>
                <Textarea
                  id="synopsis"
                  name="synopsis"
                  value={formData.synopsis}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Sinopse detalhada do livro"
                  className="border-gray-300 focus:border-primary focus:ring-primary min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Enviando livro...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 h-11 px-6"
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-sm h-11 px-8"
              disabled={isUploading}
            >
              {isUploading ? "Publicando..." : "Publicar Livro"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}