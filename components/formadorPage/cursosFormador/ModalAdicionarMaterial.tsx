"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Video, Loader2, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onSubmit: (data: any[]) => void;
  idCurso: any;
}

interface VideoItem {
  id: number;
  title: string;
  unit: string; // unidade (listNumber)
  file: File | null;
  isUploading?: boolean;
}

export default function ModalAdicionarMaterial({ onClose, onSubmit, idCurso }: Props) {
  const [videos, setVideos] = useState<VideoItem[]>([
    { id: 1, title: "", unit: "", file: null },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const selectedFile = e.target.files?.[0] || null;
    setVideos(videos.map(video => 
      video.id === id ? { ...video, file: selectedFile } : video
    ));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideos(videos.map(video => 
        video.id === id ? { ...video, file: e.dataTransfer.files![0] } : video
      ));
    }
  };

  const handleTitleChange = (id: number, value: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, title: value } : video
    ));
  };

  const handleUnitChange = (id: number, value: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, unit: value } : video
    ));
  };

  const addVideoField = () => {
    if (videos.length >= 3) return;
    const newId = videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1;
    setVideos([...videos, { id: newId, title: "", unit: "", file: null }]);
  };

  const removeVideoField = (id: number) => {
    if (videos.length <= 1) return;
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleSubmit = async () => {
    if (videos.some(v => !v.file || !v.title || !v.unit)) {
      alert("Por favor, preencha todos os campos e selecione os arquivos.");
      return;
    }

    console.log("ID do Curso:", idCurso);
    console.log("Materiais a enviar:", videos);

    setIsUploading(true);

    try {
      const results = [];

      for (const video of videos) {
        const formData = new FormData();
        formData.append("title", video.title);
        formData.append("video", video.file!);
        formData.append("idCourse", String(idCurso?.id || idCurso));
        formData.append("listNumber", video.unit);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          toast.success(`O Vídeo ${video.title} foi enviado com  Sucesso`);
        } else {
          console.error(`Erro ao enviar vídeo: ${video.title}`, res.statusText);
          toast.error(`Erro ao enviar vídeo: ${video.title}`);
          continue;
        }

        const data = await res.json();
        results.push(data);
      }

      onSubmit(results);
      onClose();
    } catch (err) {
      console.error("Erro ao enviar materiais:", err);
      alert("Erro ao enviar vídeos.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Adicionar Materiais</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {videos.map((video, index) => (
                <div key={video.id} className="space-y-4 border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-700">Vídeo {index + 1}</h3>
                    {videos.length > 1 && (
                      <button
                        onClick={() => removeVideoField(video.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título do Vídeo
                    </label>
                    <Input
                      value={video.title}
                      onChange={(e) => handleTitleChange(video.id, e.target.value)}
                      placeholder={`Ex: Aula ${index + 1} - Introdução`}
                      className="border-gray-300 focus:ring-2 px-2 focus:ring-blue-500 text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unidade (número)
                    </label>
                    <Input
                      value={video.unit}
                      onChange={(e) => handleUnitChange(video.id, e.target.value)}
                      placeholder={`Ex: 1`}
                      className="border-gray-300 focus:ring-2 px-2 focus:ring-blue-500 text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e, video.id)}
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                      dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <UploadCloud
                        size={36}
                        className={`${
                          dragActive ? "text-blue-500" : "text-gray-400"
                        } transition-colors`}
                      />
                      <div className="text-sm text-gray-600">
                        {video.file ? (
                          <div className="flex items-center gap-2">
                            <Video size={16} className="text-blue-500" />
                            <span className="font-medium">{video.file.name}</span>
                          </div>
                        ) : dragActive ? (
                          "Solte o arquivo aqui"
                        ) : (
                          <>
                            <p>Arraste e solte seu vídeo aqui</p>
                            <p className="text-xs text-gray-500 mt-1">
                              ou clique para selecionar
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        id={`file-upload-${video.id}`}
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, video.id)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`file-upload-${video.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                      >
                        {video.file ? "Trocar arquivo" : "Selecionar arquivo"}
                      </label>
                    </div>
                  </div>

                  {video.file && (
                    <div className="text-xs text-gray-500">
                      <p>Tipo: {video.file.type}</p>
                      <p>Tamanho: {(video.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>
              ))}

              {videos.length < 3 && (
                <button
                  onClick={addVideoField}
                  className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
                >
                  <Plus size={18} />
                  Adicionar outro vídeo
                </button>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isUploading || videos.some(v => !v.file || !v.title || !v.unit)}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Enviando...
                </>
              ) : (
                `Salvar ${videos.length > 1 ? `${videos.length} Materiais` : 'Material'}`
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
