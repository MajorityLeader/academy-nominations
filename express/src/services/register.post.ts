import express, {
  Router, Request, Response,
} from 'express';
import { check, validationResult } from 'express-validator';
import nanoid from '../nanoid';
import prisma from '../prisma';

const router: Router = express.Router();

type Registration = {
  id: String,
  email: String
}

const sendRegistrationEmail = (data: Registration) => {
  console.log(data.email);
  console.log('bar');
};

router.post(
  '/',
  check('email', 'That email does not appear valid.').isEmail(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = nanoid();
    try {
      const data = await prisma.academyNominations.create({
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
      return res.status(200);
    } catch (e) {
      if (e.code === 'P2002') {
        // An application has already been started with that email address. Simply resend email.
        const data = await prisma.academyNominations.findFirst({
          where: {
            email: req.body.email,
          },
          select: {
            id: true,
            email: true,
          },
        });
        sendRegistrationEmail(data);
        return res.status(200);
      }
      return res.status(400);
    }
  },
);

export default router;
