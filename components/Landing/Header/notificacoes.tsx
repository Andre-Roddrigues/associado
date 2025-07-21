"use client";

import {
  Bell,
  ChevronRight,
  Check,
  X,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

export interface Video {
  id: number;
  url: string;
  fileName: string;
  originalName: string;
  uri: string;
  idInstrutor: number;
  idCourse: number;
  listNumber: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Curso {
  id: number;
  nomeDoCurso: string;
  IdCategoria: number;
  objectivoDoCurso: string;
  descricaoDoCurso: string;
  programaDocurso: string;
  preco: number;
  modalidade: string;
  duracao: string;
  idInstrutor: number;
  estado: boolean;
  maxQnt: number | null;
  createdAt: string;
  updatedAt: string;
  video: Video[];
}

export default function PremiumNotificationBell() {
  const [notifications, setNotifications] = useState<Curso[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Fetch cursos e define notificações
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/cursos");
        const data = await response.json();

        const filtered = data.filter(
          (curso: Curso) => curso.estado === true || curso.estado === false
        );

        const sorted = filtered.sort(
          (a: Curso, b: Curso) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        setNotifications(sorted);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();

    // Simula verificação de plano Premium
    setIsPremium(Math.random() > 0.5);
  }, []);

  // Carrega notificações lidas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("readNotificationIds");
    if (stored) {
      setReadIds(JSON.parse(stored));
    }
  }, []);

  // Badge só mostra notificações novas (não lidas)
  const unreadNotifications = notifications.filter(
    (curso) => !readIds.includes(`${curso.id}-${curso.estado}`)
  );
  const displayCount: number | "99+" =
    unreadNotifications.length > 99 ? "99+" : unreadNotifications.length;

  // Quando abre o dropdown, marca todas como lidas e salva no localStorage
  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      const nextState = !prev;

      if (nextState) {
        const allIds = notifications.map(
          (curso) => `${curso.id}-${curso.estado}`
        );
        localStorage.setItem("readNotificationIds", JSON.stringify(allIds));
        setReadIds(allIds);
      }

      return nextState;
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`relative p-2 rounded-full transition-all duration-300 ${
          dropdownOpen ? "bg-gray-100/20" : "hover:bg-gray-100/10"
        }`}
      >
        <div className="relative">
          <Bell className="w-6 h-6 text-white" />
          {displayCount !== 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {displayCount}
            </span>
          )}
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[32rem] overflow-y-auto transform transition-all duration-300 origin-top-right">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <div>
              <h3 className="font-semibold text-gray-900">Notificações</h3>
              <p className="text-xs text-gray-500">
                {unreadNotifications.length} não lidas
              </p>
            </div>
            {isPremium ? (
              <span className="flex items-center text-xs bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3 mr-1" /> Premium
              </span>
            ) : (
              <button className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-full hover:from-blue-200 hover:to-indigo-200 transition-colors">
                Upgrade
              </button>
            )}
          </div>

          {/* Lista de Notificações */}
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                Nenhuma notificação recente
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {notifications.slice(0, isPremium ? 10 : 5).map((curso) => {
                  const isRead = readIds.includes(
                    `${curso.id}-${curso.estado}`
                  );
                  return (
                    <li
                      key={`${curso.id}-${curso.estado}`}
                      className={`p-4 cursor-pointer transition-colors ${
                        isRead
                          ? "bg-gray-50"
                          : "bg-white hover:bg-blue-50/50"
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 mt-1 p-2 rounded-full ${
                            curso.estado
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {curso.estado ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {curso.nomeDoCurso}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(
                              new Date(curso.updatedAt),
                              "dd/MM/yyyy 'às' HH:mm"
                            )}
                          </p>
                          <div className="mt-2 flex items-center">
                            {curso.estado ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Aprovado
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                Rejeitado
                              </span>
                            )}
                            {!isPremium && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                Básico
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                      </div>
                    </li>
                  );
                })}
              </ul>

              {!isPremium && notifications.length > 5 && (
                <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Atualize para Premium
                      </p>
                      <p className="text-xs text-gray-600">
                        Veja todas as {notifications.length} notificações e
                        receba alertas em tempo real
                      </p>
                    </div>
                    <button className="ml-auto text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-colors">
                      Upgrade
                    </button>
                  </div>
                </div>
              )}

              <div className="p-3 border-t border-gray-100 text-center">
                <Link
                  href="/formador/notificacoes"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Ver todas as notificações
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
