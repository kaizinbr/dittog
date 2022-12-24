import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';
import fs from 'fs';

async function createNewUser(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

		const htmlContent = fs.readFileSync('server/models/emails/newUser.html',
            {encoding:'utf8'});

    console.log(htmlContent)

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no Currículo Maker',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para gerenciar seus currículos.`,
      html: `${htmlContent}`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    throw new Error(err);
  }
}

async function sendNewCurriculum(to, htmlContent) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Novo currículo criado',
      text: `Acesse o seu currículo em nosso site! http://localhost:8080/`,
      html: `${htmlContent}`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    throw new Error(err);
  }
}

export default { createNewUser, sendNewCurriculum };