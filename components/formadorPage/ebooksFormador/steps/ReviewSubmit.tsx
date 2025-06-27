"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  data: any;
  onBack: () => void;
  onReset: () => void;
}

export default function ReviewSubmit({ data, onBack, onReset }: Props) {
  const handleSubmitFinal = () => {
    console.log("Dados Finais =>", data);
    alert("Curso enviado com sucesso!");
    onReset();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Revisão dos Dados</h2>

      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
        <div>
          <b>Curso:</b> {data.nome}
        </div>
        <div>
          <b>Categoria:</b> {data.categoria}
        </div>
        <div>
          <b>O que ensinará:</b> {data.oqueEnsinara}
        </div>
        <div>
          <b>Objetivo:</b> {data.objectivo}
        </div>
        <div>
          <b>Preço:</b> {data.price}
        </div>
        <div>
          <b>Instrutor:</b> {data.nomecompleto}
        </div>
        <div>
          <b>Email:</b> {data.email}
        </div>
        <div>
          <b>Telefone:</b> {data.telefone}
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Voltar
        </Button>
        <Button onClick={handleSubmitFinal}>Submeter</Button>
      </div>
    </div>
  );
}
