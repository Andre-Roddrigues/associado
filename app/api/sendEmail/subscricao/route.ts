// app/api/sendEmail/subscricao/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { assunto, email, mensagem } = await request.json();

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

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'suporte@unitec.ac.mz',
      subject: 'Subscrição Para Novidades',
      text: `Assunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`,
    };
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Confirmação de Subscrição - Unitec',
      text: `Olá,\n\nObrigado por subscrever para receber novidades da Unitec.\n\nEquipa Unitec`,
    };
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ message: 'E-mails enviados com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar os e-mails:', error);
    return NextResponse.json({ message: 'Erro ao enviar os e-mails.' }, { status: 500 });
  }
}
