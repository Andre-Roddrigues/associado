'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ReactNode } from 'react';

interface InViewTypewriterProps {
  children: string; // o texto a ser animado
  className?: string;
}

export function InViewTypewriter({ children, className }: InViewTypewriterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // O texto será escrito uma única vez ao entrar na viewport

  // Animação de "escrever" o texto, letra por letra
  const animationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01, // Intervalo entre cada letra
      },
    },
  };

  return (
    <div ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={animationVariants}
        className={className}
      >
        {children.split('').map((letter, index) => (
          <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
