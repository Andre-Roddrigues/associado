"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { BookText, GraduationCap, MessageSquare, BookOpen } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  // Fechar tooltip ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    {
      icon: <GraduationCap className="text-blue-600" size={20} />,
      label: "Cadastrar Curso",
      description: "Aulas online",
      href: "/adicionar-curso"
    },
    {
      icon: <BookText className="text-purple-600" size={20} />,
      label: "Cadastrar Ebook",
      description: "Material digital",
      href: "/adicionar-ebook"
    },
    {
      icon: <MessageSquare className="text-green-600" size={20} />,
      label: "Oferecer Mentoria",
      description: "Conexão direta",
      href: "/adicionar-mentoria"
    },
    {
      icon: <BookOpen className="text-amber-600" size={20} />,
      label: "Publicar Livro",
      description: "Obras físicas",
      href: "/adcionar-livro"
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center py-24 px-6 relative"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-4xl mx-auto">
        Transforme seu conhecimento em renda com a Unitec
      </h2>
      <p className="text-lg max-w-3xl mx-auto mb-6 text-blue-100">
        Crie conteúdos, venda cursos e ebooks, ofereça mentorias e saque seus ganhos diretamente na plataforma.
      </p>
      
      <div className="relative flex justify-center">
        <div className="inline-block">
          <Button 
            ref={buttonRef}
            className="bg-white text-blue-700 font-semibold hover:bg-blue-200 transition-all relative z-20"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            Quero me tornar um associado
          </Button>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                ref={tooltipRef}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tooltipVariants}
                transition={{ duration: 0.2 }}
                className="absolute z-30 right-[2%] md:right-[30%] transform -translate-x-1/2 mt-2 w-full sm:w-auto"
              >
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 relative mx-4 sm:mx-0">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                  <div className="grid grid-cols-1 sm:flex sm:p-2 gap-1 p-1">
                    {options.map((option, index) => (
                      <Link 
                        key={index}
                        href={option.href}
                        className="text-center p-3 hover:bg-gray-50 transition-colors flex flex-col sm:flex-col items-center gap-2 rounded-lg min-w-[120px]"
                        onClick={() => setShowTooltip(false)}
                      >
                        <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
                          {option.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{option.label}</p>
                          <p className="text-xs text-gray-500">{option.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}