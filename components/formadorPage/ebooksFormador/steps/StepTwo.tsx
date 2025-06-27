"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

export default function StepTwo({ onNext, onBack, defaultValues }: Props) {
  const [file, setFile] = useState<File | null>(defaultValues?.capa || null);
  const [preview, setPreview] = useState<string | null>(
    defaultValues?.capa ? URL.createObjectURL(defaultValues.capa) : null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Por favor selecione a imagem da capa.");
      return;
    }
    onNext({ capa: file });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="w-40 h-60 object-cover rounded-lg shadow" />
        ) : (
          <div className="w-40 h-60 border-2 border-dashed rounded-lg flex justify-center items-center text-gray-400">
            <ImageIcon size={40} />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Voltar</Button>
        <Button onClick={handleSubmit}><UploadCloud className="mr-2" />Próximo</Button>
      </div>
    </div>
  );
}
