
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { Usuario } from "@/components/types/types";

interface CustomUser extends User {
  token: string;
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seuemail@exemplo.com" },
        senha: { label: "Senha", type: "password" }
      },
      async authorize(credentials, req) {
        const response = await fetch("https://backend.unitec.ac.mz/loginaluno", {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha
          })
        });

        const user: CustomUser = await response.json();
        if (user && response.ok) {
          return user; // Retorna o usuário, incluindo o token
        }

        return null; // Caso o login falhe
      },
    })
  ],
  pages: {
    signIn: '/login'    
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as CustomUser).token) {
        // O token do usuário é retornado pela API
        token.accessToken = (user as CustomUser).token;
        token.user = jwt.decode((user as CustomUser).token); // Opcional se o token precisar ser decodificado
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as Usuario;
      return session;
    }
  }
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
