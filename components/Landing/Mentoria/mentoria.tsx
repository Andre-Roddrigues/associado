"use client";
import { Clock, Users, BookText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Mentor() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto mb-8 w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <Clock className="text-white" size={48} />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-500 mb-6">
          Estamos preparando algo incrível{dots}
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
          Nossa plataforma de cadastrar Mentoria está em desenvolvimento e em breve você poderá:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
        >
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-blue-600" size={28} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Compartilhe seu Conhecimento</h3>
            <p className="text-gray-600 text-sm">
            Alcance milhares de alunos e seguidores interessados no que você tem a ensinar.
            </p>
        </motion.div>

        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
        >
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookText className="text-amber-600" size={28} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Monetize seu Conteúdo</h3>
            <p className="text-gray-600 text-sm">
            Transforme sua mentoria em uma fonte de renda com poucos cliques.
            </p>
        </motion.div>

        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
        >
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-purple-600" size={28} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Faça a Diferença</h3>
            <p className="text-gray-600 text-sm">
            Ajude outras pessoas a crescer através da sua experiência e transforme vidas.
            </p>
        </motion.div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-lg mx-auto">
          <h3 className="font-medium text-blue-800 mb-3 flex items-center justify-center">
            <Clock className="mr-2" /> Aguarde nosso lançamento!
          </h3>
          <p className="text-blue-600">
            Estamos trabalhando para trazer a melhor experiência de mentoria digital.
            Cadastre-se abaixo para ser notificado quando lançarmos.
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg">
              Me avise
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}