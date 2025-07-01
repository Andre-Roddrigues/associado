"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Percent,
  CheckCircle2,
  Eye,
  Wrench,
  Layout,
  CreditCard,
  X,
} from "lucide-react";
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
      icon: <Percent size={28} className="text-white" />,
      title: "Comissões atrativas",
      shortDescription:
        "Fique com a maior fatia da receita e taxas sempre transparentes.",
      fullDescription: [
        "Até 80 % de comissão em vendas diretas.",
        "Taxas fixas e sem surpresas na hora do saque.",
        "Relatórios detalhados para acompanhar cada centavo.",
      ],
      practiceTip:
        "Combine ofertas relâmpago com cupons para aumentar ainda mais seu ticket médio.",
      gradient: "from-emerald-500 to-green-400",
    },
    {
      id: 2,
      icon: <CheckCircle2 size={28} className="text-white" />,
      title: "Aprovação rápida",
      shortDescription:
        "Suba seu conteúdo e, em poucas horas, já pode começar a vender.",
      fullDescription: [
        "Time de curadoria 24/7 para agilizar a revisão.",
        "Checklist inteligente aponta ajustes antes de enviar.",
        "Notificação em tempo real assim que seu curso é liberado.",
      ],
      practiceTip:
        "Use nossas boas‑práticas de formatação para reduzir retrabalho e acelerar ainda mais.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      id: 3,
      icon: <Eye size={28} className="text-white" />,
      title: "Ampla visibilidade",
      shortDescription:
        "Alcance milhares de alunos com SEO otimizado e promoções internas.",
      fullDescription: [
        "Página do produto indexada automaticamente no Google.",
        "Participação em campanhas sazonais da plataforma.",
        "Ferramentas de afiliados para multiplicar seu alcance.",
      ],
      practiceTip:
        "Ative cupons de afiliados e aproveite o algoritmo de recomendação para ganhar tráfego extra.",
      gradient: "from-indigo-500 to-purple-400",
    },
    {
      id: 4,
      icon: <Wrench size={28} className="text-white" />,
      title: "Suporte técnico e ferramentas úteis",
      shortDescription:
        "Você tem ajuda quando precisar e ferramentas que facilitam o dia a dia.",
      fullDescription: [
        "Acompanhe suas vendas e acessos com gráficos simples e claros.",
        "Tenha uma visão completa do que está funcionando e onde pode melhorar.",
        "Se tiver dúvidas ou problemas, nosso suporte técnico responde rápido, geralmente em até 2 horas úteis.",
      ],
      practiceTip:
        "Sempre que precisar de ajuda com sua conta ou conteúdo, é só chamar o suporte.",
      gradient: "from-indigo-500 to-violet-400",
    },    
    {
      id: 5,
      icon: <Layout size={28} className="text-white" />,
      title: "Presença profissional personalizada",
      shortDescription:
        "Tenha uma página exclusiva com um e‑mail profissional para reforçar sua marca.",
      fullDescription: [
        "Construa sua identidade digital com uma página dedicada ao seu conteúdo.",
        "Utilize um e‑mail personalizado com domínio @unitec.academy para transmitir mais credibilidade.",
        "Compartilhe seu link único com alunos e parceiros para se destacar no mercado.",
      ],
      practiceTip:
        "Use seu e‑mail personalizado em redes sociais e propostas comerciais para reforçar sua autoridade como instrutor.",
      gradient: "from-pink-500 to-rose-400",
    },    
    {
      id: 6,
      icon: <CreditCard size={28} className="text-white" />,
      title: "Formas de pagamento",
      shortDescription:
        "Cartões, M‑Pesa, PayPal, MB Way e muito mais — receba como quiser.",
      fullDescription: [
        "16 gateways integrados cobrindo África, Europa e Américas.",
        "Conversão automática de moeda para facilitar vendas globais.",
        "Proteção contra chargeback e fraudes incluída.",
      ],
      practiceTip:
        "Ative pagamento recorrente para mentorias e garanta receita mensal previsível.",
      gradient: "from-purple-500 to-violet-400",
    },
  ];

  const handleLearnMore = (index: number) => {
    setSelectedFeature(index);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
    document.body.style.overflow = "auto";
  };

  return (
    <motion.section
      id="saque"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 px-6 bg-gradient-to-br text-gray-500 from-blue-50 to-gray-50 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-500 mb-4">
            <span className="">Benefícios</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Exclusivos
            </span>{" "}
            da Unitec PRO
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra como transformar seu conhecimento em renda de forma
            escalável, segura e transparente
          </p>
        </div>

        {/* GRID – 3 colunas em desktop, 2 no tablet, 1 no mobile */}
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
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>

                <h4 className="text-xl font-semibold text-gray-500 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.shortDescription}
                </p>

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

      {/* MODAL */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
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
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${features[selectedFeature].gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  {features[selectedFeature].icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-500 mb-4">
                  {features[selectedFeature].title}
                </h3>

                <div className="space-y-4 mb-6">
                  {features[selectedFeature].fullDescription.map((item, i) => (
                    <p
                      key={i}
                      className="text-gray-600 flex items-start leading-relaxed"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mt-2 mr-2" />
                      {item}
                    </p>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Como funciona na prática:
                  </h4>
                  <p className="text-blue-600 text-sm">
                    {features[selectedFeature].practiceTip}
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
