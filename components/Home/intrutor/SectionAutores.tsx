"use client";
import * as React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { InViewTypewriter } from "@/components/ui/InViewTypewriter";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link"; // Import para criar os links

const autores = [
    {
        id: 1,
        name: "Andrea Novela",
        role: "Formador",
        email: "andrea@unitec.curos",
        image: "/images/avatar1.jpg"
    },
    {
        id: 2,
        name: "Carlos Mucavel",
        role: "Formador de TI",
        email: "carlos@unitec.curos",
        image: "/images/avatar1.jpg"
    },
    {
        id: 3,
        name: "Lucia Nhachungue",
        role: "Coordenadora",
        email: "lucia@unitec.curos",
        image: "/images/avatar1.jpg"
    },
    {
        id: 4,
        name: "Samuel Zavale",
        role: "Professor de Redes",
        email: "samuel@unitec.curos",
        image: "/images/avatar1.jpg"
    },
    {
        id: 5,
        name: "Elisa Macamo",
        role: "Secretária",
        email: "elisa@unitec.curos",
        image: "/images/avatar1.jpg"
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
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="mb-8 py-10 px-4">
            <h2 className="font-bold text-center md:text-left text-muted-foreground text-xl">
                Nossos Formadores
            </h2>
            <Slider {...settings} className="mt-4 bg-transparent">
                {autores.map((autor) => (
                    <div key={autor.id} className="flex flex-row items-center justify-center px-2">
                        <div className="bg-white relative shadow-lg overflow-hidden hover:shadow-2xl group rounded-xl p-2 transition-all duration-500 transform w-80">
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={autor.image}
                                    className="w-28 group-hover:w-32 group-hover:h-32 h-28 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                    alt={autor.name}
                                />
                                <div className="w-fit transition-all transform duration-500">
                                    <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                                    {autor.name}
                                    </h1>
                                    <p className="text-gray-400">{autor.role}</p>
                                    <a className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
                                        {autor.email}
                                    </a>
                                </div>
                            </div>
                            <div className="absolute group-hover:bottom-1 delay-100 -bottom-16 transition-all duration-500 bg-gray-600 dark:bg-gray-100 right-1 rounded-lg">
                                <div className="flex justify-evenly items-center gap-2 p-1 text-xs text-white dark:text-gray-600">
                                    <Link href={`/instrutor/${autor.id}`}>
                                        <p>Ver mais</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default AutoresSection;
