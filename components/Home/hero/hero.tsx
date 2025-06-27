"use client";

import Link from "next/link";
import {
  GraduationCap,
  UserCheck,
  BookOpen,
  DollarSign,
  BadgeCheck,
  Users,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="p-2">
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Torne-se um Associado{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  Unitec
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Faça parte de uma comunidade que compartilha conhecimento, desenvolve cursos,
                e-books e mentorias — com vantagens exclusivas e monetização.
              </p>
            </div>

            <div className="mt-10 py-8">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    {/* Coluna 1 */}
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <GraduationCap className="w-6 h-6 text-blue-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Cursos Online</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Acesse ou crie cursos com certificado e suporte.
                        </p>
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize2 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <UserCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Mentorias</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Receba acompanhamento individual com especialistas.
                        </p>
                      </div>
                    </div>

                    {/* Coluna 2 */}
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize2 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 mt-2  w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">E-books</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Crie ou baixe materiais didáticos em formato digital.
                        </p>
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Monetização</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Ganhe comissões por conteúdo, cursos ou mentorias.
                        </p>
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize2 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <BadgeCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Certificação</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Obtenha certificados ao concluir formações.
                        </p>
                      </div>
                    </div>

                    {/* Coluna 3 */}
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Networking</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Conecte-se com profissionais, alunos e empresas.
                        </p>
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 to-blue-500 p-6 animate-bounceAndResize2 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                          <Sparkles className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Vantagens Exclusivas</h3>
                        <p className="text-sm text-blue-800 mt-2">
                          Descontos, visibilidade e acesso antecipado a recursos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão */}
              <Link
                href="/login"
                className="inline-block rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 text-center font-medium text-white hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
