"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, UploadCloud, Image as ImageIcon, ArrowRight, ArrowLeft, CheckCircle, X, Plus } from 'lucide-react';

export function BookUploadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [format, setFormat] = useState<'ebook' | 'physical' | 'used'>('ebook');
  const [ebookFile, setEbookFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    author: '',
    pages: '',
    description: '',
    categories: [] as string[],
    price: '',
    discountPercentage: '',
    rating: '',
    totalReviews: '',
    quantity: '',
    bookCondition: '',
    observation: '',
    language: '',
    publishDate: '',
    premiumDistribution: false,
    enableDRM: false,
    acceptPromotions: false
  });

  const ebookFileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const extraImagesInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 'Upload', icon: <UploadCloud className="w-5 h-5" /> },
    { id: 'Detalhes', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'Configurações', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const defaultCategories = [
    'Ficção', 'Não-Ficção', 'Negócios', 
    'Tecnologia', 'Autoajuda', 'Biografia',
    'Romance', 'Fantasia', 'Ciência',
    'História', 'Infantil', 'Educação'
  ];

  const languages = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'Inglês' },
    { value: 'es', label: 'Espanhol' },
    { value: 'fr', label: 'Francês' },
    { value: 'de', label: 'Alemão' },
    { value: 'it', label: 'Italiano' }
  ];

  const conditions = [
    { value: 'new', label: 'Novo' },
    { value: 'like_new', label: 'Como novo' },
    { value: 'good', label: 'Bom estado' },
    { value: 'fair', label: 'Estado razoável' },
    { value: 'poor', label: 'Danificado' }
  ];

  const handleEbookFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEbookFile(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleExtraImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + extraImages.length > 5) {
        alert('Você pode adicionar no máximo 5 imagens extras');
        return;
      }
      
      const newImages: string[] = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target?.result as string);
          if (newImages.length === files.length) {
            setExtraImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeExtraImage = (index: number) => {
    setExtraImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedCategories: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      categories: selectedCategories
    }));
  };

  const handleAddCategory = () => {
    setShowCategoryInput(true);
    setTimeout(() => {
      categoryInputRef.current?.focus();
    }, 0);
  };

  const handleNewCategoryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCategory.trim()) {
      e.preventDefault();
      if (!formData.categories.includes(newCategory.trim())) {
        setFormData(prev => ({
          ...prev,
          categories: [...prev.categories, newCategory.trim()]
        }));
      }
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const removeCategory = (index: number) => {
    const newCategories = formData.categories.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const handleToggleChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof formData]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (format === 'ebook' && !ebookFile) {
        alert('Por favor, faça upload do arquivo do ebook');
        return false;
      }
      if (!coverImage) {
        alert('Por favor, adicione uma imagem de capa');
        return false;
      }
      if (format === 'used' && extraImages.length === 0) {
        alert('Por favor, adicione pelo menos uma imagem extra para livros usados');
        return false;
      }
    }
    
    if (step === 2 && (!formData.title || !formData.author)) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return false;
    }

    if (step === 3 && formData.publishDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const publishDate = new Date(formData.publishDate);
      
      if (publishDate < today) {
        alert('A data de publicação não pode ser no passado');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Formulário enviado:', { 
        ...formData, 
        format,
        ebookFile: format === 'ebook' ? ebookFile : null,
        coverImage,
        extraImages: format === 'used' ? extraImages : []
      });
      alert('Livro enviado com sucesso!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Seção de Imagem */}
      <div className="lg:w-full bg-gradient-darkblue-light p-12 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-6"
          >
            Compartilhe Seu Conhecimento
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl mb-8"
          >
            Publique seu livro e alcance milhares de leitores em todo o mundo. Nossa plataforma torna a publicação fácil e recompensadora.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep > index ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-10'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-sm">{step.id}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-16 ${currentStep > index ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-10'}`} />
                )}
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-3">Dicas para Sucesso</h3>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-300" />
                <span>Use imagens de capa de alta qualidade (mín. 1200x1800px)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-300" />
                <span>Escreva uma descrição atraente com palavras-chave</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-300" />
                <span>Escolha categorias relevantes para melhor visibilidade</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      
      {/* Seção do Formulário */}
      <div className="lg:w-full text-white p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Publicar Novo Livro
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-8"
          >
            Complete todas as etapas para publicar seu livro
          </motion.p>
          
          {/* Tabs para selecionar o formato */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                onClick={() => setFormat('ebook')}
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                  format === 'ebook'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Ebook
              </button>
              <button
                type="button"
                onClick={() => setFormat('physical')}
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                  format === 'physical'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Livro Físico
              </button>
              <button
                type="button"
                onClick={() => setFormat('used')}
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                  format === 'used'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Livro Usado
              </button>
            </div>
          </div>
          
          {/* Progresso */}
          <motion.div 
            className="flex items-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex-1 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-indigo-600 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between absolute w-full max-w-2xl -mt-4">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep > index 
                      ? 'bg-indigo-600 text-gray-600' 
                      : currentStep === index + 1 
                        ? 'bg-indigo-600 text-gray-600' 
                        : 'border-2 border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Passos do Formulário */}
          <div className="relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Passo 1: Upload */}
              <motion.div
                initial={currentStep === 1 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 1 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 1 ? 'block text-gray-600' : 'hidden'}
              >
                {format === 'ebook' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 mb-6">
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
                      className="px-6 py-3 bg-indigo-600 text-dark-blue rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Selecionar Arquivo
                    </button>
                    {ebookFile && (
                      <p className="mt-4 text-sm text-gray-500">
                        Selecionado: {ebookFile.name}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="mb-6">
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
                            className="absolute -top-2 -right-2 bg-red-500 text-dark-blue rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input 
                      type="file" 
                      ref={extraImagesInputRef}
                      onChange={handleExtraImagesChange}
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                    <button
                      type="button"
                      onClick={() => extraImagesInputRef.current?.click()}
                      disabled={extraImages.length >= 5}
                      className={`px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium ${
                        extraImages.length >= 5 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Adicionar Imagens ({extraImages.length}/5)
                    </button>
                    <p className="text-xs text-gray-500 mt-1">Mostre o estado atual do livro</p>
                  </div>
                )}
              </motion.div>
              
              {/* Passo 2: Detalhes */}
              <motion.div
                initial={currentStep === 2 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 2 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 2 ? 'block space-y-6' : 'hidden'}
              >
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título do Livro*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Digite o título do livro"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Nome do Autor*</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Digite o nome do autor"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Digite o ISBN (opcional)"
                  />
                </div>
                
                {format !== 'ebook' && (
                  <div>
                    <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">Número de Páginas</label>
                    <input
                      type="number"
                      id="pages"
                      name="pages"
                      value={formData.pages}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Digite o número de páginas"
                    />
                  </div>
                )}
                
                {format === 'used' && (
                  <div>
                    <label htmlFor="bookCondition" className="block text-sm font-medium text-gray-700 mb-1">Estado do Livro</label>
                    <select
                      id="bookCondition"
                      name="bookCondition"
                      value={formData.bookCondition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      <option value="">Selecione o estado</option>
                      {conditions.map(condition => (
                        <option key={condition.value} value={condition.value}>{condition.label}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                {format === 'used' && (
                  <div>
                    <label htmlFor="observation" className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                    <textarea
                      id="observation"
                      name="observation"
                      value={formData.observation}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Descreva quaisquer danos ou particularidades do livro"
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Escreva uma descrição atraente para seu livro"
                  />
                </div>
                
                <div>
                  <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">Categorias</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.categories.map((category, index) => (
                      <div key={index} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {category}
                        <button
                          type="button"
                          onClick={() => removeCategory(index)}
                          className="ml-2 text-indigo-600 hover:text-indigo-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      id="categories"
                      name="categories"
                      multiple
                      value={formData.categories}
                      onChange={handleCategoryChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    >
                      {defaultCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-3 bg-indigo-600 text-dark-blue rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {showCategoryInput && (
                    <div className="mt-2">
                      <input
                        type="text"
                        ref={categoryInputRef}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={handleNewCategoryKeyDown}
                        onBlur={() => setShowCategoryInput(false)}
                        placeholder="Digite uma nova categoria e pressione Enter"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Mantenha pressionado Ctrl para selecionar múltiplas categorias</p>
                </div>
              </motion.div>
              
              {/* Passo 3: Configurações */}
              <motion.div
                initial={currentStep === 3 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 3 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 3 ? 'block space-y-6' : 'hidden'}
              >
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Preço (BRL)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">R$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                
                {format !== 'used' && (
                  <div>
                    <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
                    <input
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                )}
                
                {format === 'physical' && (
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantidade Disponível</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Digite a quantidade em estoque"
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    <option value="">Selecione o idioma</option>
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                </div>
                
                {format === 'ebook' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opções de Publicação</label>
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.premiumDistribution}
                          onChange={() => handleToggleChange('premiumDistribution')}
                          className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          <span className="font-medium">Distribuição Premium</span><br />
                          <span className="text-gray-500">Distribuir para grandes varejistas como Amazon, Apple Books, etc.</span>
                        </span>
                      </label>
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.enableDRM}
                          onChange={() => handleToggleChange('enableDRM')}
                          className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          <span className="font-medium">Ativar DRM</span><br />
                          <span className="text-gray-500">Adicionar proteção de gerenciamento de direitos digitais</span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="publish-date" className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
                  <input
                    type="date"
                    id="publish-date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  {formData.publishDate && new Date(formData.publishDate) < new Date(new Date().setHours(0, 0, 0, 0)) && (
                    <p className="text-sm text-red-500 mt-1">A data de publicação não pode ser no passado</p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptPromotions"
                      checked={formData.acceptPromotions}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      <span className="font-medium">Aceitar Promoções</span><br />
                      <span className="text-gray-500">Receber ofertas especiais e promoções para este livro</span>
                    </span>
                  </label>
                </div>
              </motion.div>
              
              {/* Botões de Navegação */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </button>
                )}
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-indigo-600 text-dark-blue rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                  >
                    Próximo <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-green-600 text-dark-blue rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Publicar Livro
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookUploadForm;