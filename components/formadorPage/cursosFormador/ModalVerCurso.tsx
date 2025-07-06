"use client";

import { Button } from "@/components/ui/button";
import { Video } from "./CursosPage";
import { X, PlayCircle, Clock, CheckCircle, Lock } from "lucide-react";
// import { Progress } from "@/components/ui/progress";

interface Curso {
  id: number;
  nomeDoCurso: string;
  IdCategoria: number;
  objectivoDoCurso: string;
  descricaoDoCurso: string;
  programaDocurso: string;
  preco: number;
  modalidade: string;
  duracao: string;
  estado: boolean;
  video: Video[];
}

interface ModalVerCursoProps {
  curso: Curso;
  onClose: () => void;
}

export default function ModalVerCurso({ curso, onClose }: ModalVerCursoProps) {
  // Mock progress data (replace with real data)
//   const courseProgress = 65;
  const watchedVideos = curso.video.length > 0 ? 
    Math.floor(Math.random() * curso.video.length) : 0;

  const formatMetical = (value: number) =>
    value.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" });

  const statusBadge = curso.estado ? (
    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium">
      Aprovado
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 font-medium">
      Rejeitado
    </span>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-500 rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header with progress */}
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{curso.nomeDoCurso}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {watchedVideos}/{curso.video.length} aulas concluídas
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          {/* <Progress value={courseProgress} className="h-2 rounded-none" /> */}
        </div>

        {/* Course details */}
        <div className="p-6 space-y-6">
          {/* Course metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Modalidade</p>
              <p className="font-medium">{curso.modalidade}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Duração</p>
              <p className="font-medium">{curso.duracao}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Preço</p>
              <p className="font-medium text-primary">
                {formatMetical(curso.preco)}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Status</p>
              <div className="font-medium">{statusBadge}</div>
            </div>
          </div>

          {/* Course description sections */}
          <div className="space-y-6">
            {curso.objectivoDoCurso && (
              <DetailSection 
                title="Objetivo do Curso" 
                content={curso.objectivoDoCurso}
                icon={<PlayCircle className="text-primary" size={18} />}
              />
            )}
            {curso.descricaoDoCurso && (
              <DetailSection 
                title="Descrição" 
                content={curso.descricaoDoCurso}
                icon={<Clock className="text-blue-500" size={18} />}
              />
            )}
            {curso.programaDocurso && (
              <DetailSection 
                title="Programa do Curso" 
                content={curso.programaDocurso}
                icon={<CheckCircle className="text-green-500" size={18} />}
              />
            )}
          </div>

          {/* Video lessons */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <VideoIcon className="text-primary" size={20} />
              Aulas em Vídeo
            </h4>

            {curso.video.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Nenhum vídeo disponível para este curso.</p>
                <Button variant="outline" className="mt-4">
                  Adicionar Aula
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {curso.video.map((video, index) => (
                  <VideoLessonCard 
                    key={video.id} 
                    video={video} 
                    index={index}
                    isWatched={index < watchedVideos}
                    isLocked={index > watchedVideos && watchedVideos < curso.video.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
          <Button onClick={onClose} className="px-6">
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}

// Premium Components
const VideoLessonCard = ({ 
  video, 
  index,
  isWatched,
  isLocked 
}: { 
  video: Video; 
  index: number;
  isWatched: boolean;
  isLocked: boolean;
}) => {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all hover:shadow-md ${
      isLocked ? 'opacity-70' : ''
    }`}>
      <div className={`p-4 flex justify-between items-center ${
        isWatched ? 'bg-green-50' : 'bg-gray-50'
      }`}>
        <div className="flex items-center gap-3">
          {isLocked ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Lock className="text-gray-400" size={16} />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isWatched ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
            }`}>
              {index + 1}
            </div>
          )}
          <div>
            <h5 className={`font-medium ${
              isWatched ? 'text-green-700' : 'text-gray-800'
            }`}>
              {video.title}
            </h5>
            <p className="text-xs text-gray-500">
              Aula {video.listNumber} • {Math.floor(Math.random() * 15) + 5} min
            </p>
          </div>
        </div>
        {isWatched && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Concluído
          </span>
        )}
      </div>
      {!isLocked && (
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <iframe
            src={`https://player.vimeo.com/video/${video.uri}`}
            width="100%"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-[360px]"
          />
        </div>
      )}
    </div>
  );
};

const DetailSection = ({ 
  title, 
  content,
  icon 
}: { 
  title: string; 
  content: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h5 className="font-semibold text-gray-800">{title}</h5>
      </div>
      <p className="text-gray-700 whitespace-pre-line text-sm pl-6">{content}</p>
    </div>
  );
};

const VideoIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);