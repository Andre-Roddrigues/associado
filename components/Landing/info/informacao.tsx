// components/PremiumPlatformSection.tsx
'use client';
import Link from "next/link"
import Image from 'next/image';
import { CheckCircleIcon, ChevronsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQ } from "@/components/FAQ/FAQ";
import { CartoesInfo } from "./suporteCard";

export function PremiumPlatformSection() {
  const bgGradient = "bg-gradient-darkblue-lesslight";
  const cardGradient = "bg-gradient-to-br from-blue-600 to-cyan-500";
  const accentGradient = "bg-gradient-to-r from-[#4a7eff] to-[#6bd6ff]";
  const hoverGradient = "bg-gradient-to-r from-[#5a8eff] to-[#7be6ff]";

  return (
    <div className={`${bgGradient} py-12 sm:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* First Feature Block */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
        <div className={`w-full md:w-1/2 relative rounded-xl shadow-2xl min-h-[300px] md:h-80 ${cardGradient} overflow-hidden border border-[#23395d]/50`}>
          <Image
            src="/images/ganhos.jpg"
            alt="Painel de controle"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#152238]/90 to-transparent" />
        </div>

          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-gray-300 mb-4">
              <span className="block">EXPLORE RECURSOS DISPONÍVEIS PARA</span>
              <span className={`block text-transparent bg-clip-text ${accentGradient}`}>
                POTENCIALIZAR AS SUAS VENDAS
              </span>
            </h2>
            <ul className="space-y-3 text-base text-gray-300">
              {[
                "Estatísticas e controle de visibilidade",
                "Histórico de pagamentos",
                "Leitores para Ebooks",
                "Processos claros de pagamento",
                "Criação de ingressos para eventos"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className={`${accentGradient} p-1 rounded-full mr-2 mt-0.5`}>
                    <CheckCircleIcon className="h-4 w-4 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Second Feature Block */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
          <div className={`w-full md:w-1/2 ${cardGradient} relative min-h-[300px] md:h-80 rounded-xl border border-[#23395d]/50 shadow-2xl`}>
            <Image
              src="/images/growing.jpg"
              alt="Gráficos de crescimento"
              fill
              className="object-cover block"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#23395d]/40 to-[#1c2e4a]/30" />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-gray-300 mb-4">
              <span className="block">MAXIMIZE SEUS</span>
              <span className={`block text-transparent bg-clip-text ${accentGradient}`}>
                RENDIMENTOS
              </span>
            </h2>
            <div className={` p-6 rounded-xl border border-[#23395d]/50 backdrop-blur-sm`}>
              <ul className="space-y-3 text-base text-gray-300">
                {[
                  "Conteúdos semanais",
                  "Pacotes de cursos",
                  "Mentorias em grupo",
                  "Descontos estratégicos"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`${accentGradient} text-white font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs`}>
                      {index + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Third Feature Block */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2 relative justify-center">
            <h2 className="text-3xl font-bold text-left text-gray-300 mb-4">
              <span className="block">COMECE AGORA</span>
              <span className={`block text-transparent bg-clip-text ${accentGradient}`}>
                SEM COMPLICAÇÕES
              </span>
            </h2>
          </div>
          <div className="md:w-1/2">
            <div className="space-y-4">
              {[
                {
                  title: "Sem custo inicial",
                  description: "Pague apenas quando vender - risco zero",
                  borderColor: "border-l-[#4a7eff]"
                },
                {
                  title: "Tudo em um só lugar",
                  description: "Cursos, ebooks e eventos integrados",
                  borderColor: "border-l-[#6bd6ff]"
                },
                {
                  title: "Logística simples",
                  description: "Entrega facilitada pela Unitec",
                  borderColor: "border-l-[#8a7eff]"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -3 }}
                  className={` p-4 rounded-lg shadow-lg border-l-4 ${item.borderColor} border-t border-t-[#23395d]/50 hover:shadow-[#4a7eff]/20 transition-all`}
                >
                  <h3 className="font-extralight text-gray-100 mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center ${cardGradient} rounded-xl p-8 shadow-2xl mb-12 border border-[#4a7eff]/30`}>
          <h2 className="text-lg font-bold text-white mb-3">
            Comece a vender hoje mesmo!
          </h2>
          <p className="text-[#a8c6ff] mb-6">
            Junte-se a criadores que transformam conhecimento em renda.
          </p>
          
          <motion.button
            className={` text-dark-blue font-bold py-3 px-6 rounded-full text-base bg-white transition flex items-center mx-auto shadow-lg hover:shadow-[#4a7eff]/30`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          > 
            <Link href="/registro">
             Crie sua Conta
            </Link>
            <motion.span
              className="ml-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronsUp className="text-dark-blue" />
            </motion.span>
          </motion.button>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-300 mb-3">Ficou com alguma dúvida? Nós temos as respostas!</h3>
        </div>
        <FAQ />
        
        {/* Support Cards */}
        <div className="flex flex-col sm:flex-row justify-center py-4 gap-4">
          <CartoesInfo />
        </div> 
      </div>
    </div>
  );
}