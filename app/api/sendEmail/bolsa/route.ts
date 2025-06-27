import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    nome, apelido,telefone, idade, temDependentes, residencia, ultimoNivel, escola, areaFormacao, 
    formacaoProfissional, areaFormacaoProfissional, profissao, nomeEmpregador, 
    funcaoExercida, pessoasDependem, estadoCivil, contactoDependentes, email
  } = body;

  try {
    if (!email) {
      return NextResponse.json({ message: 'E-mail não fornecido.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Envio para o e-mail de suporte
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'suporte@unitec.ac.mz',
      subject: 'Inscrição no Programa de Bolsas de Estudos',
      text: `Nome: ${nome} ${apelido}
Idade: ${idade}
Tem Dependentes: ${temDependentes}
Email: ${email}
Telefone: +258${telefone}
Residência: ${residencia}
Último Nível: ${ultimoNivel}
Escola: ${escola}
Área de Formação: ${areaFormacao}
Formação Profissional: ${formacaoProfissional}
Área de Formação Profissional: ${areaFormacaoProfissional}
Profissão: ${profissao}
Nome do Empregador: ${nomeEmpregador}
Função Exercida: ${funcaoExercida}
Pessoas Dependem de Você: ${pessoasDependem}
Estado Civil: ${estadoCivil}
Contato Dependentes: ${contactoDependentes}`,
    };

    await transporter.sendMail(mailOptions);

    // Resposta automática para o usuário
    const autoResponseOptions = {
      from: process.env.SMTP_USER,
      to: email,  // Verifique se este valor está correto
      subject: 'Inscrição no Programa de Bolsas de Estudos',
      text: `Olá ${nome},
Recebemos sua inscrição para o Programa de Bolsas de Estudos. Em breve entraremos em contacto.

Atenciosamente,
Equipa Unitec`,
    };

    await transporter.sendMail(autoResponseOptions);

    return NextResponse.json({ message: 'Inscrição enviada com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
  }
}
