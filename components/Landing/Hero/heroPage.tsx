"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center py-24 px-6"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-4xl mx-auto">
        Transforme seu conhecimento em renda com a Unitec
      </h2>
      <p className="text-lg max-w-3xl mx-auto mb-6 text-blue-100">
        Crie conteúdos, venda cursos e ebooks, ofereça mentorias e saque seus ganhos diretamente na plataforma.
      </p>
      <Button className="bg-white text-blue-700 font-semibold hover:bg-blue-200">
        Quero me tornar um associado
      </Button>
    </motion.section>
  );
}
