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
      gradient: "from-[#4a7eff] to-[#6bd6ff]",
      href: "/adicionar-curso",
    },
    {
      icon: <MessageCircleMore size={28} className="text-white" />,
      title: "Mentoria",
      description:
        "Ofereça mentorias individuais por vídeo e transforme sua experiência em valor real.",
      buttonText: "Cadastrar Mentoria",
      gradient: "from-[#4a7eff] to-[#8a7eff]",
      href: "/adicionar-mentoria",
    },
    {
      icon: <FilePlus size={28} className="text-white" />,
      title: "E‑book",
      description:
        "Alcance leitores de todo o país e amplie sua autoridade em sua área de especialidade",
      buttonText: "Cadastrar Ebook",
      gradient: "from-[#4a7eff] to-[#6bd6ff]",
      href: "/adicionar-ebook",
    },
    {
      icon: <BookOpen size={28} className="text-white" />,
      title: "Livro",
      description:
        "Publique livros físicos, novos ou usados, e contribua com conhecimento.",
      buttonText: "Cadastrar Livro",
      gradient: "from-[#4a7eff] to-[#8a7eff]",
      href: "/adicionar-livro",
    },
    {
      icon: <TicketCheckIcon size={28} className="text-white" />,
      title: "Evento",
      description:
        "Crie eventos online ou presenciais, venda ingressos e gerencie participantes.",
      buttonText: "Cadastrar Evento",
      gradient: "from-[#4a7eff] to-[#6bd6ff]",
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
      className="py-24 px-6 bg-gradient-to-b from-[#152238] via-[#152257] to-[#17253D]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título + subtítulo */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-100 mb-4">
            Soluções de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a7eff] to-[#6bd6ff]">
              Ponta a Ponta
            </span>
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Cadastre seu conteúdo, adicione videoaulas e transforme conhecimento
            em renda!
          </p>
        </div>

        {/* Grid responsivo */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex group"
            >
              <article className="relative flex flex-col flex-1 bg-[#1c2e4a] p-8 rounded-xl border border-[#23395d] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#4a7eff]/30">
                {/* Efeito de overlay gradiente no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#23395d] to-[#1c2e4a] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                {/* Ícone */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  {card.icon}
                </div>

                {/* Conteúdo */}
                <h4 className="text-xl font-semibold text-gray-100 mb-3">
                  {card.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* Botão */}
                <Link href={card.href} className="mt-6 block">
                  <Button
                    className={`w-full bg-gradient-to-r ${card.gradient} hover:opacity-90 text-white font-medium shadow-md hover:shadow-[#4a7eff]/40 transition-all`}
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