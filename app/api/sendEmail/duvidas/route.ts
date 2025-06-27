
// app/api/sendEmail/duvidas/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { assunto, email,  mensagem } = await request.json();

  // console.log('Dados recebidos:', { assunto, email,  mensagem });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'suporte@unitec.ac.mz',
      subject: 'Página de Dúvidas',
      text: `Assunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
    
  }
}
