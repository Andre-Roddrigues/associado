// components/PremiumPlatformSection.tsx
'use client';
import Link from "next/link"
import Image from 'next/image';
import { CheckCircleIcon, MessageCircleQuestion, PhoneIcon, ChevronsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQ } from "@/components/FAQ/FAQ";

export function PremiumPlatformSection() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Seção 1 - Ferramentas Exclusivas */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
          <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden ">
            <Image
              src="/images/comece.png"
              alt="Painel de controle"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-gray-500  mb-4">
              <span className="block">EXPLORE RECURSOS DISPONIVEIS PARA</span>
              <span className="block text-blue-600">POTENCIALIZAR AS SUAS VENDAS</span>
            </h2>
            <ul className="space-y-3 text-base text-gray-600">
              {[
                "Estatísticas e controle de visibilidade",
                "Histórico de pagamentos",
                "Leitores para Ebooks",
                "Processos claros de pagamento",
                "Criação de ingressos para eventos"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Seção 2 - Maximizar Rendimentos */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
          <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden ">
            <Image
              src="/images/vendas.png"
              alt="Gráficos de crescimento"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-gray-500  mb-4">
              <span className="block">MAXIMIZE SEUS</span>
              <span className="block text-blue-600">RENDIMENTOS</span>
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="space-y-3 text-base text-gray-600">
                {[
                  "Conteúdos semanais",
                  "Pacotes de cursos",
                  "Mentorias em grupo",
                  "Descontos estratégicos"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs">
                      {index + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Seção 3 - Vantagens */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden ">
            <Image
              src="/images/entre.png"
              alt="Equipe trabalhando"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-gray-500  mb-4">
              <span className="block">COMECE AGORA</span>
              <span className="block text-blue-600">SEM COMPLICAÇÕES</span>
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Sem custo inicial",
                  description: "Pague apenas quando vender - risco zero",
                  borderColor: "border-l-blue-500"
                },
                {
                  title: "Tudo em um só lugar",
                  description: "Cursos, ebooks e eventos integrados",
                  borderColor: "border-l-green-500"
                },
                {
                  title: "Logística simples",
                  description: "Entrega facilitada pela Unitec",
                  borderColor: "border-l-purple-500"
                }
              ].map((item, index) => (
                <div key={index} className={`bg-white p-4 rounded shadow border-l-4 ${item.borderColor}`}>
                  <h3 className="font-bold text-gray-500 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-blue-600 rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-lg font-bold text-white mb-3">
            Comece a vender hoje mesmo!
          </h2>
          <p className="text-blue-100 mb-6">
            Junte-se a criadores que transformam conhecimento em renda.
          </p>
          
          <motion.button
            className=" text-blue-500 bg-white font-bold py-3 px-6 rounded-full text-base hover:bg-blue-500 hover:text-white transition flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          > 
          <Link href="#cursos">
          Cadastre o seu Conteúdo
          </Link>
            <motion.span
              className="ml-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
            <ChevronsUp />
            </motion.span>
          </motion.button>
        </div>

        {/* FAQ */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-500 mb-3">Dúvidas?</h3>
        </div>
         <FAQ/>
          {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center justify-center text-sm">
              <MessageCircleQuestion className="w-4 h-4 mr-1" />
              Perguntas Frequentes
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center justify-center text-sm">
              <PhoneIcon className="w-4 h-4 mr-1" />
              Suporte
            </a>
          </div> */}
      </div>
    </div>
  );
}