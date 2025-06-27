"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, UploadCloud } from "lucide-react";

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

export default function StepThree({ onNext, onBack, defaultValues }: Props) {
  const [file, setFile] = useState<File | null>(defaultValues?.arquivo || null);
  const [fileName, setFileName] = useState<string>(defaultValues?.arquivo?.name || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Por favor selecione o arquivo PDF.");
      return;
    }
    onNext({ arquivo: file });
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-center items-center">
        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 w-full text-gray-500">
          <FileText size={50} />
          <span className="mt-4">{fileName || "Clique para selecionar o arquivo PDF"}</span>
          <input type="file" accept=".pdf" onChange={handleFileChange} hidden />
        </label>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Voltar</Button>
        <Button onClick={handleSubmit}><UploadCloud className="mr-2" />Finalizar</Button>
      </div>
    </div>
  );
}
