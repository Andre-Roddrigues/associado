const { error } = require('console');
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.SMTP_USER,
       to: 'suporte@unitec.ac.mz',
       subject: 'Teste 2',
       text: 'Teste 2'
  }

  transporter.sendMail(mailOptions, (error, info)=> {
    if(error){
        console.log('error Ocurred' + error);
    }else {
        console.log("sent" + mailOptions.to)
    }
  })