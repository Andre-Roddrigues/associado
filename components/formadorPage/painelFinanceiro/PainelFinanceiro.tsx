"use client";

import { useMemo, useState } from "react";
import CardFinanceiro from "./cardFinanceiro";
import GraficoFinanceiro from "./graficoFinanceiro";
import TabelaFinanceira from "./tabelaFinanceira";
import TabelaHistoricoSaques from "./tabelaHistoricoSaques";

export default function PainelFormador() {
  const [cursos, setCursos] = useState([
    {
      nome: "React Avançado",
      valor: "1500",
      status: "Ativo",
      CursoRegistados: [
        { aluno: { nome: "Andre", email: "andre@gmail.com" }, dataCompra: "2025-06-10" },
        { aluno: { nome: "Rodrigues", email: "rodrigues@gmail.com" }, dataCompra: "2025-06-11" },
      ],
    },
    {
      nome: "Python para Data Science",
      valor: "2000",
      status: "Ativo",
      CursoRegistados: [{ aluno: { nome: "Novela", email: "novela@gmail.com" }, dataCompra: "2025-06-08" }],
    },
    {
      nome: "Design UI/UX",
      valor: "1000",
      status: "Ativo",
      CursoRegistados: [],
    },
  ]);

  const [historicoSaques, setHistoricoSaques] = useState<any[]>([]);

  const totalVendasAtivos = useMemo(() => {
    return cursos
      .filter(curso => curso.status === "Ativo")
      .reduce((total, curso) => {
        const inscritos = curso.CursoRegistados?.length || 0;
        return total + inscritos * parseFloat(curso.valor);
      }, 0);
  }, [cursos]);

  const totalSacado = useMemo(() => {
    return historicoSaques
      .filter((saque) => saque.status === "Recebido")
      .reduce((total, saque) => total + saque.valor, 0);
  }, [historicoSaques]);

  const saldoDisponivel = totalVendasAtivos;

  const totalArrecadado = totalSacado + saldoDisponivel;

  const totalAlunos = useMemo(() => {
    return cursos.reduce((total, curso) => total + (curso.CursoRegistados?.length || 0), 0);
  }, [cursos]);

  const registros = useMemo(() => {
    const lista: any[] = [];
    cursos.forEach((curso) => {
      curso.CursoRegistados?.forEach((inscricao: any) => {
        lista.push({
          aluno: inscricao.aluno?.nome || "Desconhecido",
          email: inscricao.aluno?.email || "-",
          curso: curso.nome,
          valor: parseFloat(curso.valor) || 0,
          dataCompra: inscricao.dataCompra || "-",
          status: curso.status,
        });
      });
    });
    return lista;
  }, [cursos]);

  const vendasPorCurso = cursos.map((curso) => ({
    nome: curso.nome,
    total: (curso.CursoRegistados?.length || 0) * (parseFloat(curso.valor) || 0),
  }));

  const handleConfirmSaque = async (dados: { nome: string; contacto: string; banco: string; nib?: string }) => {
    const possuiCursosParaSaque = cursos.some(
      (curso) => curso.status === "Ativo" && curso.CursoRegistados.length > 0
    );

    if (!possuiCursosParaSaque || saldoDisponivel <= 0) {
      alert("Não há novos valores disponíveis para saque.");
      return;
    }

    const saque = {
      ...dados,
      data: new Date().toLocaleString("pt-MZ"),
      valor: saldoDisponivel,
      status: "Pendente",
    };

    setHistoricoSaques((prev) => [...prev, saque]);

    const cursosAtualizados = cursos.map((curso) => {
      if (curso.CursoRegistados.length > 0 && curso.status === "Ativo") {
        return { ...curso, status: "Pendente" };
      }
      return curso;
    });

    setCursos(cursosAtualizados);

    setTimeout(() => {
      setHistoricoSaques((prev) =>
        prev.map((item) =>
          item === saque ? { ...item, status: "Recebido" } : item
        )
      );

      adicionarCompraAutomatica();
    }, 5000);
  };

  const adicionarCompraAutomatica = () => {
    setCursos((prevCursos) =>
      prevCursos.map((curso) => {
        if (curso.nome === "React Avançado") {
          return {
            ...curso,
            status: "Ativo",
            CursoRegistados: [
              ...curso.CursoRegistados,
              {
                aluno: { nome: "Novo Cliente", email: "cliente@gmail.com" },
                dataCompra: new Date().toLocaleDateString("pt-MZ"),
              },
            ],
          };
        }
        return curso;
      })
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-muted-foreground">
          Painel <span className="text-primary">Financeiro</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          <div className="col-span-1 md:col-span-3 xl:col-span-3">
            <CardFinanceiro 
              totalArrecadado={totalArrecadado} 
              totalAlunos={totalAlunos} 
              totalSacado={totalSacado}
            />
          </div>

          <div className="md:col-span-3 col-span-1">
            <GraficoFinanceiro vendasPorCurso={vendasPorCurso} />
          </div>

          <div className="col-span-1 md:col-span-2 xl:col-span-3">
            <TabelaFinanceira 
              registros={registros} 
              totalDisponivel={saldoDisponivel} 
              onConfirmSaque={handleConfirmSaque} 
            />
          </div>

          <div className="col-span-1 md:col-span-2 xl:col-span-3">
            <TabelaHistoricoSaques saques={historicoSaques} />
          </div>
        </div>
    </div>
  );
}