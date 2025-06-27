"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  data: any;
  onBack: () => void;
  onReset: () => void;
  onSubmit: () => Promise<void>; // <- Já está certo aqui
}

export default function ReviewSubmit({ data, onBack, onReset, onSubmit }: Props) {
  const handleSubmitFinal = async () => {
    try {
      await onSubmit(); // chama a função enviada por props
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar o curso.");
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Revisão dos Dados</h2>

      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
        <div><b>Curso:</b> {data.nomeDoCurso}</div>
        <div><b>Categoria:</b> {data.idCategoria}</div>
        <div><b>O que ensinará:</b> {data.programaDoCurso}</div>
        <div><b>Objetivo:</b> {data.objectivoDoCurso}</div>
        <div><b>Preço:</b> {data.preco}</div>
        <div><b>Modalidade:</b> {data.modalidade}</div>
        <div><b>Duração:</b> {data.duracao}</div>
        <div><b>Instrutor:</b> {data.nomeCompleto}</div>
        <div><b>Email:</b> {data.email}</div>
        <div><b>Telefone:</b> {data.contacto}</div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">Voltar</Button>
        <Button onClick={handleSubmitFinal}>Submeter</Button>
      </div>
    </div>
  );
}
