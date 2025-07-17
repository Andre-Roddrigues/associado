"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const eventImages = [
  "/images/evento(1).jpg",
  "/images/evento(2).jpg",
  "/images/evento(3).jpg",
];

const eventTexts = [
  {
    title: "Crie eventos inesquecíveis",
    description: "Nosso sistema ajuda você a organizar e promover seu evento com excelência",
  },
  {
    title: "Gerencie tudo em um só lugar",
    description: "Com nossa plataforma, você economiza tempo e maximiza resultados",
  },
  {
    title: "Alcance mais pessoas",
    description: "Divulgue seu evento com facilidade nas redes sociais e mais",
  },
];

export default function CarousselImage() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % eventImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block relative w-1/3 bg-gray-100">
      <div className="absolute inset-0 overflow-hidden">
        {eventImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <Image
              src={img}
              alt="Event illustration"
              fill
              className="object-cover"
              priority
            />
            {eventTexts[index] && (
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-xl font-bold mb-2">{eventTexts[index].title}</h3>
                <p className="text-sm opacity-90">{eventTexts[index].description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {eventImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeImage ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Mostrar imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
