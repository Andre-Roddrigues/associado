import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  try {
    // Exclui o cookie de sessão
    cookies().set("session", "", { maxAge: -1, path: "/" });
    cookies().delete("session");
    console.log("Usuário deslogado com sucesso!");
    const url = req.url;
    const baseUrl = new URL(url).origin;
    console.log("Url: ", url);
    console.log("Base URL", baseUrl);
    req.cookies.delete("session");

    // Retorna uma resposta JSON indicando o sucesso
    // return NextResponse.redirect(baseUrl)
    return NextResponse.json({ url: baseUrl });
  } catch (error: any) {
    console.error("Erro ao processar logout:", error);

    // Retorna uma resposta de erro
    return NextResponse.json(
      { message: "Erro ao realizar logout", error: error.message },
      { status: 500 }
    );
  }
}
