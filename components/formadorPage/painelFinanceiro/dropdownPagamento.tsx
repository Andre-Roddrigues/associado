"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronDown } from "lucide-react";

interface Banco {
  label: string;
  value: string;
  logo: StaticImageData;
  precisaNib: boolean;
}

interface BancoDropdownProps {
  selectedBanco: string;
  onChange: (value: string) => void;
  bancos: Banco[];
}

export default function BancoDropdown({ selectedBanco, onChange, bancos }: BancoDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const bancoSelecionado = bancos.find((b) => b.value === selectedBanco) || bancos[0];

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className="w-full flex items-center justify-between border border-gray-300 rounded p-2 bg-white"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 text-gray-600">
          <Image src={bancoSelecionado.logo} alt={bancoSelecionado.label} width={22} height={22} />
          <span>{bancoSelecionado.label}</span>
        </div>
        <ChevronDown size={20} />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white text-gray-600 border border-gray-300 rounded shadow max-h-48 overflow-auto">
          {bancos.map((banco) => (
            <li
              key={banco.value}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onChange(banco.value);
                setOpen(false);
              }}
            >
              <Image src={banco.logo} alt={banco.label} width={22} height={22} className="rounded-full"/>
              <span>{banco.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
