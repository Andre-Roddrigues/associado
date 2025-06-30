'use server';

import { routes } from '@/config/routes';
import { cookies } from 'next/headers';

export const authenticate = async (email: string, password: string) => {
  try {
    const response = await fetch(routes.logininstrutor, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }),
      cache: 'no-store'
    });

    const data = await response.json();
    console.log("== token ==", data);

    const token = typeof data === 'string' ? data : data.token;


    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, 
      path: '/',
    });

    return {
      success: true,
      token,
      user: null, 
    };

  } catch (error) {
    console.error("Erro de autenticação:", error);
    return {
      success: false,
      message: 'Erro de conexão com o servidor',
    };
  }
};
