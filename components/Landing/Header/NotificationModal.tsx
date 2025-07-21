import { format } from "date-fns";
import { X } from "lucide-react";
import { Curso } from "./../../types/types";

interface Props {
  notifications: Curso[];
  readIds: string[];
  onClose: () => void;
}

export default function NotificationModal({ notifications, readIds, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Todas as Notificações</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">Nenhuma notificação encontrada.</div>
        ) : (
          <ul className="divide-y">
            {notifications.map((curso) => {
              const isRead = readIds.includes(`${curso.id}-${curso.estado}`);
              return (
                <li
                  key={`${curso.id}-${curso.estado}`}
                  className={`p-4 ${
                    isRead ? "bg-gray-100 text-gray-500" : "hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{curso.nomeDoCurso}</p>
                  <p className="text-xs">
                    {curso.estado ? (
                      <span className="text-green-600">Aprovado</span>
                    ) : (
                      <span className="text-red-600">Rejeitado</span>
                    )}{" "}
                    em {format(new Date(curso.updatedAt), "dd/MM/yyyy")}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
