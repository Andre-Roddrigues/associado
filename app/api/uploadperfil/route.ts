import { routes } from "@/config/routes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhuma imagem recebida." }, { status: 400 });
    }

    // Extrair token do cookie
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Token de autenticação ausente." }, { status: 401 });
    }

    // Enviar para o backend
    const backendForm = new FormData();
    backendForm.append("photo", file);

    const response = await fetch(routes.addphoto, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendForm,
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao enviar imagem para o backend", details: result }, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
