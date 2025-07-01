// app/api/cursos/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3VuaXRlYy5hYy5teiIsImF1ZCI6IlVuaXRlYyBBY2FkZW15IEludHJ1dG9yIiwic3ViIjoxMCwiaWRJbnN0cnVjdG9yIjoxMiwiZW1haWwiOiJsYXJpb3R5bGVyNkBnbWFpbC5jb20iLCJpYXQiOjE3NTEyODI2MzV9.I9ZmlB4VWwon7DSVn-RK_10nvft3GkWQVChbMGBUZrk"

  if (!token) {
    return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
  }

  try {
    const response = await fetch("https://backend.unitec.ac.mz/listcourseinstructor", {
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
