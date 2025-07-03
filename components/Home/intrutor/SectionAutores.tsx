"use client";
import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Mail } from "lucide-react";

const autores = [
  {
    id: 1,
    name: "Carlos Mbanze",
    role: "Formador",
    email: "carlos@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 2,
    name: "Tatiana Nhachungue",
    role: "Formadora",
    email: "tatiana@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 3,
    name: "João Matsinhe",
    role: "Formador",
    email: "joao@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 4,
    name: "Helena Langa",
    role: "Formadora",
    email: "helena@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 5,
    name: "Amílcar Tamele",
    role: "Formador",
    email: "amilcar@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 6,
    name: "Ivone Simbine",
    role: "Formadora",
    email: "ivone@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 7,
    name: "Ernesto Zandamela",
    role: "Formador",
    email: "ernesto@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
  {
    id: 8,
    name: "Nádia Ussene",
    role: "Formadora",
    email: "nadia@unitec.curos",
    image: "/images/ICON-10.PNG",
  },
];

export function AutoresSection() {
  const settings = {
    dots: true,
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
    <section className="py-12 px-4 bg-gradient-darkblue-r">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">PRO</span>dutores de conteúdo que geram
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Valor</span>
        </h2>

        <Slider {...settings} className="px-2">
          {autores.map((autor) => (
            <div key={autor.id} className="px-2 py-2">
              <div className="bg-[#213557] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 group">
                <div className="p-4 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm -z-10"></div>
                    <img
                      src={autor.image}
                      className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-sm group-hover:border-blue-50 transition-all duration-200"
                      alt={autor.name}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-extralight  text-white group-hover:text-blue-600 transition-colors">
                      {autor.name}
                    </h3>
                    <p className="text-white text-sm font-medium mb-1">{autor.role}</p>
                    <div className="flex items-center justify-center text-gray-500 text-xs mb-2">
                      <Mail className="w-3 h-3 mr-1" />
                      <span className="truncate max-w-[160px]">{autor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
