"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ChevronDown, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function FAQ() {
  const faqItems = [
    {
      id: 'course-creation',
      question: 'Como criar um curso na plataforma?',
      answer: 'Na sua área de associado, clique em "Criar Curso" e siga nosso assistente passo-a-passo. Você pode adicionar vídeos, materiais complementares e configurar o preço. Nossa equipe revisa o conteúdo em até 48h úteis.'
    },
    {
      id: 'ebook-publishing',
      question: 'Quais os requisitos para publicar um ebook?',
      answer: 'Seus ebooks devem ter no mínimo 30 páginas, formato PDF de alta qualidade, e conteúdo original. Aceitamos materiais em português, inglês e espanhol. O processo de aprovação leva até 72h após o envio.'
    },
    {
      id: 'mentorship-setup',
      question: 'Como configurar sessões de mentoria?',
      answer: 'Na seção "Mentorias", defina seus horários disponíveis, valor por sessão e áreas de expertise. Você pode oferecer pacotes com desconto. As sessões acontecem via nossa plataforma integrada de vídeo.'
    },
    {
      id: 'payment-methods',
      question: 'Quais métodos de pagamento estão disponíveis?',
      answer: 'Transferências móveis, transferências bancárias (até 48h para processar), cartões de crédito.'
    },
    {
      id: 'payout-schedule',
      question: 'Quando recebo meus pagamentos?',
      answer: 'Os saques são processados toda quarta-feira para solicitações feitas até segunda-feira. O primeiro pagamento leva 14 dias úteis para liberação inicial, depois passa para o ciclo semanal padrão.'
    },
    {
      id: 'account-approval',
      question: 'Quanto tempo leva para minha conta ser aprovada?',
      answer: 'O cadastro de novos associados é revisado em até 3 dias úteis. Enviaremos um e-mail quando sua conta for ativada.'
    },
    {
      id: 'content-royalties',
      question: 'Qual a porcentagem que a plataforma fica?',
      answer: 'Para cursos: 20% sobre cada venda. Ebooks: 30% (incluindo distribuição). Mentorias: 15% por sessão. Essas taxas incluem processamento de pagamentos e uso da plataforma.'
    }
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <Accordion 
          className='flex w-full justify-center gap-3 p-10 flex-col'
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          variants={{
            expanded: {
              opacity: 1,
              scale: 1,
            },
            collapsed: {
              opacity: 0,
              scale: 0.7,
            },
          }}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={item.id} 
                  className="border border-gray-200 rounded-xl text-white overflow-hidden bg-[#273E66] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center mr-4 group-data-[state=open]:bg-blue-50 transition-colors">
                          <Plus className="w-4 h-4 text-blue-600 group-data-[state=open]:hidden" />
                          <ChevronDown className="w-4 h-4 text-blue-600 hidden group-data-[state=open]:block" />
                        </span>
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-600 transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0 text-white">
                    <div className="pl-12 pr-4">
                      <p>{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            Precisa de ajuda com algo específico?
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
            Acesse o Suporte Associado
          </button>
        </motion.div>
      </div>
    </section>
  );
}