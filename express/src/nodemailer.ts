import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.NODE_ENV === 'production' ? 'mailhost.house.gov' : 'localhost',
  port: process.env.NODE_ENV === 'production' ? 25 : 1025,
  secure: false,
});

export default transporter;
