// pages/unitec-associados.js

import Link from "next/link";

export default function UnitecAssociados() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="bg-primary py-10 lg:py-12 text-white text-center">
        <h1 className="text-2xl lg:text-4xl font-bold">Unitec Associados</h1>
        <p className="mt-2 text-base lg:mt-4  lg:text-lg px-3">
          Transforme conhecimento em lucros com o nosso programa de marketing de afiliados. 🚀
        </p>
      </header>

      {/* Content Section */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-primary text-center">
            🌟 Ganhe com a Educação! 🎓
          </h2>
          <p className="mt-4 text-base lg:text-lg text-gray-600 text-center">
            Com o <strong>Programa Unitec Associados</strong>, você pode ganhar{" "}
            <span className="text-primary font-bold">20% de comissão</span> por cada venda realizada
            através do seu código exclusivo.
          </p>
        </section>

        {/* How It Works */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-muted-foreground mb-4">💡 Como funciona?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Cadastre-se gratuitamente.",
              "Escolha um curso e pague.",
              "Clique no botão “Associado” no seu perfil.",
              "Solicite o seu código exclusivo.",
              "Leia e aceite os termos.",
              "Compartilhe com sua rede (amigos, família ou seguidores).",
              "Ganhe 20% de comissão por cada venda gerada!",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-4"
              >
                <span className="flex items-center justify-center min-w-10 min-h-10 max-h-10 text-white bg-primary rounded-full font-bold">
                  {index + 1}
                </span>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligible Courses */}
        <section className="mt-12 bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold text-muted-foreground mb-4">✅ Cursos Elegíveis:</h3>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <strong>Cursos online:</strong> Todos os cursos disponíveis no site.
            </li>
            <li>
              <strong>Cursos presenciais:</strong> Apenas a primeira mensalidade (pagamento no site).
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <Link href="/registro">
            <p className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-md shadow-lg hover:bg-cyan-500">
              👉 Registe-se agora e comece a lucrar com a educação!
            </p>
          </Link>
        </section>

        {/* Terms and Conditions */}
        <section className="mt-8 text-sm text-gray-500 text-center">
          {/* <p>
            <strong>Termos:</strong> As comissões são válidas apenas para pagamentos realizados pelo
            site da Unitec Academy.
          </p> */}
        </section>
      </main>
    </div>
  );
}
