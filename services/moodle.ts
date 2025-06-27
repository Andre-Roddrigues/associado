import { confirmarPagamento, getCursoIdMoodle } from '@/components/Cursos/actions';
import axios from 'axios';
import { addUserToGroup, enrollUser } from './moodle-actions';

export const registerMoodleUser = async (userData: any) => {
  const dadosMoodle = {
    idAluno: userData.alunoId,
    nome: userData.nomeAluno,
    lastname: userData.apelidoAluno,
    email: userData.emailAluno,
  }; 

  try {
    const response = await axios.post('/api/createUserMoodle', dadosMoodle);
    if(response.data.status === 200 || response.data.status === 409){
        return {sucess: true, message: response.data.message, user: response.data.user}
    }
  } catch (error) {
    console.error('Erro ao cadastrar no Moodle:', error);
    throw error;
  }
};


export const buscarGrupoEssenciais = async (courseid: number) => {
    console.log('buscarGrupoEssenciais ', courseid);
    try {
        const params = new URLSearchParams({
            wstoken: '849ee7188c8c71ceb8752d4a17990dec', // Token do Moodle
            wsfunction: 'core_group_get_course_groups',
            moodlewsrestformat: 'json',
        });
    
        params.append('courseid', courseid.toString());
    
        const response = await axios.post(
            'https://moodle.unitec.ac.mz/webservice/rest/server.php',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Verifica se a resposta contém grupos
        if (response.data && Array.isArray(response.data)) {
            // Filtra os grupos cujo nome comece com "essencial"
            const gruposEssenciais = response.data.filter((grupo: any) => 
                grupo.name.toLowerCase().startsWith('essencial')
            );
            console.log("response data", response.data[0]);
            
            return gruposEssenciais.length > 0 ? gruposEssenciais[0] : null;
        }

        return null;
    } catch (error: any) {
        console.error('Erro ao buscar grupo:', error.response ? error.response.data : error);
        return null;
    }
}

export const adicionarAoGrupoEssencial = async (courseIdMoodle:number, user_idMoodle:number) => { 

    try {
        const grupo = await buscarGrupoEssenciais(courseIdMoodle);
        console.log("Grupo essencial do curso ID "+courseIdMoodle+ ":   ", grupo.id);
        console.log("USER ID Grupo essencial do curso ID "+courseIdMoodle+ ":   ", user_idMoodle);
        
        if (grupo) {
            console.log("Grupo essencial do curso "+courseIdMoodle+ ":   ",grupo);
            console.log("groupId", grupo.groupId);
      
            const response = await addUserToGroup(user_idMoodle.toString(),grupo.id)
            if (!response.sucess) {
                console.error('Erro ao adicionar ao grupo essencial:', response);
                return {sucess: false, message: 'Erro ao adicionar ao pacote essencial', data: response}
        }
        console.log("Usuario adicionado ao grupo com sucesso", response.data)
        return {sucess: true, message: 'Adicionado ao pacote essencial', data: response}
      }
      console.log("Erro ao encontrar grupo essencial para o curso:", courseIdMoodle)
    } catch (error) {
        console.error("Erro ao buscar grupo essencial do curso moodle", error);
    }
}
    
export const adicionarAlunoCursoMoodle =  async (courseid: number,user_idModdle: number, pacote?:string) =>{
    try {
        const response = await getCursoIdMoodle(courseid);
        console.log("resposta cursoIdMoodle:", response);

        if(response.id_curso_moodle){
            const courseIdMoodle = response.id_curso_moodle;
            console.log("Curso encontrado no Moodle:", courseIdMoodle)
            try {
                console.log("A adicionar user ao curso")
                // const addUser = await axios.post('/api/addusercursomoodle', {user_idModdle: user_idModdle, courseid: courseIdMoodle});
                const addUser = await enrollUser(user_idModdle, courseIdMoodle);

    
                if(!addUser.sucess) {
                    console.error('Erro ao inscrever usuário no curso:', addUser)
                    return  {sucess: false, message:"Erro ao inscrever usuário no curso"}
                }
                else if (pacote && pacote === "essencial") {  // Adicionar o aluno ao grupo essencial se existir 
                    console.log("Adicionando ao grupo essencial")
                //  const grupo = await buscarGrupoEssenciais(courseid);
                  const addToGroup = await adicionarAoGrupoEssencial(courseIdMoodle, user_idModdle);
                  if (addToGroup?.sucess) {
                    console.log("Aluno adicionado ao grupo essencial com sucesso");
                    return {sucess: true, message:"Aluno adicionado ao pacote essencial "};
                  } else {
                    console.error("Erro ao adicionar aluno ao grupo essencial", addToGroup);
                    return {sucess: false, message: "Erro ao adicionar aluno ao grupo essencial"};
                  }
                } else {
                    console.log('usuário inscrito no curso com sucesso no curso:', addUser)
                     return  {sucess: true, message:"Usuario inscrito no curso com sucesso"}
                }

            } catch (error) {
                console.error('Erro ao inscrever usuário no curso:', error);
                return { sucess: false, message:"Erro ao inscrever usuário ao curso no moodle"};
            }
            
        }
        else{
            console.error("Curso não encontrado no Moodle",response)
            return { sucess: false, message:"Curso não encontrado no Moodle"};
        }
    }catch(error) {
        console.error(error);
    }
}

export async function adicionarAoCurso(courseIdMoodle: number,user_idModdle: number){
    try{
        const response = await axios.post('/api/addusercursomoodle', {userid: user_idModdle,courseid: courseIdMoodle});
        if(response.data.status === 200){
            console.log("Usuario adicionado ao curso com sucesso")
            return {sucess: true, message:"Usuario inscrito no curso com sucesso"}
        }
        

    }catch(error){
        console.error('Erro ao adicionar ao curso:', error);
        throw error;
    }

}