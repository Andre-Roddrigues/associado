"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Video,
  PencilRuler,
  MessageCircleMore,
  FilePlus,
  TicketCheckIcon,
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export function CoursesSection() {
  const cards = [
    {
      icon: <PencilRuler size={28} className="text-white" />,
      title: "Curso",
      description:
        "Compartilhe conhecimento criando seu próprio curso, defina conteúdos e comece a ensinar.",
      buttonText: "Cadastrar Curso",
      gradient: "from-emerald-500 to-teal-400",
      glassColor: "rgba(16, 185, 129, 0.15)",
      borderColor: "rgba(16, 185, 129, 0.3)",
      href: "/adicionar-curso",
    },
    {
      icon: <MessageCircleMore size={28} className="text-white" />,
      title: "Mentoria",
      description:
        "Ofereça mentorias individuais por vídeo e transforme sua experiência em valor real.",
      buttonText: "Cadastrar Mentoria",
      gradient: "from-blue-500 to-indigo-400",
      glassColor: "rgba(59, 130, 246, 0.15)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      href: "/adicionar-mentoria",
    },
    // {
    //   icon: <FilePlus size={28} className="text-white" />,
    //   title: "E‑book",
    //   description:
    //     "Alcance leitores de todo o país e amplie sua autoridade em sua área de especialidade",
    //   buttonText: "Cadastrar Ebook",
    //   gradient: "from-emerald-500 to-teal-400",
    //   glassColor: "rgba(16, 185, 129, 0.15)",
    //   borderColor: "rgba(16, 185, 129, 0.3)",
    //   href: "/adicionar-ebook",
    // },
    {
      icon: <BookOpen size={28} className="text-white" />,
      title: "Livro",
      description:
        "Publique ebook, livros físicos, novos ou usados, e contribua com conhecimento.",
      buttonText: "Cadastrar Livro",
      gradient: "from-blue-500 to-indigo-400",
      glassColor: "rgba(59, 130, 246, 0.15)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      href: "/adicionar-ebook",
    },
    {
      icon: <TicketCheckIcon size={28} className="text-white" />,
      title: "Evento",
      description:
        "Crie eventos online ou presenciais, venda ingressos e gerencie participantes.",
      buttonText: "Cadastrar Evento",
      gradient: "from-emerald-500 to-teal-400",
      glassColor: "rgba(16, 185, 129, 0.15)",
      borderColor: "rgba(16, 185, 129, 0.3)",
      href: "/adicionar-evento",
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
      className="py-24 px-6 bg-gradient-darkblue-lesslight"
    >
      <div className="max-w-7xl mx-auto bg-gradient-darkblue-lesslight">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-4">
            Soluções de{" "}
            <span className="text-white">
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> */}
              Ponta a Ponta
            </span>
          </h3>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
           Cadastre o seu produto para que esteja disponivel para todo mundo e comece a faturar.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex group"
            >
              <article 
                className="relative flex flex-col flex-1 p-8 rounded-xl backdrop-blur-md transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: card.glassColor,
                  border: `1px solid ${card.borderColor}`,
                  boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`
                }}
              >
                {/* Efeito brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0  transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Ícone */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  {card.icon}
                </div>

                {/* Conteúdo */}
                <h4 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h4>
                <p className="text-blue-100 text-sm leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* Botão */}
                <Link href={card.href} className="mt-6 block">
                  <Button
                    className={`w-full bg-gradient-to-r ${card.gradient}  text-white font-medium shadow-md hover:shadow-xl transition-all duration-300`}
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}