import nodemailer from 'nodemailer';
import hbs from 'hbs';
import { readFileSync } from 'fs';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const filePath = `${__dirname}/../app/utils/templates/welcome.hbs`;

const welcomeTemplate = hbs.compile(readFileSync(filePath, 'utf8'));

export const sendWelcomeMail = (name: string, email: string) => {
  return transport
    .sendMail({
      subject: '👏🏽 Bienvenid@',
      bcc: [email],
      html: welcomeTemplate({ name }),
    })
    .then((e) => console.log(e.accepted))
    .catch((e) => e);
};
