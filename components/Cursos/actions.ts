"use server";
import { routes } from "@/config/routes";
import { Cursos, StudentData } from "../types/types";
import api from "@/lib/axiosConfig";
import axios, { AxiosError } from "axios";
import { getUser } from "@/app/(auth)/login/auth-actions";

export async function getCursos() {
  const response = await fetch(routes.listCourses, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const cursos = await response.json();

  // Filtrar cursos com tipocurso 'presencial' ou 'online'
  const filteredCursos = cursos.filter(
    (curso: any) =>
      curso.tipocurso.toLocaleLowerCase() === "presencial" ||
      curso.tipocurso.toLocaleLowerCase() === "online"
  );

  // Ordenar os cursos filtrados por data de criação
  return filteredCursos.sort(
    (a: any, b: any) =>
      new Date(a.Imagens[0]?.createdAt).getTime() -
      new Date(b.Imagens[0]?.createdAt).getTime()
  );
}

export async function getCursoRegistado(alunoId: number) {
  try {
    const response = await api.get(`${routes.curosRegistados}/${alunoId}`);
    return response.data;
  } catch (error) {
    console.log("Erro na Requisição", error);
    throw error;
  }
}

export async function isAlunoInscrito(alunoId: number, idCurso: number) {
  try {
    const cursos = await getCursoRegistado(alunoId);
    return cursos.some((curso: any) => curso.id_curso === idCurso);
  } catch (error) {
    console.error("Erro ao verificar inscrição:", error);
    return false;
  }
}

export async function validarCupon(cuppon: string, preco: number) {
  try {
    const response = await api.get(
      `${routes.cuppon_desconto}/${cuppon}/${preco}`
    );
    if (response.status != 200 && response.status) {
      return { status: response.status, message: "Cupão inválido" };
    }
    console.log("cupao ", response.data);
    return response.data;
  } catch (error) {
    console.log("Erro na Requisição pra validar cuppon", error);
    throw error;
  }
}

export async function alterarSenha({
  email,
  senha,
}: {
  email: string;
  senha: string;
}): Promise<any> {
  try {
    const response = await api.put(`${routes.alterarSenha}`, {
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    console.error("Erro na Requisição:", error);
    throw error;
  }
}

export async function getAluno(alunoId: number) {
  try {
    const response = await api.get(`${routes.alunoMoodle}/${alunoId}`);
    return response.data;
  } catch (error) {
    console.log("Erro na Requisição", error);
    throw error;
  }
}
export async function getAlunoById(alunoId: number) {
  try {
    const response = await api.get(`${routes.alunoMoodle}/${alunoId}`);
    // console.log("Dados do aluno ID", response.data);
    return response.data;
  } catch (error) {
    console.log("Erro na Requisição", error);
    throw error;
  }
}
export async function getPrice(selectedPackage: string, basePrice: number) {
  const basePriceNumber = basePrice;
  const packages = await getPackage();
  if (selectedPackage === "padrão") {
    return Math.ceil(basePrice);
  }
  const selectedPackageOption = packages.find(
    (pkg: any) =>
      pkg.name?.trim().toLowerCase() ===
      selectedPackage?.trim().toLocaleLowerCase()
  );

  if (selectedPackageOption) {
    const price = basePriceNumber * (1 + selectedPackageOption.percentagem);
    return Math.ceil(price);
  }
  return basePrice;
}
export async function calcularValorDescontado(
  precoOriginal: number,
  desconto: number
) {
  const valorDescontado = precoOriginal * desconto;
  const precoFinal = Math.ceil(precoOriginal - valorDescontado);
  return { valorDescontado, precoFinal };
}

export async function getPackage() {
  try {
    const response = await axios.get(`${routes.listarPacote}`);

    return response.data;
  } catch (error) {
    console.log("Erro ao listar pacotes", error);
    throw error;
  }
}

export async function getEditarAluno(
  formData: {
    email: string;
    nome: string;
    apelido: string;
    datanasc: string;
    nacionalidade: string;
    bi: string;
    localemissao: string;
    dataemissao: string;
    datavalidade: string;
  },
  token: string
) {
  try {
    const response = await axios.put(`${routes.editarAluno}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Erro na Requisição", error?.response?.data || error.message);
    throw error;
  }
}

export async function getEditaFotoAluno(token: string) {
  try {
    const response = await axios.put(`${routes.editarfotoAluno}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Erro na Requisição", error?.response?.data || error.message);
    throw error;
  }
}

// Função para atualizar os dados do aluno
export async function updateAluno(alunoId: number, data: any) {
  try {
    const response = await api.put(`${routes.editarAluno}/${alunoId}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro na Requisição:", error);
    throw error;
  }
}

export async function getFotoAluno(alunoId: number) {
  try {
    const response = await api.get(`${routes.alunoMoodle}/${alunoId}`);
    return response.data.FotoAlunos;
  } catch (error) {
    console.log("Erro na Requisição", error);
    throw error;
  }
}

export async function getCursosNovos() {
  const response = await fetch(routes.listCourses);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }

  const cursos = await response.json();

  const cursosFiltrados = cursos.filter(
    (curso: any) => curso.tipocurso.toLocaleLowerCase() !== "online-interativo"
  );

  return cursosFiltrados.sort(
    (a: any, b: any) =>
      new Date(b.Imagens[0]?.createdAt).getTime() -
      new Date(a.Imagens[0]?.createdAt).getTime()
  );
}

export async function getCursosById(id: number) {
  try {
    const response = await fetch(`${routes.cursoById}/${id}`, {
      next: { revalidate: 240 },
    });

    if (!response.ok) {
      console.log("Erro na requisição:", response.status, response.statusText);
      return null;
    }

    const cursoData = await response.json();

    return cursoData;
  } catch (error) {
    console.error("Erro ao buscar o curso:", error);
    return null;
  }
}

export interface selectedCategoryProps {
  category?: any;
  tipo?: any;
  nomeCurso?: any;
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/gi, "");
}
export async function getFilteredCursos({
  category,
  tipo,
  nomeCurso,
}: selectedCategoryProps): Promise<Cursos[]> {
  const cursos = await getCursos();

  const cursosFiltrados = cursos.filter(
    (curso: Cursos) =>
      curso.categoria.toLowerCase() !== "prático" &&
      curso.categoria !== "idioma"
  );

  if (nomeCurso) {
    const normalizedNomedoCurso = normalizeText(nomeCurso);

    return cursosFiltrados.filter((curso: Cursos) =>
      normalizeText(curso.nome).includes(normalizedNomedoCurso)
    );
  }

  return cursosFiltrados.filter((curso: Cursos) => {
    const matchesCategory = category
      ? curso.categoria.toLowerCase() === category.toLowerCase()
      : true;
    const matchesTipo = tipo
      ? curso.tipocurso.toLowerCase() === tipo.toLowerCase()
      : true;

    return matchesCategory && matchesTipo;
  });
}

export async function getCursosLinguas() {
  const cursosIds = [46, 77, 35, 58, 79, 64, 59, 82, 60, 83, 84, 66, 85];

  // Usamos Promise.all para buscar todos os cursos simultaneamente
  const cursosLinguas = await Promise.all(
    cursosIds.map((id) => getCursosById(id))
  );

  return cursosLinguas;
}

//REQUISITOS
export async function getRequisitosByCursoId(cursoId?: number) {
  const response = await fetch(`${routes.requisitos}/${cursoId}`, {
    next: { revalidate: 3600 },
  });
  try {
    if (!response.ok) {
      throw new Error("Erro ao buscar os requisitos");
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar os requisitos:", error);
    throw error;
  }
}

export async function getPrograma(id: number) {
  // console.log(`${routes.cursoById}/${id}`)
  const response = await fetch(`${routes.courseProgram}/${id}`); // Encontra o curso pelo ID
  if (!response.ok) {
    console.log("Erro ao buscar o programa do curso ");
  }
  return response.json();
}
//  export async function fetchCupomsByStudent() {
//   try {
//       const response = await apiClient.get(routes.cuponAssociacion,)
//       return response.data;
//   } catch (error) {
//       console.error('Error fetching cupoms:', error);
//       throw error;
//   }

// }
export async function getCursoIdMoodle(id: number) {
  try {
    console.log(`buscar id do curso no moodle: ${id}`);
    const response = await api.get(`${routes.cursoIdMooodle}/${id}`);

    if (response.status === 200) {
      console.log("getCursosIdMoodle: ", response.data);
      return response.data; // Retorne apenas response.data se for suficiente
    } else if (response.status === 400) {
      console.log("getCursosIdMoodle: curso não encontrado");
      return null;
    }
  } catch (error) {
    console.error("Erro Buscar id do curso no moodle", error);
    throw error;
  }
}

// export async function gravarAlunoMoodle(dados: any) {
//   try {
//       const token = process.env.TOKEN_ADMIN
//       const response = await axios.post(routes.gravarAlunoMoodle, dados,{
//         headers: {
//           Authorization: `Bearer ${token}` // Inclui o token de autenticação no cabeçalho
//         }
//       } );

//       if(response.status === 200){
//         return {sucess:true, data: response}  // Retorne apenas response.data se for suficiente
//       }
//       else{
//         console.log("Erro ao gravar credencias do moodle");
//         return {sucess:false, data: response}
//       }
//   } catch (error) {
//       console.error('Erro ', error);
//       throw error;
//   }
// }
export async function gravarAlunoMoodle(dados: any) {
  try {
    const token = process.env.TOKEN_ADMIN;
    console.log("correu a funcao gravaralunomoodle");
    const response = await fetch(routes.gravarAlunoMoodle, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token de autenticação no cabeçalho
      },
      body: JSON.stringify(dados), // Converte o objeto 'dados' para uma string JSON
    });

    if (response.status === 200 || response.status === 400) {
      console.log("Credenciais gravadas com sucesso no Moodle");
      const data = await response.json(); // Extrai os dados da resposta
      return { success: true, data }; // Retorna os dados extraídos
    } else {
      console.log("Erro ao gravar credenciais do Moodle");
      return { success: false, data: await response.json() }; // Retorna os dados de erro da resposta
    }
  } catch (error) {
    console.error("Erro:", error);
    throw error; // Lança o erro para ser tratado pelo chamador
  }
}

export async function confirmarPagamento(id_curso: string, id_aluno: string) {
  try {
    const token = process.env.TOKEN_ADMIN;
    const response = await fetch(
      `${routes.confirmarPagamento}/${id_curso}/${id_aluno}/confirmado`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
          "Content-Type": "application/json",
        },
      }
    );
    const resposta = await response.json();
    if (response.ok) {
      // Verifica se a resposta tem status 200-299

      return { success: true, message: "Confirmação efectuada com sucesso" };
    } else {
      console.log("Erro ao confirmar inscricao: ", resposta);
      return { success: false, message: resposta };
    }
  } catch (error) {
    console.error("Erro na confirmação do curso", error);
    throw error;
  }
}

export async function inscreverAlunoNoCurso(
  idCurso: string,
  idAluno: string,
  valor: string,
  paymentMethod: string,
  horario: string
) {
  try {
    const response = await api.post(routes.registaralunocurso, {
      idAluno,
      idCurso,
      valor,
      paymentMethod,
      horario,
    });
    // console.log("inscricao teste",response.data)
    if (response.status === 200 || response.status === 201) {
      return { sucess: true, status: response.status, data: response.data };
    } else {
      return {
        sucess: false,
        status: response.status,
        error: response.data?.error,
        data: response.data,
      };
    }
  } catch (err: any) {
    console.error("Error registrando aluno no curso:", err);
    return {
      sucess: false,
      status: err.response?.status || 500,
      error: err.response?.data?.message,
      data: err.response?.data,
    };
  }
}

export async function fetchCupomsByStudent(token: string) {
  try {
    const response = await axios.get(routes.associationcuppon, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cupoms:", error);
    throw error;
  }
}

export interface Cupom {
  id: string;
  code: string;
  validity: string;
  percent: number;
}

export async function fetchCupomsByStudentToken(
  token: string
): Promise<Cupom[]> {
  try {
    const response = await axios.get(
      "https://backend.unitec.ac.mz/getcupombystudant",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const mappedCupoms: Cupom[] = response.data.map((cupom: any) => ({
      id: cupom.id,
      code: cupom.code,
      validity: cupom.validity,
      percent: cupom.percent,
    }));

    return mappedCupoms;
  } catch (error) {
    console.error("Error fetching cupoms:", error);
    throw error;
  }
}

export async function fetchStudentData() {
  try {
    const response = await api.get(routes.cuponAssociacion);
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw new Error("Failed to fetch data");
  }
}

export async function addassociationPackage(
  idAssociationPackage: string,
  idCourse: number | string,
  idStudent: number | string
) {
  try {
    const response = await api.post(routes.addassociationpayment, {
      idAssociationPackage: idAssociationPackage,
      idCourse: idCourse,
    });
    console.log(
      "=============================================================="
    );
    if (response.status === 200 || response.status === 201) {
      await addassociationPackageStudent(idAssociationPackage, idStudent);
      return { sucess: true, data: response.data, status: 200 };
    } else if (response.status === 400) {
      console.log("Erro ao associar ao pacote");
      return { sucess: false, status: 400, data: response.data };
    }
  } catch (error) {
    console.error("Erro ao associar ao pacote:", error);
    throw error;
  }
}
export async function addassociationPackageStudent(
  idAssociationPackage: string,
  idStudent: number | string
) {
  try {
    const response = await api.post(routes.addpackagestudant, {
      idPacoteCurso: idAssociationPackage,
      idAluno: idStudent,
    });
    console.log(
      "=============================================================="
    );
    if (response.status === 200 || response.status === 201) {
      return { sucess: true, data: response.data, status: 200 };
    } else if (response.status === 400) {
      console.log("Erro ao associar o estudante ao pacote");
      return { sucess: false, status: 400, data: response.data };
    }
  } catch (error) {
    console.error("Erro ao associar o aluno ao pacote:", error);
    throw error;
  }
}

export async function confirmarCupom(id_curso_registado: string | number) {
  try {
    const response = await api.put(routes.updateconfirmcupom, {
      idCursoRegistado: id_curso_registado,
    });
    if (response.status === 200 || response.status === 201) {
      return { sucess: true, data: response.data, status: 200 };
    } else if (response.status === 400) {
      console.log("Erro ao actualizar o estado do cupom");
      return { sucess: false, status: 400, data: response.data };
    }
  } catch (error) {
    console.error("Erro ao actualizar o estado do cupom");
    throw error;
  }
}
export async function actualizarCupum(id_curso_registado: string | number) {
  const user = await getUser();
  const token = user?.accessToken;
  try {
    const response = await fetch(
      "https://backend.unitec.ac.mz/updateconfirmcupom",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idCursoRegistado: id_curso_registado }),
      }
    );
    if (response.ok) {
      return {
        sucess: true,
        data: await response.json(),
        status: response.status,
      };
    } else {
      return {
        sucess: false,
        data: await response.json(),
        status: response.status,
      };
    }
  } catch (error) {
    console.error("Erro ao actualizar o estado do cupom", error);
    throw error;
  }
}

export async function carregarComprovativo(formData: FormData) {
  try {
    const response = await api.post(routes.carregarComprovativo, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      return {
        sucess: true,
        data: response.data,
        status: 200,
        message: "Registado com sucesso",
      };
    } else if (response.status === 409) {
      return {
        sucess: false,
        data: response.data,
        status: 409,
        message: "Este comprovativo já existe",
      };
    }
  } catch (error: any) {
    console.error("Erro ao carregar o comprovativo", error);
    return {
      sucess: false,
      data: error.response?.data,
      status: error.response?.status || 500,
      message: "Ocorreu um erro ao tentar carregar o comprovativo",
    };
  }
}
export async function registarPagamento(formData: FormData) {
  try {
    const response = await api.post(routes.registarPagamento, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      return {
        sucess: true,
        data: response.data,
        status: 200,
        message: "Registado com sucesso",
      };
    } else if (response.status === 400) {
      return {
        sucess: false,
        data: response.data,
        status: 400,
        message: "Já está inscrito neste curso!",
      };
    }
  } catch (error: any) {
    console.error("Erro ao registar pagamento (inscrever ao curso)", error);
    return {
      sucess: false,
      data: error.response?.data,
      status: error.response?.status || 500,
      message: "Ocorreu um erro ao tentar inscrever ao curso",
    };
  }
}

export async function getAllRejectedPayments() {
  try {
    const response = await api.get(routes.pagamentosRejeitados);
    if (response.status === 200) {
      // return { sucess: true, data: response.data, status: response.status };
      return response.data;
    }
  } catch (error: any) {
    console.error("Error fetching rejected payments:", error);
    // return { sucess: false, data: error, status: error.response.status };
  }
}
