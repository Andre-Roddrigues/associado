import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const assunto = formData.get('assunto')?.toString();
    const email = formData.get('email')?.toString();
    const mensagem = formData.get('mensagem')?.toString();
    const file = formData.get('cv'); 
    if (!(file instanceof File)) {
        return NextResponse.json({ message: 'Ficheiro Inválido.' }, { status: 400 });
    }

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

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); 
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'suporte@unitec.ac.mz',
            subject: 'Programa de Estagio',
            text: `Assunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`,
            attachments: [
                {
                    filename: file.name, 
                    content: buffer, 
                }
            ],
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
    }
}
