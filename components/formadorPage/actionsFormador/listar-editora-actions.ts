"use server";

import { routes } from "@/config/routes";

export async function listarEditoras() {
  try {
    const res = await fetch(routes.publisherslist);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao listar editoras:", error);
    return [];
  }
}
