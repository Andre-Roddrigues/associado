"use client"
import { ChangeEvent, useState } from 'react';
import { Calendar, MapPin, Users, Tag, User, ChevronDown, BookOpen, Monitor, Globe, PhoneCall, AlignLeft, Signal, Send, Image, CheckCircle, X } from 'lucide-react';

interface FormData {
  title: string;
  eventType: string;
  description: string;
  category: string;
  level: string;
  datetime: string;
  location: string;
  maxParticipants: string;
  price: string;
  speaker: string;
  image: File | null;
}

export default function EventForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    eventType: 'presential',
    description: '',
    category: '',
    level: '',
    datetime: '',
    location: '',
    maxParticipants: '',
    price: '',
    speaker: '',
    image: null
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Premium Image Section */}
        <div className="hidden lg:flex bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5"></div>
          <div className="relative z-10 max-w-md text-center">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl mb-8 border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Event illustration" 
                className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video transform transition-all hover:scale-105 duration-500"
              />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 font-serif tracking-tight">Crie Experiências Memoráveis</h2>
            <p className="text-blue-200/90 text-lg mb-6">Transforme sua expertise em eventos excepcionais</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item} 
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${item === 1 ? 'bg-blue-400 w-6' : 'bg-white/30'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Elegant Form Section */}
        <div className="p-6 md:p-10 lg:p-14 flex items-center justify-center bg-white">
          <div className="w-full max-w-lg">
            {/* Form Header */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-3 rounded-xl mr-4 shadow-md">
                  <Calendar className="text-white w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 font-serif tracking-tight">Criar Novo Evento</h1>
                  <p className="text-gray-500 text-sm">Preencha os detalhes para criar um evento premium</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
            
            {/* Form Elements */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Title */}
              <div className="relative">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <BookOpen className="text-blue-600 mr-2 w-5 h-5" />
                  Título do Evento
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-400 bg-white shadow-sm hover:border-gray-300" 
                    placeholder="Workshop de Marketing Digital"
                    required
                  />
                  {formData.title && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Monitor className="text-blue-600 mr-2 w-5 h-5" />
                  Tipo de Evento
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'presential', icon: <Monitor className="w-6 h-6 mb-2" />, label: 'Presencial' },
                    { value: 'online', icon: <Globe className="w-6 h-6 mb-2" />, label: 'Online' },
                    { value: 'hybrid', icon: <PhoneCall className="w-6 h-6 mb-2" />, label: 'Híbrido' }
                  ].map((type) => (
                    <label 
                      key={type.value}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.eventType === type.value 
                          ? 'border-blue-600 bg-blue-50/50 shadow-inner' 
                          : 'border-gray-200 hover:border-blue-400 bg-white shadow-sm'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="eventType" 
                        value={type.value}
                        checked={formData.eventType === type.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className={`${formData.eventType === type.value ? 'text-blue-600' : 'text-gray-500'}`}>
                        {type.icon}
                      </div>
                      <p className={`text-sm font-medium ${
                        formData.eventType === type.value ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {type.label}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <AlignLeft className="text-blue-600 mr-2 w-5 h-5" />
                  Descrição do Evento
                </label>
                <div className="mt-1">
                  <textarea 
                    id="description" 
                    name="description" 
                    rows={4} 
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-400 bg-white shadow-sm hover:border-gray-300" 
                    placeholder="Descreva o conteúdo, objetivos e público-alvo do evento..."
                    required
                  />
                </div>
              </div>

              {/* Category and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Tag className="text-blue-600 mr-2 w-5 h-5" />
                    Categoria
                  </label>
                  <div className="relative">
                    <select 
                      id="category" 
                      name="category" 
                      value={formData.category}
                      onChange={handleChange}
                      className="appearance-none block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300 pr-10"
                      required
                    >
                      <option value="" disabled className="text-gray-400">Selecione uma categoria</option>
                      <option value="business">Negócios</option>
                      <option value="technology">Tecnologia</option>
                      <option value="art">Arte e Cultura</option>
                      <option value="education">Educação</option>
                      <option value="health">Saúde</option>
                      <option value="sports">Esportes</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <ChevronDown className="text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Signal className="text-blue-600 mr-2 w-5 h-5" />
                    Nível
                  </label>
                  <div className="relative">
                    <select 
                      id="level" 
                      name="level" 
                      value={formData.level}
                      onChange={handleChange}
                      className="appearance-none block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300 pr-10"
                      required
                    >
                      <option value="" disabled className="text-gray-400">Selecione o nível</option>
                      <option value="beginner">Iniciante</option>
                      <option value="intermediate">Intermediário</option>
                      <option value="advanced">Avançado</option>
                      <option value="all">Todos os níveis</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <ChevronDown className="text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div>
                <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Calendar className="text-blue-600 mr-2 w-5 h-5" />
                  Data e Hora
                </label>
                <div className="mt-1">
                  <input 
                    type="datetime-local" 
                    id="datetime" 
                    name="datetime" 
                    value={formData.datetime}
                    onChange={handleChange}
                    className="block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <MapPin className="text-blue-600 mr-2 w-5 h-5" />
                  Local (se presencial)
                </label>
                <div className="mt-1">
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm ${
                      formData.eventType === 'online' ? 'bg-gray-100 text-gray-500' : 'hover:border-gray-300'
                    }`}
                    placeholder="Unitec Campus Central"
                    disabled={formData.eventType === 'online'}
                  />
                </div>
              </div>

              {/* Max Participants and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Max Participants */}
                <div>
                  <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Users className="text-blue-600 mr-2 w-5 h-5" />
                    Vagas disponíveis
                  </label>
                  <div className="mt-1">
                    <input 
                      type="number" 
                      id="maxParticipants" 
                      name="maxParticipants" 
                      min="1"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      className="block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300"
                      required
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Tag className="text-blue-600 mr-2 w-5 h-5" />
                    Preço do Ingresso
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">MT</span>
                    </div>
                    <input 
                      type="number" 
                      id="price" 
                      name="price" 
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-12 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300" 
                      placeholder="250"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Speaker/Organizer */}
              <div>
                <label htmlFor="speaker" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <User className="text-blue-600 mr-2 w-5 h-5" />
                  Orador/Organizador
                </label>
                <div className="mt-1">
                  <input 
                    type="text" 
                    id="speaker" 
                    name="speaker" 
                    value={formData.speaker}
                    onChange={handleChange}
                    className="block w-full px-5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Image className="text-blue-600 mr-2 w-5 h-5" />
                  Imagem do Evento
                </label>
                <div className="mt-1">
                  {selectedImage ? (
                    <div className="relative group">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="w-full h-56 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white transition-colors group-hover:scale-110"
                      >
                        <X className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center px-6 pt-10 pb-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center text-sm text-gray-600">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 mb-4 group-hover:border-gray-300 transition-colors shadow-inner">
                          <Image className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all mb-2 font-medium">
                          Selecionar imagem
                        </span>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</p>
                      </div>
                      <input 
                        id="image" 
                        name="image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button 
                  type="submit" 
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Publicar Evento Premium
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}