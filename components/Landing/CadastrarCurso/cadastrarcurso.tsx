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
      gradient: "from-blue-600 to-cyan-500",
      href: "/adicionar-curso",
    },
    {
      icon: <MessageCircleMore size={28} className="text-white" />,
      title: "Mentoria",
      description:
        "Ofereça mentorias individuais por vídeo e transforme sua experiência em valor real.",
      buttonText: "Cadastrar Mentoria",
      gradient: "from-emerald-600 to-teal-500",
      href: "/adicionar-mentoria",
    },
    {
      icon: <FilePlus size={28} className="text-white" />,
      title: "E‑book",
      description:
        "Alcance leitores de todo o país e amplie sua autoridade em sua área de especialidade",
      buttonText: "Cadastrar Ebook",
      gradient: "from-blue-600 to-cyan-500",
      href: "/adicionar-ebook",
    },
    {
      icon: <BookOpen size={28} className="text-white" />,
      title: "Livro",
      description:
        "Publique livros físicos, novos ou usados, e contribua com conhecimento.",
      buttonText: "Cadastrar Livro",
      gradient: "from-emerald-600 to-teal-500",
      href: "/adicionar-livro",
    },
    {
      icon: <TicketCheckIcon size={28} className="text-white" />,
      title: "Evento",
      description:
        "Crie eventos online ou presenciais, venda ingressos e gerencie participantes.",
      buttonText: "Cadastrar Evento",
      gradient: "from-blue-600 to-cyan-500",
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
      className="py-24 px-6 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título + subtítulo */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-500 mb-4">
            Cursos e{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              E‑books
            </span>
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cadastre seu conteúdo, adicione videoaulas e transforme conhecimento
            em renda!
          </p>
        </div>

        {/* Grid responsivo: 1 → 2 → 3 → 4 → 5 colunas */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex"
            >
              <article className="relative flex flex-col flex-1 bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Borda/flutuante atrás do card */}
                <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 scale-[1.02] transition-all duration-300"></span>

                {/* Ícone */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  {card.icon}
                </div>

                {/* Conteúdo */}
                <h4 className="text-xl font-semibold text-gray-500 mb-3">
                  {card.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* Botão */}
                <Link href={card.href} className="mt-6 block">
                  <Button
                    className={`w-full bg-gradient-to-r ${card.gradient} hover:opacity-90`}
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
