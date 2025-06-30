// app/api/auth/user/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function decodeJWT(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token inválido');
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    const json = Buffer.from(padded, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
}

export async function GET() {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  const decoded = decodeJWT(token);

  if (!decoded || !decoded.email) {
    return NextResponse.json({ isAuthenticated: false }, { status: 403 });
  }

  return NextResponse.json({
    isAuthenticated: true,
    sub: decoded.sub,
    email: decoded.email
  });
}
