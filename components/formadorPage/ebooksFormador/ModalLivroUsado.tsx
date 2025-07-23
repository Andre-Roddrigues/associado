"use client";
import { useState, useRef } from "react";
import { X, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getInstructorData } from "../actionsFormador/get-user-actions";
import toast from "react-hot-toast";
import { addBookAction } from "../actionsFormador/addBookAction";

export default function ModalLivroUsado({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: "Programação",
    author: "Andre Guambe",
    description: "teste",
    price: "122",
    rating: "0",
    totalReviews: "0",
    format: "Livro Usado",
    pages: "20",
    publishDate: "2013-09-01",
    user_id: "10",
    mainImage: null as File | null,
    extraImages: [] as File[]
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extraImagesInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, mainImage: e.target.files?.[0] || null }));
  };

  const handleAddExtraImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - formData.extraImages.length;
    const newImages = files.slice(0, remainingSlots);
    
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
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerExtraImagesInput = () => extraImagesInputRef.current?.click();
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
        format: "Livro Usado",
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

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-[90%] max-w-4xl shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Adicionar Livro Usado</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Páginas</Label>
                  <Input
                    id="pages"
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="format">Formato</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Livro Físico</SelectItem>
                    <SelectItem value="used">Usado</SelectItem>
                    <SelectItem value="rare">Raro/Especial</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="publishDate">Data de Publicação</Label>
                <Input
                  id="publishDate"
                  name="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Main Image Upload */}
          <div className="space-y-2">
            <Label>Imagem Principal do Livro</Label>
            <div 
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                formData.mainImage ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {formData.mainImage ? (
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-sm font-medium truncate max-w-full">{formData.mainImage.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(formData.mainImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-blue-500">Clique para adicionar imagem principal</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG (MAX. 5MB)</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Extra Images Upload */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Imagens Extras (Máx. 5)</Label>
              {formData.extraImages.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={triggerExtraImagesInput}
                  className="flex items-center gap-1 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600"
                >
                  <Plus className="h-4 w-4 text-white" />
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
              className="hidden text-gray-500"
            />

            {formData.extraImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formData.extraImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="border rounded-lg p-2 h-32 flex flex-col items-center justify-center bg-gray-50">
                      <ImageIcon className="w-6 h-6 text-blue-500 mb-1" />
                      <p className="text-xs font-medium truncate w-full text-center text-gray-500">{file.name}</p>
                      <p className="text-2xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
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
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                <p className="text-sm text-gray-500">Nenhuma imagem extra adicionada</p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 text-gray-500">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white"
            >
              Salvar Livro
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}