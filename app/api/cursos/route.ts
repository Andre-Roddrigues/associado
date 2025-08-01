// app/api/cursos/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { routes } from "@/config/routes";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
  }

  try {
    const response = await fetch(routes.listcourseinstructor, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao buscar cursos" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
