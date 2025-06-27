"use client";

import * as React from "react";
import { useDebouncedCallback } from "use-debounce";

interface InputCupponProps {
  cuppon: string;
  setCuppon: (value: string) => void;
}

export function InputCuppon({ cuppon, setCuppon }: InputCupponProps) {
  const [otpValue, setOtpValue] = React.useState(""); // Estado local para o valor do cupom

  // Função de debounce para atualizar o cupom no componente pai
  const debounceUpdate = useDebouncedCallback((value: string) => {
    if (value.length >= 3) {
      setCuppon(value); // Atualiza o estado do cupom no componente pai após 500ms
    } else if (!value) {
      setCuppon(""); // Limpa o estado do cupom no componente pai se não há valor
    }
  }, 500);

  // Função de mudança no valor do campo
  function handleChange(value: string) {
    setOtpValue(value); // Atualiza o estado local imediatamente
    debounceUpdate(value); // Aplica debounce para a atualização no componente pai
  }

  return (
    <div className="py-2 mb-2">
      <div className="text-sm my-[2px]">Cupão de desconto (opcional):</div>
      <input
        type="text"
        value={otpValue} // Valor atual do cupom
        onChange={(e) => handleChange(e.target.value)} // Atualiza conforme o usuário digita
        placeholder="Digite o seu cupão"
        className="w-full p-2 border rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none "
      />
    </div>
  );
}
