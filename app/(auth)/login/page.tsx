"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Award, BookOpen, Users, Loader2, LockKeyhole, MailCheck } from "lucide-react";
import { authenticate } from "@/lib/auth-actions";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import ModalTermos from "./ModalTermis";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authenticate(email, password);

      if (response.success) {
        toast.success("Login realizado com sucesso!");
        router.push("/formador/painel");
      } else {
        toast.error(response.message || "Credenciais inválidas");
        setError(response.message || "Credenciais inválidas");
      }
    } catch (err) {
      toast.error("Ocorreu um erro durante o login. Tente novamente.");
      setError("Ocorreu um erro durante o login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex bg-white">
        {/* Seção da Imagem */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/HeroImageCurso.webp')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
            <h1 className="text-4xl font-bold mb-6 text-center">Bem-vindo Sócio!</h1>
            <p className="text-xl text-center mb-8 max-w-lg">
              Compartilhe seu conhecimento, ensine o que ama e transforme vidas enquanto monetiza seu conteúdo.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Seção do Formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <section className="w-full max-w-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                    <LockKeyhole className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-500">
                  É bom ter você de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    volta
                  </span>
                </h1>
                <p className="text-gray-500 mt-2">
                  Introduza o seu email e senha e comece já a ganhar connosco!
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 shadow-lg py-3 text-gray-700 border border-gray-300 rounded-lg bg-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="unitec@unitec.ac.mz"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockKeyhole className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 text-gray-700 pr-10 py-3 border shadow-lg border-gray-300 rounded-lg bg-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="********"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Carregando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </button>

                <div className="text-center text-sm text-gray-500">
                  Ao continuar, você concorda com os{" "}
                  <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                  >
                    Termos e Condições de Uso
                  </button>
                </div>
              </form>

              <ModalTermos isOpen={openModal} onClose={() => setOpenModal(false)} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
