"use server";

import { routes } from "@/config/routes";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export async function addAccount(data: any): Promise<boolean> {
  try {
    const token = cookies().get("auth_token")?.value || Cookies.get("auth_token");
    // Fallback to cookies if token is not found in headers
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return false;
    }

    const res = await fetch(routes.Bank, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.mensagem || "Erro ao adicionar conta.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao adicionar conta:", error);
    alert("Erro ao adicionar conta.");
    return false;
  }
}
