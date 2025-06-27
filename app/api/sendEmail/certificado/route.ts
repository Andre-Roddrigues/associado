import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { nome, email, telefone, formato, provincia, curso } = await request.json();

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
      subject: 'Requisição de Certificado',
      text: `Nome: ${nome}
      Email: ${email}
      Telefone: ${telefone}
      formato: ${formato}
      provincia: ${provincia}
      Curso: ${curso}`,
    };

    await transporter.sendMail(mailOptions);

    const autoResponseOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Unitec B-Partner',
      text: `Olá ${nome},

        Recebemos sua mensagem e entraremos em contacto assim que possível. 
        Obrigado por nos procurar!

Equipa Unitec`,
    };
    await transporter.sendMail(autoResponseOptions);
    return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
  }
}
