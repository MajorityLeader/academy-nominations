import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

interface Data {
  referenceName: string,
  referenceEmail: string,
  referenceLink: string,
  applicationName: string,
  applicationDeadline: string,
  applicationCode: string
}

const transporter = nodemailer.createTransport({
  host: process.env.NODE_ENV === 'production' ? 'mailhost.house.gov' : 'localhost',
  port: process.env.NODE_ENV === 'production' ? 25 : 1025,
  secure: false,
});

const sendMail = async (data: Data) => {
  const parmFile = fs.readFileSync(path.resolve('src/email/recommendation-request.txt'), 'utf-8');
  const template = handlebars.compile(parmFile);
  const text = template(data);
  await transporter.sendMail({
    from: '"Steny Hoyer" <hoyer@mail.house.gov>',
    to: `${data.referenceName} <${data.referenceEmail}`,
    subject: `${data.applicationName} is requesting a reference from you`,
    text,
  });
};

export default sendMail;
