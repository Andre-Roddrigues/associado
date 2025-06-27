import { nextAuthOptions } from "@/lib/authOptions" ;
import { routes } from "@/config/routes";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode"; 
import { getSession } from "next-auth/react";
import { useDecodedUser } from "@/hooks/useDecodedUser";

const apiClient = axios.create({
  baseURL: routes.backend_url,
});

apiClient.interceptors.request.use(
  async (config) => {
    const session = useDecodedUser();
    const token = session?.accessToken
    // console.log("token: ",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      const decodedToken: any = jwt_decode(token);
      const alunoId = decodedToken.id; 

      if (alunoId && config.url) {
        config.url = `${config.url}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
