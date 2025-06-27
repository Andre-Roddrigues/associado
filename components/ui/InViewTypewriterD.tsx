'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ReactNode } from 'react';

interface InViewTypewriterDProps {
  children: string; 
  className?: string;
}

export function InViewTypewriterD({ children, className }: InViewTypewriterDProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); 

  const animationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01, 
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
