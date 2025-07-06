"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { BookText, GraduationCap, MessageSquare, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      icon: <GraduationCap className="text-icon-blue" size={20} />,
      label: "Cadastrar Curso",
      description: "Aulas online",
      href: "/adicionar-curso"
    },
    {
      icon: <BookText className="text-icon-purple" size={20} />,
      label: "Cadastrar Ebook",
      description: "Material digital",
      href: "/adicionar-ebook"
    },
    {
      icon: <MessageSquare className="text-icon-green" size={20} />,
      label: "Oferecer Mentoria",
      description: "Conexão direta",
      href: "/adicionar-mentoria"
    },
    {
      icon: <BookOpen className="text-icon-amber" size={20} />,
      label: "Publicar Livro",
      description: "Obras físicas",
      href: "/adicionar-livro"
    },
    {
      icon: <BookOpen className="text-icon-amber" size={20} />,
      label: "Publicar Evento",
      description: "Presencial ou Online",
      href: "/adicionar-evento"
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center h-screen flex flex-col justify-center items-center py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home.jpeg" 
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-sm"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-4xl mx-auto text-white">
          Transforme seu conhecimento em renda com a Unitec<span className="bg-blue-300 text-blue-600 opacity-20">Pro</span>
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-6 text-white">
          Crie conteúdos, venda cursos e ebooks, ofereça mentorias e saque seus ganhos diretamente na plataforma.
        </p>
        
        <div className="relative flex justify-center">
          <div className="inline-block">
            <Button 
              ref={buttonRef}
              className="bg-white text-dark-blue-lighter font-semibold hover:bg-hover-blue transition-all relative z-20"
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
                  className="absolute z-[9999] right-[2%] md:right-[17%] transform -translate-x-1/2 mt-2 w-full sm:w-auto"
                >
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 relative mx-4 sm:mx-0">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                    <div className="grid grid-cols-1 sm:flex sm:p-2 gap-1 p-1">
                      {options.map((option, index) => (
                        <Link 
                          key={index}
                          href={option.href}
                          className="text-center p-3 hover:bg-hover-gray transition-colors flex flex-col sm:flex-col items-center gap-2 rounded-lg min-w-[120px]"
                          onClick={() => setShowTooltip(false)}
                        >
                          <div className="p-2 bg-gradient-darkblue-darker rounded-full shadow-sm border border-gray-100">
                            {option.icon}
                          </div>
                          <div>
                            <p className="font-medium text-navy text-sm">{option.label}</p>
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
      </div>
    </motion.section>
  );
}