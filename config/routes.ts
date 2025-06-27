// config/routes.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const LOCAL_SERVER = "http://192.168.43.177:5000";
const REQUISITOS_URL = process.env.NEXT_PUBLIC_API_REQUISITOS || "";
const API_MPESA = process.env.NEXT_PUBLIC_API_MPESA || "";
const API_MOODLE = process.env.NEXT_PUBLIC_API_MOODLE || "";

//842529183
//847766462
export const routes = {
  //route for login autentication
  backend_url: `${API_BASE_URL}`,
  cuponAssociacion: `${API_BASE_URL}/cupomAssociantion`,
  gravarAlunoMoodle: `${API_BASE_URL}/gravaralunomoodle`,
  login: `${API_BASE_URL}/logininstrutor`,
  register_student: `${API_BASE_URL}/registaraluno`,
  listCourses: `${API_BASE_URL}/vercursos`,
  curosRegistados: `${API_BASE_URL}/cursoregistado`,
  alterarSenha: `${API_BASE_URL}/editarsenha`,
  buscarDadosAluno: `${API_BASE_URL}/bucardadoconfimacao`,
  listarPacote: `${API_BASE_URL}/listpackage`,
  addpackagestudant: `${API_BASE_URL}/addpackagestudant`,
  alunoMoodle: `${API_BASE_URL}/aluno`,
  editarAluno: `${API_BASE_URL}/editaraluno`,
  editarfotoAluno: `${API_BASE_URL}/editaralunofotoperfil`,
  requisites: `${API_BASE_URL}/mostarCursoRequisitos`,
  courseProgram: `${API_BASE_URL}/mostrarCursoProgramas`,
  requisitos: `${REQUISITOS_URL}`,
  cursoById: `${API_BASE_URL}/bucarcursoid`,
  cuppon_desconto: `${API_BASE_URL}/applycopum`,
  registarPagamento: `${API_BASE_URL}/registarpagamento`,
  cursoIdMooodle: `${API_BASE_URL}/buscarcurso`,
  confirmarPagamento: `${API_BASE_URL}/confirmarpagemento`,
  mpesa_pagamento: API_MPESA,
  moodle_API: API_MOODLE,
  associationcuppon: `${API_BASE_URL}/getcupombystudant`,
  addassociationpayment: `${API_BASE_URL}/addassociationpayment`,
  registaralunocurso: `${API_BASE_URL}/registaralunocurso`,
  updateconfirmcupom: `${API_BASE_URL}/updateconfirmcupom`,
  carregarComprovativo: `${API_BASE_URL}/primeiropagamentoaluno`,
  pagamentosRejeitados: `${API_BASE_URL}/listarpagementosrejeitados`,
  registarcursoinstrutor: `${API_BASE_URL}/registarcursoinstrutor`,
};
