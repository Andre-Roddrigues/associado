
import { gravarAlunoMoodle } from '@/components/Cursos/actions';
import { routes } from '@/config/routes';
import axios from 'axios';

// Função para gerar o nome de usuário e a senha
const gerarCredenciais = (idAluno: string, nomeCompleto: string) => {
  const anoAtual = new Date().getFullYear();
  const nome = nomeCompleto?.split(' ')[0];
  const username = `${idAluno}_${nome?.toLowerCase()}`;
  const password = `@${nome?.toLowerCase()}${anoAtual}U`;

  return { username, password, nome };
};

export async function cadastrarAlunoMoodle( idAluno: string, nomeCompleto: string, lastname: string, email: string ) {
  const tokenMoodle = "849ee7188c8c71ceb8752d4a17990dec";
 
  try {
    const { username, password, nome } = gerarCredenciais(idAluno, nomeCompleto);
    // Verifica se o usuário já existe 
    const searchParams = new URLSearchParams({
      wstoken: tokenMoodle,
      wsfunction: 'core_user_get_users',
      moodlewsrestformat: 'json',
      'criteria[0][key]': 'username',
      'criteria[0][value]': username,
    });

    const userResponse = await axios.post(routes.moodle_API, searchParams, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    console.log("existingUsers", userResponse);
    const existingUsers = userResponse.data.users;

    if (existingUsers.length > 0) {
      const id_moodle = existingUsers[0].id;
      const dados = { id_aluno: idAluno, id_aluno_moodle: id_moodle, username, senha: password };

      const response = await gravarAlunoMoodle(dados);
      
      if(response.success){

          return { sucess: true,  message: 'Usuário já existe.', status: 409, user: existingUsers[0], gravarResponse: response };
      }
    }

    // Criação do novo usuário
    const createParams = new URLSearchParams({
      wstoken: tokenMoodle,
      wsfunction: 'core_user_create_users',
      moodlewsrestformat: 'json',
      'users[0][username]': username,
      'users[0][password]': password,
      'users[0][firstname]': nome,
      'users[0][lastname]': lastname,
      'users[0][email]': email,
      'users[0][auth]': 'manual',
    });
    
    console.log("username: " ,username)
    console.log("password: " ,password)
    console.log("firstname: " ,nome)
    console.log("lastname: ", lastname)
    console.log("email: " ,email)
    const createUserResponse = await axios.post(routes.moodle_API, createParams, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (createUserResponse.data.length > 0) {
      const id_moodle = createUserResponse.data[0].id;
      const dados = { id_aluno: idAluno, id_aluno_moodle: id_moodle, username, senha: password };

      const response = await gravarAlunoMoodle(dados);
      
      if(response.success){
          return { sucess: true, status: 200, user: createUserResponse.data[0], gravarResponse: response };
      }

    }
    
    throw new Error('Erro ao criar usuário, verifique os campos.');
  } catch (error: any) {
    console.error('Erro ao criar/verificar usuário:', error.response?.data || error.message);
    throw new Error(error.response?.data.message || 'Erro desconhecido ao criar/verificar usuário.');
  }
}




export async function enrollUser(userid:number, courseid:any ) {
  try {
    const tokenMoodle = "849ee7188c8c71ceb8752d4a17990dec";

    // Constrói os parâmetros da requisição
    const params = new URLSearchParams({
      wstoken: tokenMoodle,
      wsfunction: 'enrol_manual_enrol_users',
      moodlewsrestformat: 'json',
    });

    params.append('enrolments[0][roleid]', '5'); // ID do papel (5 = estudante)
    params.append('enrolments[0][userid]', userid.toString()); // ID do usuário
    params.append('enrolments[0][courseid]', courseid); // ID do curso

    // Faz a requisição POST para a API do Moodle
    const response = await axios.post(routes.moodle_API, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.data) {
      console.log('Usuário matriculado com sucesso:', response);
      return {sucess: true, status: 200, message: 'Usuário matriculado com sucesso', data: response.data };
    } else {
      console.error('Erro ao matricular usuário no curso:', response);
      return { sucess: false, status: 400, message: 'Erro ao matricular usuário', data: response.data };
    }
  } catch (error: any) {
    console.error('Erro ao matricular usuário no curso:', error);
    throw new Error(error.response?.data.message || 'Erro desconhecido ao matricular usuário.');
  }
}




export async function addUserToGroup(userId:string, groupId:string) {
  try {
    const tokenMoodle = "849ee7188c8c71ceb8752d4a17990dec";


    // Constrói os parâmetros necessários para a API do Moodle
    const params = new URLSearchParams({
      wstoken: tokenMoodle,
      wsfunction: 'core_group_add_group_members',
      moodlewsrestformat: 'json',
    });

    // Adiciona os dados necessários para a função core_group_add_group_members
    params.append('members[0][groupid]', `${parseInt(groupId, 10)}`);
    params.append('members[0][userid]', `${parseInt(userId, 10)}`);

    // Faz a requisição POST para a API do Moodle
    const response = await axios.post(routes.moodle_API, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.data) {
      console.log('Usuário adicionado ao grupo com sucesso:', response.data);
      return { sucess: true, status: 200, data: response.data, message: 'Usuário adicionado ao grupo com sucesso' };
    }

    console.error('Erro ao adicionar usuário ao grupo:', response.data);
    return { sucess: true, status: 400, data: response.data };

  } catch (error: any) {
    console.error('Erro ao adicionar usuário ao grupo:', error.response ? error.response.data : error);
    throw new Error(error.response?.data.message || 'Erro desconhecido ao adicionar usuário ao grupo.');
  }
}
