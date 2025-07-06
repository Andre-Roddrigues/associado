'use server';

import { routes } from '@/config/routes';
import { cookies } from 'next/headers';

export const authenticate = async (email: string, password: string) => {
  try {
    const response = await fetch(routes.logininstrutor, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }),
      cache: 'no-store',
    });

    // Lê o corpo da resposta (pode ser string ou objeto JSON)
    const data = await response.json();

    // 🔒 Se não for 200, interrompe e devolve mensagem do backend (se existir)
    if (response.status !== 200) {
      return {
        success: false,
        message: data?.message || 'Credenciais inválidas',
      };
    }

    // Extrai token e usuário (dependendo do formato retornado)
    const token = typeof data === 'string' ? data : data.token;
    const user  = typeof data === 'object' ? data.user : null;

    if (!token) {
      return {
        success: false,
        message: 'Token não fornecido pelo servidor',
      };
    }

    // Grava cookies
    const cookieStore = cookies();

    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    cookieStore.set('auth_user', JSON.stringify(user), {
      httpOnly: false, // acessível no client
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // ✅ Sucesso
    return {
      success: true,
      message: 'Login sucesso',
      token,
      user,
    };

  } catch (error) {
    console.error('Erro de autenticação:', error);
    return {
      success: false,
      message: 'Erro de conexão com o servidor',
    };
  }
};
