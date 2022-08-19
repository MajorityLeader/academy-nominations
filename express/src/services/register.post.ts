import express, {
  Router, Request, Response,
} from 'express';
import { check, validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nanoid from '../nanoid';
import prisma from '../prisma';
import nodemailer from '../nodemailer';

const router: Router = express.Router();

type Registration = {
  id: String,
  email: String
  link?: String
}

const sendRegistrationEmail = async (registration: Registration) => {
  const data = { ...registration };
  data.link = `${process.env.WEBSITE_URL}/application/contact?a=${data.id}`;
  const parmFile = fs.readFileSync(path.resolve('src/email/register.txt'), 'utf-8');
  const template = handlebars.compile(parmFile, { noEscape: true });
  const text = template(data);
  return nodemailer.sendMail({
    from: '"Steny Hoyer" <hoyer@mail.house.gov>',
    to: `${data.email}`,
    subject: 'Your unique US Service Academy Nominations Application link',
    text,
  });
};

router.post(
  '/',
  check('email', 'That email does not appear valid.').trim().normalizeEmail({ all_lowercase: true }).isEmail(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = nanoid();
    try {
      const data = await prisma.application.create({
        data: {
          id,
          email: req.body.email,
        },
        select: {
          id: true,
          email: true,
        },
      });
      sendRegistrationEmail(data);
      return res.status(200).json({});
    } catch (e) {
      if (e.code === 'P2002') { // An application has already been started with that email address. Simply resend registration email.
        const data = await prisma.application.findFirst({
          where: {
            email: req.body.email,
          },
          select: {
            id: true,
            email: true,
          },
        });
        sendRegistrationEmail(data);
        return res.status(200).json({});
      }
      return res.status(400).json({});
    }
  },
);

export default router;
