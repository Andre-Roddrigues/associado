'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCheck, FaCheckCircle, FaChalkboardTeacher, FaClock, FaDollarSign, FaHeading, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import { InputField } from '@/components/ui/inputField';

export default function MentorshipForm() {
  const [showLocation, setShowLocation] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLocation(e.target.value === 'presencial');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const obj: Record<string, any> = {};
    data.forEach((value, key) => (obj[key] = value));
    console.log('Form Data:', obj);
    setShowModal(true);
    form.reset();
    setShowLocation(false);
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        {/* Left side - Premium showcase */}
        <div className="hidden lg:flex flex-col items-start p-12 rounded-3xl bg-gradient-to-br from-blue-800 to-indigo-700 text-white relative overflow-hidden border border-blue-300/20 shadow-2xl">
            <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-6 leading-tight">
                Eleve seu <span className="text-blue-200">Impacto</span> como Mentor
                </h1>
                <p className="text-lg text-blue-100 mb-8">
                Compartilhe seu conhecimento e transforme vidas através de mentorias personalizadas. Nossa plataforma conecta você com mentees que precisam da sua experiência para crescer pessoal e profissionalmente.
                </p>

                <div className="space-y-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-300 text-xl" />
                    </div>
                    <div className="ml-4">
                    <h3 className="font-semibold text-blue-50">Visibilidade</h3>
                    <p className="mt-1 text-sm text-blue-100">
                        Apareça nos primeiros resultados de busca, com destaque em nossa página inicial para atrair mais mentorandos.
                    </p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-300 text-xl" />
                    </div>
                    <div className="ml-4">
                    <h3 className="font-semibold text-blue-50">Ferramentas Profissionais</h3>
                    <p className="mt-1 text-sm text-blue-100">
                        Crie sessões individuais ou em grupo, gerencie sua agenda e envie materiais diretamente pela plataforma.
                    </p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-300 text-xl" />
                    </div>
                    <div className="ml-4">
                    <h3 className="font-semibold text-blue-50">Suporte Prioritário</h3>
                    <p className="mt-1 text-sm text-blue-100">
                        Atendimento rápido e personalizado para solucionar dúvidas, problemas técnicos ou otimizar seu perfil.
                    </p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg">
                    <FaCheckCircle className="text-blue-300 text-xl" />
                    </div>
                    <div className="ml-4">
                    <h3 className="font-semibold text-blue-50">Certificação e Avaliações</h3>
                    <p className="mt-1 text-sm text-blue-100">
                        Receba feedbacks, colete avaliações positivas e obtenha certificações de mentor destaque.
                    </p>
                    </div>
                </div>
                </div>

                

                <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-blue-300/20">
                <p className="text-blue-100 italic">
                    A mentoria é a ponte entre o potencial e a excelência. Com nossa plataforma, você constrói essa ponte com ferramentas, suporte e visibilidade.
                </p>
                </div>
            </div>
            </div>

        
        <form onSubmit={handleSubmit} className="space-y-4 bg-white text-gray-600 p-6 rounded-3xl shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="relative col-span-1">
              <InputField
                name="mentorName"
                required
                icon={<FaUser className="text-gray-400"/>}
                label='Nome Completo'
                placeholder="Nome completo"
                className="pl-10 w-full rounded-lg py-2 px-3 text-sm"
              />
            </div>

            <div className="relative col-span-1">
              <InputField
                type="email"
                name="email"
                icon={<FaEnvelope className="text-gray-400"/>}
                label='Email'
                required
                placeholder="seuemail@exemplo.com"
                className="pl-10 w-full rounded-lg  py-2 px-3  text-sm"
              />
            </div>

          <div>
            <InputField
              name="title"
              required
              icon={<FaHeading className="text-gray-400"/>}
                label='Título da Mentoria'
              placeholder=""
              className="w-full rounded-lg  py-2 px-3  text-sm"
            />
          </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1  block">Data</label>
              <InputField
                type="date"
                name="date"
                required
                min={today}
                className="w-full rounded-lg  py-2 px-3  text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Horário</label>
              <InputField
                type="time"
                name="time"
                required
                className="w-full rounded-lg  py-2 px-3  text-sm"
              />
            </div>
            <div className='col-span-1 mt-2'>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Duração (minutos)</label>
            <select
              name="duration"
              required
              className="w-full rounded-lg  py-2 px-3 border-gray-200 border text-sm"
            >
              <option value="">Selecione</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="120">120</option>
            </select>
          </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Modalidade</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="modality" value="online" defaultChecked onChange={handleModalityChange} /> Online
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="modality" value="presencial" onChange={handleModalityChange} /> Presencial
              </label>
            </div>
          </div>


          {showLocation && (
            <div>
              <InputField
                name="location"
                type="text"
                icon={<FaMapMarkerAlt className="text-gray-400"/>}
                label='Local da Mentoria'
                required={showLocation}
                placeholder="Endereço da mentoria"
                className="w-full rounded-lg  py-2 px-3  text-sm"
              />
            </div>
          )}

          

          <div>
            <InputField
              type="number"
              name="price"
              step="0.01"
                icon={<FaDollarSign className="text-gray-400"/>}
              label='Preço'
              min="0"
              required
              placeholder="Ex: 150,00"
              className="w-full rounded-lg  py-2 px-3  text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descrição</label>
            <textarea
              name="description"
              rows={3}
              required
              placeholder="Ex: Nesta sessão, vamos abordar pontos fundamentais sobre..."
              className="w-full rounded-lg  py-2 px-3 border-gray-200 border text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
          >
            <FaCheck className="inline mr-2" /> Cadastrar Sessão
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-white/20">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-4">
              <FaCheck className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">Cadastro concluído!</h3>
            <p className="mt-3 text-gray-600">
              Sua sessão de mentoria foi registrada com sucesso e já está disponível para agendamento.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition duration-200 w-full"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}