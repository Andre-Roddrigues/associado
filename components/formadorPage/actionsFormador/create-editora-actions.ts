"use server";

import { routes } from "@/config/routes";

export async function criarEditora(payload: {
  name: string;
  email: string;
  phone: string;
}) {
  try {
    const res = await fetch(routes.createpublisher, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Erro ao criar editora:", error);
    return { error: "Erro ao criar editora" };
  }
}
