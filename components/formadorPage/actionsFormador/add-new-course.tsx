'use server';

import { routes } from "@/config/routes";
import { cookies } from "next/headers";

export async function registerCursoInstrutor(data: any) {
  const token = cookies().get("auth_token")?.value;

  try {
    const res = await fetch(routes.addnewcourseinstructor, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro na API:", errorText);
      throw new Error(`Erro ao registrar curso: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no registerCursoInstrutor:", error);
    throw error;
  }
}
