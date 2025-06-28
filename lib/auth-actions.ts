'use server';

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
}

export const authenticate = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch('https://backend.unitec.ac.mz/loginintrutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        senha: password // Note que o backend espera "senha" e não "password"
      }),
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Credenciais inválidas'
      };
    }

    // Aqui você pode armazenar o token e os dados do usuário
    // Exemplo: cookies().set('authToken', data.token);
    
    return {
      success: true,
      token: data.token,
      user: data.user
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: 'Erro de conexão com o servidor'
    };
  }
};