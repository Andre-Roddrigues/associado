'use server';

import { routes } from "@/config/routes";

export async function registerNewCategory(data: any) {

  try {
    const res = await fetch(routes.novacategoria, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro na API:", errorText);
      throw new Error(`Erro ao Adcionar a Categoria: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro Adcionar a Categoria:", error);
    throw error;
  }
}
