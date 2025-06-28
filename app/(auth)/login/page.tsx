"use client";
import logo from "@/public/images/icon.ico";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Award, Users, LockKeyhole, MailCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import { InputFieldS } from "@/components/ui/inputFieldSenha";
import { login } from "./auth-actions";
import ModalTermos from "./ModalTermis";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [newPassword, setNewPassword] = useState("");
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    const redirectUrl =
      new URL(window.location.href).searchParams.get("redirect") || "/formador/painel";

    try {
      const response = await login(email, senha);
      console.log(response);
      console.log("resposta status: ", response?.status);
      if (!response?.sucess) {
        if (response?.status === 400 || response?.status === 401) {
          toast.error(
            "Credenciais inválidas. Por favor, verifique seu e-mail ou senha."
          );
        }
        if (response?.status === 429) {
          toast.error(
            "Você excedeu o limite de tentativas de login. Por favor, tente novamente mais tarde(Após 5 Minutos)."
          );
        } else {
          toast.error(
            "Ocorreu um erro. Por favor, tente novamente mais tarde."
          );
        }
        return;
      }

      // Captura o parâmetro de redirecionamento

      console.log("Redirecionando para: ", redirectUrl);

      toast.success("Bem vindo!");
      router.push(redirectUrl);
      window.location.reload();
    } catch (error) {
      console.log("Erro ", error);
    } finally {
      setLoading(false);
    }
    router.push(redirectUrl);
    window.location.reload();
  };

  return (
    <>
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
    <section className="w-full max-w-md  overflow-hidden ">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <LockKeyhole className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-500">
            É bom ter você de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">volta</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Introduza o seu email e senha e comece já a ganhar connosco!
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailCheck className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 shadow-lg py-3 text-muted-foreground border border-gray-300 rounded-lg bg-white placeholder:text-zinc-400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none disabled:cursor-not-allowed disabled:opacity- disabled:border-none disabled:bg-transparent disabled:text-zinc-600 disabled:tracking-wide transition-all duration-300"
                placeholder="unitec@unitec.ac.mz"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="block w-full pl-10 text-muted-foreground pr-10 py-3 border shadow-lg border-gray-300 rounded-lg bg-white focus:ring-2 placeholder:text-zinc-400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none disabled:cursor-not-allowed disabled:opacity- disabled:border-none disabled:bg-transparent disabled:text-zinc-600 disabled:tracking-wide transition-all duration-300"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={toggleNewPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/recuperar-senha"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Esqueceu a senha?
            </Link>
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

          <ModalTermos isOpen={openModal} onClose={() => setOpenModal(false)} />
        </form>
      </div>
    </section>
  </div>
</div>
    </>
  );
};

export default Login;
