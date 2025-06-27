// components/Profile.tsx

import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";
import { routes } from "@/config/routes";
import { getAlunoById } from "@/components/Cursos/actions";

interface ProfileProps {
  user: any;
  status: string;
}

export default async function Profile({ user, status }: ProfileProps) {
  let imageUrl = null;

  if (status === "authenticated" && user?.id) {
    try {
      const alunoData = await getAlunoById(Number(user.id));
      if (alunoData?.FotoAlunos?.length > 0) {
        imageUrl = alunoData.FotoAlunos[0].url;
      }
    } catch (error) {
      console.error("Erro ao buscar dados do aluno:", error);
    }
  }

  return <ProfileDropdown user={user} status={status} imageUrl={imageUrl} />;
}

// async function getAlunoById(alunoId: number, token: string) {
//     try {
//       const response = await axios.get(`${routes.alunoMoodle}/${alunoId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.log("Erro na Requisição", error);
//       throw error;
//     }
//   }