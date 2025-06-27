"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Horarios() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const horario = searchParams.get("horario") ?? "";

  function handleSelectChange(value: string) {
    const sp = new URLSearchParams(searchParams);
    if (value.trim() === "") {
      sp.delete("horario");
    } else {
      sp.set("horario", value);
    }
    router.push(`?${sp.toString()}`, { scroll: false });
    console.log("horario", value);
  }

  return (
    <Select value={horario} onValueChange={handleSelectChange}>
      <span className="text-sm -mb-2 font-semibold">
        Selecione o horário de interação:
      </span>
      <SelectTrigger className="w-full lg:w-1/2">
        <SelectValue placeholder="Selecionar horario de interação" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Selecione o Horário da Interacção</SelectLabel>
          <SelectItem value="7:00-8:45">7:00-8:45</SelectItem>
          <SelectItem value="9:00-10:45">9:00-10:45</SelectItem>
          <SelectItem value="11:00-12:45">11:00-12:45</SelectItem>
          <SelectItem value="13:00-14:45">13:00-14:45</SelectItem>
          <SelectItem value="15:00-16:45">15:00-16:45</SelectItem>
          <SelectItem value="17:00-18:45">17:00-18:45</SelectItem>
          <SelectItem value="19:00-20:45">19:00-20:45</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
