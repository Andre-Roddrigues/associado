import React from "react";
import substraction from "@/public/images/Subtraction.svg"
import talk from "@/public/images/confirmacao.png";
import write from "@/public/images/rendimento.png";
import voice from "@/public/images/pagamentosformas.png";
import diag from "@/public/images/ampla.png";
import ferra from "@/public/images/ferramentas.png";
import Image from "next/image";
import CardInfo from "./CardInfo";
function SectionCardsCourse() {
  return (
    <section className="w-full flex md:flex-row flex-col gap-4  justify-center relative" >
      <Image src={substraction} alt="" className="absolute  -right-0 -top-10"/>
    
      <div className="w-full lg:max-h-80 lg:pl-5 lg:pt-8 flex md:items-center md:justify-center lg:block ">
        <CardInfo
            bgColor="bg-blue-200"
            icon={talk} 
            title="Aprovação rápida"
            description="Crie e venda seu produto sem complicações. Dentro de 48h terá o feedback da submissão e a equipa técnica entrará em contacto para os passos subsequentes."
        />
      </div>

      <div className="w-full lg:pb-5 flex md:items-center md:justify-center lg:block z-10">
        <CardInfo
            bgColor="bg-green-100"
            icon={write}
            title="Acesso fácil as suas Comissões"
            description="Transfira suas comissões para sua conta bancária ou carteira móvel de forma simples e rápida.
            Em cada venda a plataforma retem apenas 20% do valor se tiver os videos gravados, caso não, a plataforma retem 40%"
        />
      </div>

      <div className="w-full lg:h-80 lg:pl-5 lg:pt-8 flex md:items-center md:justify-center lg:block">
        <CardInfo
            bgColor="bg-purple-200"
            icon={voice}
            title="Formas de pagamento"
            description ="Os seus estudantes poderão optar por pagar o seu curso via Mpesa, Emola, Visa, Depósito ou Transferência Bancária."
        />
      </div>

      <div className="w-full lg:h-fit flex md:items-center md:justify-center lg:block">
        <CardInfo
            bgColor="bg-yellow-100"
            icon={diag}
            title="Ampla Visibilidade"
            description="Campanhas de marketing para promover os seus cursos na plataforma.
            Destaque para cursos novos na página inicial."
        />
      </div>
      <div className="w-full lg:h-fit flex md:items-center md:justify-center lg:block">
        <CardInfo
            bgColor="bg-blue-100"
            icon={ferra}
            title="Suporte e Ferramentas Avançadas"
            description="Ferramentas fáceis de usar para criar, gerenciar e monitorar cursos.
            Suporte técnico e consultoria para ajudar no aperfeiçoamento do conteúdo do curso.
            Acesso a dados analíticos detalhados sobre o desempenho do curso."
        />
      </div>

    </section>
  );
}

export default SectionCardsCourse;
