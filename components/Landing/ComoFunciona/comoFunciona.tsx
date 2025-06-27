"use client";

import { motion } from "framer-motion";
import { FileText, PlayCircle, Book, User, DollarSign } from "lucide-react";

export function StepsSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const steps = [
    {
      title: "Criar conteúdos",
      icon: FileText,
      description: "Publique artigos, vídeos e tutoriais sobre os temas que domina. A plataforma dá visibilidade ao seu conteúdo.",
    },
    {
      title: "Curso",
      icon: PlayCircle,
      description: "Desenvolva e disponibilize seus cursos online com vídeo-aulas, materiais complementares e certificado.",
    },
    {
      title: "Ebook",
      icon: Book,
      description: "Transforme seus conhecimentos em eBooks e venda diretamente para os usuários interessados no tema.",
    },
    {
      title: "Mentoria",
      icon: User,
      description: "Ofereça mentorias individuais ou em grupo. Programe sessões e acompanhe seus mentorados de forma personalizada.",
    },
    {
      title: "Saque",
      icon: DollarSign,
      description: "Receba seus ganhos através de métodos como M-Pesa ou transferência bancária. Rápido, seguro e sem complicações.",
    },
  ];

  return (
    <motion.section
      id="como-funciona"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 px-6 bg-gradient-to-br from-blue-200 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-500 mb-4">
            Como <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Funciona</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transforme seu conhecimento em oportunidades de renda com nossa plataforma completa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map(({ title, icon: Icon, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              
              <div className="relative h-full bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-transparent">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                  <Icon size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-600 mb-3">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium text-blue-600">0{index + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}