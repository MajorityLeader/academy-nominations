import express, { Router, Request, Response } from 'express';
import nanoid from '../nanoid';
import prisma from '../prisma';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const id = nanoid();
  await prisma.academyNominations.create({
    data: {
      id,
      email: req.body.email,
    },
  });
  res.send('OK');
});

export default router;
