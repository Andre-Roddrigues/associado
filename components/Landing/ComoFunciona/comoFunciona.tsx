"use client";

import { motion } from "framer-motion";
import { FileText, PlayCircle, Book, User, DollarSign, UserCircle, UploadCloud } from "lucide-react";

export function StepsSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const steps = [
    {
      title: "Unitec PRO",
      icon: UserCircle,
      description: "Crie sua conta PRO e tenha acesso a todas as ferramentas necessárias para começar a ganhar com o seu conhecimento.",
    },
    {
      title: "Publique o seu Produto",
      icon: UploadCloud,
      description: "Publique cursos, mentorias ou ebooks. Utilize nossa plataforma para criar e gerenciar seu conteúdo de forma simples e intuitiva.",
    },
    {
      title: "Comece a Vender",
      icon: User,
      description: "Divulgue seu produto e comece a vender. Alcance um público amplo e transforme seu conhecimento em uma fonte de renda.",
    },
    {
      title: "Receba o seu VALOR",
      icon: DollarSign,
      description: "Receba seus pagamentos de forma rápida e segura em até 48h. Nossa plataforma garante que você faça o saque do seu VALOR de forma simples e eficiente.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
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