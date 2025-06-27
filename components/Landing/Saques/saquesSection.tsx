"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wallet2, Banknote, Clock3, ShieldCheck, X, FileText, Users } from "lucide-react";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export function SaqueSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      icon: <Wallet2 size={28} className="text-white" />,
      title: "Ganhos em tempo real",
      shortDescription: "Visualize o crescimento da sua receita à medida que suas vendas acontecem.",
      fullDescription: [
        "Acompanhe cada transação em tempo real com nosso painel detalhado.",
        "Gráficos interativos mostram seu crescimento financeiro dia a dia.",
        "Notificações instantâneas para cada nova venda ou assinatura.",
        "Histórico completo de todas as suas transações."
      ],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      icon: <Banknote size={28} className="text-white" />,
      title: "Saque flexível",
      shortDescription: "Receba seus ganhos na sua carteira móvel, banco ou outros métodos disponíveis.",
      fullDescription: [
        "Múltiplas opções de saque: M-Pesa, bancos locais e transferências internacionais.",
        "Taxas competitivas e transparentes para cada método.",
        "Limites de saque ajustáveis conforme sua necessidade.",
        "Programação de saques recorrentes automáticos."
      ],
      gradient: "from-emerald-500 to-teal-400"
    },
    {
      id: 3,
      icon: <Clock3 size={28} className="text-white" />,
      title: "Transferência rápida",
      shortDescription: "Solicite seu saque e receba em até 24 horas úteis, sem complicações.",
      fullDescription: [
        "Processamento acelerado para saques urgentes (disponível para alguns métodos).",
        "Status de transferência acompanhável em cada etapa.",
        "Horário de corte para processamento no mesmo dia: 15h (horário local).",
        "Receba notificações quando o dinheiro chegar na sua conta."
      ],
      gradient: "from-amber-500 to-yellow-400"
    },
    {
      id: 4,
      icon: <ShieldCheck size={28} className="text-white" />,
      title: "Sistema seguro",
      shortDescription: "Seus dados e transações são protegidos com tecnologia de ponta.",
      fullDescription: [
        "Criptografia de ponta a ponta em todas as transações.",
        "Autenticação de dois fatores para operações sensíveis.",
        "Monitoramento 24/7 contra atividades suspeitas.",
        "Seguro contra fraudes e garantia de devolução em casos comprovados."
      ],
      gradient: "from-purple-500 to-violet-400"
    }
  ];

  const handleLearnMore = (index: number) => {
    setSelectedFeature(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
    document.body.style.overflow = 'auto';
  };

  return (
    
    <motion.section
      id="saque"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 px-6 bg-gradient-to-br from-blue-50 to-gray-50 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Ganhos</span> e Saque
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Acompanhe seus ganhos em tempo real, tudo de forma simples, segura e rápida. 
            Comece a monetizar agora mesmo e tenha controle total sobre seus recursos financeiros.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-full"
              layoutId={`feature-${feature.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-300 opacity-0 group-hover:opacity-100 border border-gray-100" />
              
              <div className="relative h-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-transparent flex flex-col">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.shortDescription}</p>
                
                <button 
                  onClick={() => handleLearnMore(index)}
                  className="mt-6 pt-4 border-t border-gray-100 group-hover:border-transparent transition-colors text-left"
                >
                  <span className="text-xs font-medium text-gray-400 group-hover:text-blue-500 transition-colors">
                    Saiba mais →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
  <div className="p-8 md:p-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h4 className="text-3xl font-bold text-gray-900 mb-2">
          Otimize sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Estratégia Financeira</span>
        </h4>
        <p className="text-lg text-gray-600 max-w-2xl">
          Descubra como maximizar seus rendimentos e aproveitar ao máximo nossa plataforma
        </p>
      </div>
      <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
        <Banknote className="text-white" size={28} />
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Monetization Tips */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h5 className="font-semibold text-lg text-gray-800">Dicas de Monetização</h5>
        </div>
        <ul className="space-y-3">
          {[
            "Lance novos conteúdos semanalmente",
            "Crie pacotes com cursos complementares",
            "Ofereça mentorias em grupo (mais econômicas)",
            "Promova temporadas de descontos estratégicos"
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <span className="ml-3 text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Transparent Fees */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h5 className="font-semibold text-lg text-gray-800">Taxas Transparentes</h5>
        </div>
        <div className="space-y-4">
          {[
            { label: "Vendas de cursos", value: "5%", highlight: false },
            { label: "Mentorias individuais", value: "10%", highlight: false },
            { label: "Pacotes premium", value: "7%", highlight: true },
            { label: "Taxa de saque", value: "1%", highlight: false }
          ].map((fee, i) => (
            <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${fee.highlight ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}>
              <span className="text-gray-700">{fee.label}</span>
              <span className={`font-medium ${fee.highlight ? "text-blue-600" : "text-gray-800"}`}>{fee.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dedicated Support */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h5 className="font-semibold text-lg text-gray-800">Suporte Dedicado</h5>
        </div>
        <div className="space-y-4">
          {[
            {
              icon: <Clock3 className="text-cyan-600" size={18} />,
              title: "Atendimento 24/7",
              description: "Equipe especializada disponível a qualquer momento"
            },
            {
              icon: <FileText className="text-blue-600" size={18} />,
              title: "Relatórios Mensais",
              description: "Análises detalhadas do seu desempenho financeiro"
            },
            {
              icon: <Users className="text-purple-600" size={18} />,
              title: "Consultoria Premium",
              description: "Estratégias personalizadas para aumentar seus ganhos"
            }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <h6 className="font-medium text-gray-800">{item.title}</h6>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</div>
      {/* Modal-like Detailed View */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              layoutId={`feature-${features[selectedFeature].id}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>

              <div className="p-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${features[selectedFeature].gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  {features[selectedFeature].icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{features[selectedFeature].title}</h3>
                
                <div className="space-y-4 mb-6">
                  {features[selectedFeature].fullDescription.map((item, i) => (
                    <p key={i} className="text-gray-600 flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mt-2 mr-2"></span>
                      {item}
                    </p>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Como funciona na prática:</h4>
                  <p className="text-blue-600 text-sm">
                    {selectedFeature === 0 && "Seu saldo é atualizado instantaneamente após cada transação aprovada."}
                    {selectedFeature === 1 && "Configure seus métodos preferidos e faça saques com apenas 2 cliques."}
                    {selectedFeature === 2 && "Solicitações feitas até as 15h são processadas no mesmo dia útil."}
                    {selectedFeature === 3 && "Todos os dados financeiros são armazenados com criptografia bancária."}
                  </p>
                </div>

                <button 
                  onClick={handleCloseModal}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all"
                >
                  Entendi, obrigado!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  
  );
}