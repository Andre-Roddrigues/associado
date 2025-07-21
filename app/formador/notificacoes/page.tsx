"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

export interface Curso {
  id: number;
  nomeDoCurso: string;
  estado: boolean; // true = aprovado, false = rejeitado
  updatedAt: string;
  // outros campos opcionais...
}

interface NotificationCurso {
  id: number;
  title: string;
  status: "aprovado" | "rejeitado";
  date: string; // formatado
  read: boolean;
}

export default function NotificationsCursos() {
  const [notifications, setNotifications] = useState<NotificationCurso[]>([]);
  const [currentFilter, setCurrentFilter] = useState<"all" | "read" | "unread">("all");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Buscar cursos da API e montar notificações
  useEffect(() => {
    async function fetchCursos() {
      try {
        const res = await fetch("/api/cursos");
        const cursos: Curso[] = await res.json();

        // Recupera ids lidos do localStorage
        const readIds = JSON.parse(localStorage.getItem("readNotificationIds") || "[]") as number[];

        // Mapeia cursos para notificações com estado de leitura
        const notifs: NotificationCurso[] = cursos
  .slice()
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .map((curso) => ({
    id: curso.id,
    title: curso.nomeDoCurso,
    status: curso.estado === true ? "aprovado" : "rejeitado",
    date: format(new Date(curso.updatedAt), "dd/MM/yyyy"),
    read: readIds.includes(curso.id),
  }));

        setNotifications(notifs);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }
    fetchCursos();
  }, []);

  // Fecha dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target as Node) &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Atualiza localStorage sempre que notificações mudam
  useEffect(() => {
    const readIds = notifications.filter((n) => n.read).map((n) => n.id);
    localStorage.setItem("readNotificationIds", JSON.stringify(readIds));
  }, [notifications]);

  // Marcar todas como lidas
  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  // Filtrar notificações
  const filteredNotifications = notifications.filter((n) => {
    if (currentFilter === "read") return n.read;
    if (currentFilter === "unread") return !n.read;
    return true;
  });

  // Cor do status
  function getStatusColor(status: "aprovado" | "rejeitado") {
    return status === "aprovado" ? "text-green-600" : "text-red-600";
  }

  // Ícone status
  function getStatusIcon(status: "aprovado" | "rejeitado") {
    return status === "aprovado" ? (
      <i className="fas fa-check-circle text-green-600"></i>
    ) : (
      <i className="fas fa-times-circle text-red-600"></i>
    );
  }

  // Clicar notificação marca como lida
  function handleNotificationClick(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <div className="bg-gray-50 font-sans min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Notificações</h2>
            <div className="flex items-center">
              <button
                onClick={markAllRead}
                className="text-blue-600 hover:text-blue-800 mr-4"
                type="button"
              >
                Marcar todas como lidas
              </button>
              <div className="relative">
                <button
                  ref={filterBtnRef}
                  onClick={() => setFilterDropdownOpen((v) => !v)}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={filterDropdownOpen}
                >
                  <i className="fas fa-filter mr-2"></i>
                  Filtrar
                </button>
                {filterDropdownOpen && (
                  <div
                    ref={filterDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  >
                    <div className="py-1">
                      {["all", "unread", "read"].map((filter) => (
                        <a
                          key={filter}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentFilter(filter as any);
                            setFilterDropdownOpen(false);
                          }}
                          className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer ${
                            currentFilter === filter ? "font-semibold bg-gray-100" : ""
                          }`}
                        >
                          {filter === "all"
                            ? "Todas"
                            : filter === "unread"
                            ? "Não lidas"
                            : "Lidas"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4" id="notifications-container">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-bell-slash text-4xl mb-4"></i>
                <p>Nenhuma notificação encontrada</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-4 rounded-lg flex items-start cursor-pointer select-text ${
                    !notification.read ? "unread bg-blue-50 border-l-4 border-blue-500" : "bg-white"
                  }`}
                  title="Clique para marcar como lida"
                >
                  <div className="flex-shrink-0 mt-1 text-xl">
                    {getStatusIcon(notification.status)}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                    <p className={getStatusColor(notification.status) + " text-sm"}>
                      {notification.status === "aprovado" ? "Aprovado" : "Rejeitado"}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-blue-500 mt-3"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
