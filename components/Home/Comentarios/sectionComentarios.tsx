"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedbackVideo from "./feedbackvideo";
import commentImage from "@/public/images/comment.png"
import { MessageSquareText } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { InViewTypewriter } from "@/components/ui/InViewTypewriter";

const testimonials = [
    {
        name: "Baptista Geraldo",
        message: "Boa Instituição recomendo!",
        image: "/images/comentario.jpeg",
    },
    {
        name: "Artur Santos Dimande",
        message: "Diaramente o nosso formador nos torna capaz.",
        image: "/images/comentario2.jpeg",
    },
    {
        name: "Andre Alberto Macamo",
        message: "Parabéns pra vocês pelos cursos me aguardem chegou minha vez de brilhar",
        image: "/images/comentario3.jpeg",
    },
    {
        name: "Benicia Matsimhe",
        message: "Escrevam-se já, a escola é séria e dão bem as aulas, eu sou TESTEMUNHA disso. Faço canalização residencial e hidráulica, está ser bom.",
        image: "/images/comentario4.jpeg",
    },
    //   {
    //     name: "Carlos José",
    //     message: "Muito satisfeito com o curso, material didático de alta qualidade.",
    //     image: "/images/comentario.jpeg", 
    //   },
];

export function ComentariosSection() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="p-5 bg-secondary ">
            <div className="flex  flex-wrap lg:px-10 py-5  ">

                <div className="flex-1 flex items-center justify-center -mt-5 flex-col gap-x-3 ">
                    <MessageSquareText size={60} strokeWidth={1.5} className="font-thin text-blue-500 md:hidden " />
                    <MessageSquareText size={80} strokeWidth={1.5} className="font-thin hidden md:block lg:hidden text-blue-500  w-40" />
                    <MessageSquareText size={100} strokeWidth={1.5} className="font-thin text-blue-500  hidden lg:block" />
                    <h2 className="flex flex-col leading-normal  justify-center  text-muted-foreground text-3xl md:text-4xl xl:text-[2.5rem] font-bold px-4 text-left">
                    <InViewTypewriter>
                        O que os nossos 
                        </InViewTypewriter>
                        <InViewTypewriter className="text-primary">
                           alunos dizem
                         </InViewTypewriter>
                    </h2>
                </div>

                <div className="hidden md:block flex-1">
                    <FeedbackVideo />
                </div>


            </div>

            <div className="relative">
                <Slider {...settings} className="w-full">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-1">
                            <Card className="flex lg:p-6">
                                <CardContent className=" flex-1 items-center justify-center py-5 px-0 ">
                                        <div className="bg-background py-3 px-5 min-h-36 w-full ">
                                            <div className="flex  items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <Image src={testimonial.image} alt={`Foto de ${testimonial.name}`} width={48} height={48} />
                                                </div>
                                                <p className="text-primary font-montserrat font-semibold text">{testimonial.name}</p>
                                            </div>
                                            <div className="text-muted-foreground ml-3 text-sm">
                                                <InViewTypewriter>
                                                    {testimonial.message}
                                                </InViewTypewriter>
                                            </div>
                                        </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="md:hidden">
                <FeedbackVideo />
            </div>
        </div>
    );
}

export default ComentariosSection;
