"use client";
import { useState, useRef } from "react";
import { X, Image as ImageIcon, Plus, Trash2, BookOpen, User, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInstructorData } from "../actionsFormador/get-user-actions";
import toast from "react-hot-toast";
import { addBookAction } from "../actionsFormador/addBookAction";
import MultiCategorySelect from "../cursosFormador/MultiCategorySelect";
import { Progress } from "@/components/ui/progress";

export default function ModalLivroUsado({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    rating: "0",
    totalReviews: "0",
    format: "Livro Usado",
    pages: "",
    publishDate: new Date().toISOString().split('T')[0],
    user_id: "",
    mainImage: null as File | null,
    extraImages: [] as File[]
  });
  
  const [previewImages, setPreviewImages] = useState<{main: string | null, extra: string[]}>({
    main: null,
    extra: []
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extraImagesInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, mainImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => ({...prev, main: reader.result as string}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExtraImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - formData.extraImages.length;
    const newImages = files.slice(0, remainingSlots);
    
    // Create previews for new images
    const newPreviews: string[] = [];
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === newImages.length) {
          setPreviewImages(prev => ({
            ...prev,
            extra: [...prev.extra, ...newPreviews]
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    setFormData(prev => ({
      ...prev,
      extraImages: [...prev.extraImages, ...newImages]
    }));
  };

  const removeExtraImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      extraImages: prev.extraImages.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => ({
      ...prev,
      extra: prev.extra.filter((_, i) => i !== index)
    }));
  };

  const removeMainImage = () => {
    setFormData(prev => ({ ...prev, mainImage: null }));
    setPreviewImages(prev => ({...prev, main: null}));
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerExtraImagesInput = () => extraImagesInputRef.current?.click();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.author || !formData.description || !formData.price || !formData.mainImage) {
      toast.error("Por favor, preencha todos os campos obrigatórios e adicione pelo menos a imagem principal.");
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
        format: "Livro Usado",
        pages: formData.pages,
        publishDate: formData.publishDate,
        user_id: user.id.toString(),
        categories: selectedCategories
      };
  
      const result = await addBookAction(bookData);
  
      if (result.success) {
        setUploadProgress(100);
        toast.success("Livro usado publicado com sucesso!");
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
            <h3 className="text-2xl font-bold text-gray-900">Adicionar Livro Usado</h3>
            <p className="text-sm text-gray-500">Detalhes do livro em segunda mão</p>
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
          {/* Book Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
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
                  placeholder="Título do livro"
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
                  placeholder="Autor do livro"
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
                  placeholder="Descreva o estado do livro e outras informações relevantes"
                  className="border-gray-300 focus:border-primary min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
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

              {/* Main Image Upload */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Imagem Principal *
                </Label>
                <div 
                  onClick={triggerFileInput}
                  className={`relative group border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${
                    previewImages.main ? 'border-transparent' : 'border-gray-300 hover:border-gray-400'
                  } cursor-pointer bg-gray-50 h-40`}
                >
                  {previewImages.main ? (
                    <>
                      <img 
                        src={previewImages.main} 
                        alt="Preview" 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-white" />
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
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  disabled={isUploading}
                />
                {previewImages.main && (
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remover imagem
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Extra Images Upload */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-gray-700 font-medium">
                Imagens Extras (Máx. 5)
              </Label>
              {formData.extraImages.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={triggerExtraImagesInput}
                  className="flex items-center gap-1 h-9"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              )}
            </div>
            
            <input
              ref={extraImagesInputRef}
              type="file"
              accept="image/*"
              onChange={handleAddExtraImages}
              multiple
              className="hidden"
              disabled={isUploading}
            />

            {previewImages.extra.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {previewImages.extra.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square border rounded-lg overflow-hidden bg-gray-50">
                      <img 
                        src={preview} 
                        alt={`Extra ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExtraImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {previewImages.extra.length < 5 && (
                  <div 
                    onClick={triggerExtraImagesInput}
                    className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ) : (
              <div 
                onClick={triggerExtraImagesInput}
                className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Clique para adicionar fotos extras</p>
                <p className="text-xs text-gray-400 mt-1">Mostre detalhes do estado do livro</p>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Publicando livro...</span>
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
              disabled={isUploading || !formData.mainImage}
            >
              {isUploading ? "Publicando..." : "Publicar Livro"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}