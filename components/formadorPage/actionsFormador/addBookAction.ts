"use server";

import { cookies } from "next/headers";
import { getInstructorData } from "./get-user-actions";

interface BookPayload {
  title: string;
  author: string;
  description: string;
  price: string;
  rating: string;
  totalReviews: string;
  format: "ebook" | "Livro Usado" | "Livro";
  pages: string;
  publishDate: string;
}

export async function addBookAction(data: BookPayload) {
  try {
    const token = cookies().get("auth_token")?.value;

    if (!token) {
      return { success: false, message: "Token de autenticação ausente." };
    }

    const user = await getInstructorData();
    const user_id = user?.id;

    console.log("✅ USER ID:", user_id); // <-- Aqui está o log do user ID

    if (!user_id) {
      return { success: false, message: "ID do usuário não encontrado." };
    }

    const payload = {
      ...data,
      user_id,
    };

    const response = await fetch("https://backend.unitec.ac.mz/ebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.message || "Erro ao enviar os dados do livro.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao publicar o livro:", error);
    return { success: false, message: "Erro interno ao publicar o livro." };
  }
}
