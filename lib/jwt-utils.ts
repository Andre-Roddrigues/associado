'use server';

import { cookies } from 'next/headers';

interface DecodedToken {
  sub?: string;
  email?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

// Função para decodificar JWT manualmente
export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token JWT inválido');

    const payload = parts[1];
    const padded = payload + '='.repeat((4 - payload.length % 4) % 4); // Corrige padding base64
    const decoded = Buffer.from(padded, 'base64').toString('utf-8');
    
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};

// Função para buscar o usuário logado a partir do cookie
export const getUserFromToken = async (): Promise<{ sub: string; email: string } | null> => {
  try {
    const token = cookies().get('auth_token')?.value;

    if (!token) return null;

    const decoded = decodeJWT(token);

    if (!decoded || !decoded.email) return null;

    return {
      sub: decoded.sub || '',
      email: decoded.email,
    };
  } catch (error) {
    console.error('Erro ao obter usuário do token:', error);
    return null;
  }
};
