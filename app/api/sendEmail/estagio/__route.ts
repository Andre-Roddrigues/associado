
// // app/api/sendEmail/contacto/route.ts

 import { NextRequest, NextResponse } from 'next/server';
 import nodemailer from 'nodemailer';
import path from 'path';
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
       attachments:[
        {   // utf-8 string as an attachment
          filename: 'text1.txt',
          content: 'hello world!'
      },
      {   // binary buffer as an attachment
          filename: 'text2.txt',
          content: new Buffer('hello world!','utf-8')
      },
      {   // file on disk as an attachment
          filename: 'text3.txt',
          path: '/path/to/file.txt' // stream this file
      },
      {   // filename and content type is derived from path
          path: '/path/to/file.txt'
      },
      {   // define custom content type for the attachment
          filename: 'text.bin',
          content: 'hello world!',
          contentType: 'text/plain'
      },
      {   // encoded string as an attachment
          filename: 'text1.txt',
          content: 'aGVsbG8gd29ybGQh',
          encoding: 'base64'
      },
      {
        filename:"unite.pdf",
        path: "C:\Users\lario\Downloads"
      },
      {
          // use pregenerated MIME node
          raw: 'Content-Type: text/plain\r\n' +
               'Content-Disposition: attachment;\r\n' +
               '\r\n' +
               'Hello world!'
      }
       ],
       subject: 'Programa de Estagio',
       text: `Assunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`,
     };
     await transporter.sendMail(mailOptions);
     return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
   } catch (error) {
     console.error('Erro ao enviar o e-mail:', error);
     return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
  
   }
 }

//  import { NextRequest, NextResponse } from 'next/server';
//  import nodemailer from 'nodemailer';
//  export async function POST(request: NextRequest) {
//    const { assunto, email,  mensagem } = await request.json();
//    // console.log('Dados recebidos:', { assunto, email,  mensagem });
//    try {
//      const transporter = nodemailer.createTransport({
//        host: process.env.SMTP_HOST,
//        port: 465,
//        secure: true,
//        auth: {
//          user: process.env.SMTP_USER,
//          pass: process.env.SMTP_PASSWORD,
//        },
//      });
//      const mailOptions = {
//        from: process.env.SMTP_USER,
//        to: 'suporte@unitec.ac.mz',
//        subject: 'Programa de Estagio',
//        text: `Assunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`,
//      };
//      await transporter.sendMail(mailOptions);
//      return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
//    } catch (error) {
//      console.error('Erro ao enviar o e-mail:', error);
//      return NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 });
  
//    }
//  }

// // app/api/sendEmail/estagio/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import formidable, { File } from 'formidable';
// import fs from 'fs';
// import { Readable } from 'stream';
// import { IncomingMessage } from 'http';

// // Disable Next.js's built-in body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Convert NextRequest to an IncomingMessage-like format for formidable
// function convertRequest(req: NextRequest): IncomingMessage {
//   const { body, headers } = req;
//   const stream = Readable.from(body as any);
//   Object.assign(stream, {
//     headers,
//     method: req.method,
//     url: req.url,
//   });
//   return stream as unknown as IncomingMessage;
// }

// export async function POST(request: NextRequest) {
//   const form = new formidable.IncomingForm();

//   return new Promise((resolve) => {
//     form.parse(convertRequest(request), async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing the files:', err);
//         return resolve(NextResponse.json({ message: 'Erro ao processar os dados.' }, { status: 400 }));
//       }

//       const { assunto, email, mensagem } = fields;
//       const cvFile = files.cv as unknown as File;

//       if (!assunto || !email || !mensagem || !cvFile) {
//         return resolve(NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 }));
//       }

//       try {
//         const transporter = nodemailer.createTransport({
//           host: process.env.SMTP_HOST,
//           port: 465,
//           secure: true,
//           auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASSWORD,
//           },
//         });

//         const mailOptions = {
//           from: process.env.SMTP_USER,
//           to: 'suporte@unitec.ac.mz',
//           subject: 'Programa de Estágio',
//           text: `Assunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`,
//           attachments: [
//             {
//               filename: cvFile.originalFilename || 'CV.pdf', // Fallback filename
//               path: cvFile.filepath,
//             },
//           ],
//         };

//         await transporter.sendMail(mailOptions);

//         return resolve(NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 }));
//       } catch (error) {
//         console.error('Erro ao enviar o e-mail:', error);
//         return resolve(NextResponse.json({ message: 'Erro ao enviar o e-mail.' }, { status: 500 }));
//       }
//     });
//   });
// }
