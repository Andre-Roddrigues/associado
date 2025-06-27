"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, PencilRuler, MessageCircleMore, FilePlus } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export function CoursesSection() {
  const cards = [
    {
      icon: <PencilRuler size={28} className="text-white" />,
      title: "Cadastre seu Curso",
      description:
        "Compartilhe seu conhecimento com milhares de alunos criando seu próprio curso. Escolha a modalidade, defina os conteúdos e comece a ensinar de forma profissional.",
      buttonText: "Cadastrar Curso",
      gradient: "from-blue-600 to-cyan-500",
      href: "/adicionar-curso",
    },
    {
      icon: <MessageCircleMore size={28} className="text-white" />,
      title: "Cadastre sua Mentoria",
      description:
        "Ofereça mentorias individuais por chamada de vídeo. Direcione seus aprendizados para quem busca orientação direta e transforme sua experiência em valor real.",
      buttonText: "Cadastrar Mentoria",
      gradient: "from-emerald-600 to-teal-500",
      href: "/adicionar-mentoria",
    },
    {
      icon: <FilePlus size={28} className="text-white" />,
      title: "Cadastre seu Ebook",
      description:
        "Publique ebooks informativos, técnicos ou motivacionais. Alcance leitores de todo o país e amplie sua autoridade em sua área de especialidade.",
      buttonText: "Cadastrar Ebook",
      gradient: "from-blue-600 to-cyan-500",
      href: "/adicionar-ebooks",
    },
    {
      icon: <Video size={28} className="text-white" />,
      title: "Venda um Livro Usado",
      description:
        "Agora os seus livros usados tem VALOR! Seu livro usado pode ser novo para outra pessoa. Contribua com a educação de quem precisa e ainda ganhe com isso.",
      buttonText: "Adicionar Vídeos",
      gradient: "from-emerald-600 to-teal-500",
      href: "/adicionar-livro",
    },
  ];

  return (
    <motion.section
      id="cursos"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 px-6 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-500 mb-4">
            Cursos e <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Ebooks</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cadastre o seu conteúdo, adicione videoaulas, e transforme conhecimento em renda agora mesmo!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-300 opacity-0 group-hover:opacity-100 border border-gray-100" />
              
              <div className="relative h-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-transparent flex flex-col">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  {card.icon}
                </div>
                
                <h4 className="text-xl font-semibold text-gray-500 mb-3">{card.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                
                <Link href={card.href} passHref className="mt-6">
                  <Button 
                    className={`w-full bg-gradient-to-r ${card.gradient} hover:opacity-90 transition-opacity`}
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}