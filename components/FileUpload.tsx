
"use client"
import React, { useRef, useState } from "react";
import "./FileUpload.css";
import { UploadCloud, X, Check, Trash } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onFileUpload(file);
      handleUpload();
    } else {
      toast.error("Por favor, selecione apenas arquivos de imagem.");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onFileUpload(file);
      handleUpload();
    } else {
      toast.error("Por favor, arraste apenas arquivos de imagem.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSelectedFile(null);
      setPreviewUrl(null);
      setProgress(0);
      setUploadStatus("select");
    }
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await axios.post(
        "",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
        className="hidden"
      />

      {!selectedFile && (
        <div
          ref={dropRef}
          className="file-btn w-full lg:w-1/2 h-36 flex flex-col justify-center items-center bg-background 
          border border-dashed border-primary rounded-xl cursor-pointer transition-[all,0.3s,ease] gap-3 hover:bg-muted px-3 text-center"
          onClick={onChooseFile}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        > 
          <span><UploadCloud size={32} /></span>
          <p className="hover:text-primary">Arraste e solte seu comprovativo aqui ou clique para selecionar</p>
        </div>
      )}

      {selectedFile && (
        <div className="file-card w-full md:w-1/2 flex flex-col justify-center gap-3 bg-background border border-primary px-2 py-3 pb-2 rounded-md">
          {previewUrl && (
            <div className="relative w-3/4 lg:w-1/2 h-32">
              <Image src={previewUrl} fill alt="Preview" className="rounded" />
            </div>
          )}
          <div className="file-info h-full flex-1 flex items-center">
            <div className="flex-[2] flex flex-col gap-1 ">
              <h6>{selectedFile.name}</h6>
              <div className="flex gap-1 items-center ">
                <div className="progress-bg ">
                  <div className="progress" style={{ width: `${progress}%` }} /> 
                </div>
              </div>
            </div>

            {uploadStatus === "done" ? (
              <button className="mt-5" onClick={clearFileInput}>
                <Trash className="text-destructive w-4" />
              </button>
            ) : (
              <div className="check-circle mt-5">
                {(uploadStatus === "uploading") && (
                  `${progress}%`
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
