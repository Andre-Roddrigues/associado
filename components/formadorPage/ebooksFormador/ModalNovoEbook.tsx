"use client";
import { useState, useRef, useEffect } from "react";
import { X, Upload, FileText, Image as ImageIcon, BookOpen, Calendar, User, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addBookAction } from '@/components/formadorPage/actionsFormador/addBookAction';
import { getInstructorData } from '@/components/formadorPage/actionsFormador/get-user-actions';
import toast from "react-hot-toast";
import MultiCategorySelect from "../cursosFormador/MultiCategorySelect";
import { Progress } from "@/components/ui/progress";

export default function ModalNovoEbook({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    rating: "0",
    totalReviews: "0",
    format: "Ebook",
    pages: "",
    publishDate: new Date().toISOString().split('T')[0],
    user_id: "",
    imagem: null as File | null,
    ficheiro: null as File | null
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = e.target.files?.[0] || null;
    if (type === 'image' && file) {
      setFormData(prev => ({ ...prev, imagem: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, ficheiro: file }));
    }
  };

  const triggerFileInput = (type: 'image' | 'file') => {
    if (type === 'image') {
      imageInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  const removeFile = (type: 'image' | 'file') => {
    if (type === 'image') {
      setFormData(prev => ({ ...prev, imagem: null }));
      setPreviewImage(null);
    } else {
      setFormData(prev => ({ ...prev, ficheiro: null }));
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>, type: 'image' | 'file') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (type === 'image' && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, imagem: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (type === 'file' && 
              (file.type === 'application/pdf' || 
               file.name.endsWith('.epub'))) {
      setFormData(prev => ({ ...prev, ficheiro: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.author || !formData.description || !formData.price || !formData.imagem || !formData.ficheiro) {
      toast.error("Por favor, preencha todos os campos obrigatórios e envie os arquivos necessários.");
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
        price: formData.price,
        rating: formData.rating || "0",
        totalReviews: formData.totalReviews || "0",
        format: formData.format,
        pages: formData.pages,
        publishDate: formData.publishDate,
        user_id: user.id.toString(),
        categories: selectedCategories
      };
  
      const result = await addBookAction(bookData);
  
      if (result.success) {
        setUploadProgress(100);
        toast.success("Ebook publicado com sucesso!");
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        toast.error(result.message || "Erro ao publicar o ebook.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao obter dados do usuário ou enviar ebook.");
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
            <h3 className="text-2xl font-bold text-gray-900">Adicionar Novo Ebook</h3>
            <p className="text-sm text-gray-500">Preencha os detalhes do seu ebook</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            disabled={isUploading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Book Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Título *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título do ebook"
                  className="border-gray-300 focus:border-primary h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author" className="text-gray-700 font-medium flex items-center gap-2">
                  <User className="h-4 w-4" /> Autor *
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Nome do autor"
                  className="border-gray-300 focus:border-primary h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                  Categorias *
                </Label>
                <MultiCategorySelect
                  selectedIds={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 font-medium">
                  Descrição *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Breve descrição do ebook"
                  className="border-gray-300 focus:border-primary min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Preço *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="pl-8 border-gray-300 focus:border-primary h-11"
                      required
                    />
                  </div>
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
                    min="0"
                    max="5"
                    step="0.1"
                    className="border-gray-300 focus:border-primary h-11"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - File Uploads and Additional Info */}
            <div className="space-y-4">
              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Imagem de Capa *
                </Label>
                <div 
                  onClick={() => triggerFileInput('image')}
                  className={`relative group border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${
                    previewImage ? 'border-transparent' : 'border-gray-300 hover:border-gray-400'
                  } cursor-pointer bg-gray-50 h-40`}
                >
                  {previewImage ? (
                    <>
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 h-full">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-600 mb-1">Clique para enviar</p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                  )}
                </div>
                <input
                  ref={imageInputRef}
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                  className="hidden"
                  disabled={isUploading}
                />
                {previewImage && (
                  <button
                    type="button"
                    onClick={() => removeFile('image')}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" /> Remover imagem
                  </button>
                )}
              </div>

              {/* Ebook File Upload */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Ficheiro do Ebook *
                </Label>
                <div 
                  onClick={() => triggerFileInput('file')}
                  className={`relative group border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${
                    formData.ficheiro ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  } cursor-pointer bg-gray-50 h-40 flex items-center justify-center`}
                >
                  {formData.ficheiro ? (
                    <div className="text-center p-4">
                      <div className="text-blue-600 mb-2">
                        <FileText className="h-10 w-10 mx-auto" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 truncate max-w-full">
                        {formData.ficheiro.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.ficheiro.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8">
                      <FileText className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-600 mb-1">Clique para enviar</p>
                      <p className="text-xs text-gray-500">PDF, EPUB (MAX. 20MB)</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  id="ebook"
                  type="file"
                  accept=".pdf,.epub"
                  onChange={(e) => handleFileChange(e, 'file')}
                  className="hidden"
                  disabled={isUploading}
                />
                {formData.ficheiro && (
                  <button
                    type="button"
                    onClick={() => removeFile('file')}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" /> Remover arquivo
                  </button>
                )}
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
                    <SelectTrigger className="border-gray-300 focus:border-primary h-11">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ebook">E-book</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="EPUB">EPUB</SelectItem>
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
                    className="border-gray-300 focus:border-primary h-11"
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
                  className="border-gray-300 focus:border-primary h-11"
                />
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Enviando ebook...</span>
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
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-sm h-11 px-8"
              disabled={isUploading || !formData.imagem || !formData.ficheiro}
            >
              {isUploading ? "Publicando..." : "Publicar Ebook"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}