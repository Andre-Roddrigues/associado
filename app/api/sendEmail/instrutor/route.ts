import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { nome,  categoria, price, email, telefone,oqueEnsinara,objectivo,progrmas, modalidade, nomecompleto, duracao } = await request.json();

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
      subject: 'Torne-se Instrutor',
      text: `Nome do Curso: ${nome}
      Categoria: ${categoria}
      Preço do Curso: ${price}
      O que Ensinará: ${oqueEnsinara}
      Objectivo do Curso: ${objectivo}
      Programa: ${progrmas}
      Modalidade: ${modalidade}
      Duração: ${duracao}
      Nome do Instrutor: ${nomecompleto}
      Email: ${email}
      Telefone: +258${telefone}`,
    };

    await transporter.sendMail(mailOptions);

    const autoResponseOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Torne-se Instrutor',
      text: `Olá ${nomecompleto},
Recebemos o seu pedido para adicionar o curso de ${nome}, entraremos  em contacto assim que possível. 
\n\nObrigado por nos procurar!

Equipa Unitec`,
    };
    await transporter.sendMail(autoResponseOptions);
    return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
  }
}
