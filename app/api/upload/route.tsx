// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
  }

  const formData = await req.formData();
  console.log("title:", formData.get("title"));
  console.log("idCourse:", formData.get("idCourse"));
  console.log("listNumber:", formData.get("listNumber"));
  console.log("video:", formData.get("video"));
  
  try {
    const response = await fetch("https://backend.unitec.ac.mz/addcourse", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao enviar vídeo" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no envio:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
