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
    const user = data?.user || null;

    if (!token || !user) {
      return {
        success: false,
        message: 'Credenciais inválidas',
      };
    }

    const cookieStore = cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    cookieStore.set("auth_user", JSON.stringify(user), {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return {
      success: true,
      token,
      user,
    };

  } catch (error) {
    console.error("Erro de autenticação:", error);
    return {
      success: false,
      message: 'Erro de conexão com o servidor',
    };
  }
};
