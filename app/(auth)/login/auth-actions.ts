"use server"

import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import AuthServices, { destroySession } from '@/services/auth-services';
import { redirect } from 'next/navigation';
import axios from "axios";
import { routes } from "@/config/routes";
import { UserSession } from "@/components/types/types";





export async function login(email: string, senha: string) {
    let user : UserSession;
    let accessToken;
    try{
        const response = await axios.post(routes.login, { email: email, senha: senha});   
      
        if(response.status === 200) {
            accessToken = response.data.token;
            user  = decodeJwt(accessToken)
            user.accessToken = accessToken;
            
        
            
            await AuthServices.createSessionToken(user)
            return {sucess: true, status: response.status , data: response.data}
        }
        else if(response.status === 400 || response.status === 401){
            console.log("Login inválido")
            return {sucess: false, status: response.status , data: response.data}
        }
    }catch(error :any){
        console.error('Erro ao realizar login:', error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Erro desconhecido',
    };
  }
}
export async function logout(){
    destroySession();
    redirect("/");
}
export async function logoutClient() {
  destroySession();
}



export async function getUser() {
    
  try {
    const token = cookies().get("session")?.value;
    
  
    if (!token) {
      return null;
    }
    // console.log(decodeJwt(token))

    return decodeJwt(token) as UserSession;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}