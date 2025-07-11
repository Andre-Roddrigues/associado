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
      title: "Criar Conta Unitec",
      icon: UserCircle,
      description: "Crie sua conta e tenha acesso a todas as ferramentas necessárias para começar a ganhar com o seu conhecimento.",
      gradient: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-500/10"
    },  
    {
      title: "Publique o seu Produto",
      icon: UploadCloud,
      description: "Publique cursos, mentorias ou ebooks. Utilize nossa plataforma para criar e gerenciar seu conteúdo de forma simples e intuitiva.",
      gradient: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Comece a Vender",
      icon: User,
      description: "Divulgue seu produto e comece a vender. Alcance um público amplo e transforme seu conhecimento em uma fonte de renda.",
      gradient: "from-emerald-400 to-teal-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Receba o seu VALOR",
      icon: DollarSign,
      description: "Receba seus pagamentos de forma rápida e segura em até 48h. Faça o saque do seu VALOR de forma simples e eficiente.",
      gradient: "from-amber-400 to-yellow-400",
      bgColor: "bg-amber-500/10"
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
      className="py-24 px-6 z-0 bg-gradient-darkblue-light"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-100 mb-4">
            Como <span className="text-transparent bg-clip-text bg-white">Funciona</span>
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tudo que você precisa para gerar renda com os seus conteúdos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {steps.map(({ title, icon: Icon, description, gradient, bgColor }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-full w-full"
            >
              <div className="absolute inset-0 bg-white/5 rounded-xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/10 backdrop-blur-sm" />
              
              <div className={`relative h-full ${bgColor} p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-white/20 flex flex-col`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-100 mb-3">{title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{description}</p>
                <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
                  <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                    Passo 0{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}