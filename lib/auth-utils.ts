'use server';

import { cookies } from 'next/headers';

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');
    
    // Verifica se existe token
    if (!token || !token.value) {
      return false;
    }

    // Aqui você pode adicionar validação adicional do token se necessário
    // Por exemplo, verificar se não expirou ou validar com o backend
    
    return true;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.delete('auth_token');
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false };
  }
};