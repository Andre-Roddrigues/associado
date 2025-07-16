"use client";
import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const autores = [
  {
    id: 1,
    name: "Carlos Mbanze",
    role: "Formador",
    email: "carlos@unitec.ac.mz",
    image: "/images/instr2.jpg",
    glassColor: "rgba(255, 255, 255, 0.12)" // Branco com 12% de opacidade
  },
  {
    id: 2,
    name: "André Rodrigues",
    role: "Formador",
    email: "andre@unitec.ac.mz",
    image: "/images/instr1.jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
  {
    id: 3,
    name: "João Matsinhe",
    role: "Formador",
    email: "joao@unitec.ac.mz",
    image: "/images/instr3.jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
  {
    id: 4,
    name: "Helena Langa",
    role: "Formadora",
    email: "helena@unitec.ac.mz",
    image: "/images/avatar1.jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
  {
    id: 5,
    name: "Amílcar Tamele",
    role: "Formador",
    email: "amilcar@unitec.ac.mz",
    image: "/images/uni(4).jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
  {
    id: 6,
    name: "Ivone Simbine",
    role: "Formadora",
    email: "ivone@unitec.ac.mz",
    image: "/images/uni(1).jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
  {
    id: 7,
    name: "Akil Bashir",
    role: "Formador",
    email: "akil@unitec.ac.mz",
    image: "/images/uni(3).jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
  {
    id: 8,
    name: "Nádia Ussene",
    role: "Formadora",
    email: "nadia@unitec.ac.mz",
    image: "/images/uni(2).jpg",
    glassColor: "rgba(255, 255, 255, 0.12)"
  },
];

export function AutoresSection() {
  const fadeIn = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 px-4 bg-gradient-darkblue-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">
          Produtores de conteúdo que geram Valor
        </h2>
        <motion.section
      id="como-funciona"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 px-6 z-0 "
    >
        <Slider {...settings} className="px-2">
          {autores.map((autor) => (
            <div key={autor.id} className="px-2 py-2">
              <div 
                className="rounded-xl overflow-hidden border-[1px] border-gray-100 hover:shadow-lg transition-all duration-300 group"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '8px solid bg-white',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md -z-10"
                      style={{ zIndex: -1 }}
                    ></div>
                    <img
                      src={autor.image}
                      className="w-24 h-24 object-cover rounded-full border-2 border-gray-200/30 shadow-lg group-hover:border-blue-300/50 transition-all duration-300"
                      alt={autor.name}
                      style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                      {autor.name}
                    </h3>
                    <p className="text-gray-200 text-sm font-medium mb-1">{autor.role}</p>
                    <div className="flex items-center justify-center text-gray-300 text-xs mb-2">
                      <Mail className="w-3 h-3 mr-1" />
                      <span className="truncate max-w-[160px]">{autor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        </motion.section>
      </div>
    </section>
  );
}