import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const body = await request.json();

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

    // Preenchendo os dados do e-mail com todos os campos do formulário
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'suporte@unitec.ac.mz',
      subject: 'Inscrição para curso Presencial',
      text: `
Nome: ${body.nome} ${body.apelido}
Idade: ${body.idade}
Nacionalidade: ${body.nacionalidade}
Naturalidade: ${body.naturalidade}
Telefone: ${body.telefone}
Email: ${body.email}
BI: ${body.nrBI}
Local de Emissão: ${body.localEmissao}
Data de Emissão: ${body.dataEmissao}
Data de Expiração: ${body.dataExpiracao}
Nível Escolar: ${body.nivelEscolar}
Outro Nível Escolar: ${body.outroNivelEscolar || 'Apenas o nível escolar selecionado acima'}
Curso: ${body.curso}
Horário: ${body.horario}
Como Soube da Unitec?: ${body.comoSoube}
Como Soube da Unitec?: ${body.outracomoSoube || 'Apenas a opção selecionada acima'}
      `,
    };

    await transporter.sendMail(mailOptions);

    const autoResponseOptions = {
      from: process.env.SMTP_USER,
      to: body.email,
      subject: 'Confirmação de Inscrição',
      text: `Olá ${body.nome},\n\nRecebemos sua inscrição para o curso ${body.curso}. Entraremos em contacto em breve.\n\nAtenciosamente,\nEquipa Unitec`,
    };

    await transporter.sendMail(autoResponseOptions);

    return NextResponse.json({ message: 'Inscrição enviada com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
  }
}
