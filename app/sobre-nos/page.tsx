"use client";
import Image from "next/image";
import { CheckCircle, Users, Monitor, BookOpen, Globe } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      title: "Plataforma Integrada",
      description: "Sistema completo para gestão de aulas online e presenciais"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Conteúdo Organizado",
      description: "Centralização de materiais didáticos e planejamentos"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Gestão de Alunos",
      description: "Controle de matriculas, frequência e desempenho"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Multiplataforma",
      description: "Acessível em qualquer dispositivo, a qualquer momento"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a unicPRO</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Revolucionando a educação através de tecnologia e gestão eficiente
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Quem Somos</h2>
            <p className="text-gray-600 mb-4 text-lg">
              A unicPRO é líder em soluções de gestão educacional, oferecendo uma plataforma completa para instituições de ensino que combinam aulas online e presenciais.
            </p>
            <p className="text-gray-600 mb-6">
              Fundada em 2020, nossa missão é simplificar a administração escolar enquanto melhoramos a experiência de aprendizado para alunos e professores.
            </p>
            <div className="space-y-3">
              {[
                "Gestão unificada de turmas online e presenciais",
                "Ferramentas de acompanhamento em tempo real",
                "Relatórios de desempenho automatizados",
                "Sistema de comunicação integrado"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <Image 
              src="/images/classroom-management.jpg" 
              alt="Gestão de Aulas unicPRO"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nossas Soluções</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Configuração</h3>
              <p className="text-gray-600">
                Nossa equipe implementa a plataforma conforme as necessidades da sua instituição
              </p>
              <div className="mt-6 relative h-48">
                <Image 
                  src="/images/setup-process.jpg" 
                  alt="Processo de configuração"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integração</h3>
              <p className="text-gray-600">
                Conectamos todos os sistemas existentes em uma única plataforma
              </p>
              <div className="mt-6 relative h-48">
                <Image 
                  src="/images/integration.jpg" 
                  alt="Processo de integração"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão</h3>
              <p className="text-gray-600">
                Controle completo de aulas, alunos e professores em tempo real
              </p>
              <div className="mt-6 relative h-48">
                <Image 
                  src="/images/management.jpg" 
                  alt="Gestão educacional"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar sua instituição?</h2>
          <p className="text-xl mb-8">
            Agende uma demonstração e descubra como a unicPRO pode simplificar sua gestão educacional
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Solicitar Demonstração
          </button>
        </div>
      </section>
    </div>
  );
}