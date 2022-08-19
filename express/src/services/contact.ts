// import axios from 'axios';
import express, { Router, Request, Response } from 'express';
import { check } from 'express-validator';
import prisma from '../prisma';

const router: Router = express.Router();

router.get(
  '/:id',
  async (req: Request, res: Response) => {
    const record = await prisma.contact.findFirst({
      where: {
        id: req.params.id,
      },
    });
    res.json(record);
  },
);

router.patch(
  '/:id',
  check('addressStreet').exists().withMessage('street address is required'),
  check('addressCity').exists().withMessage('city is required'),
  check('addressState').exists().withMessage('state is required'),
  check('addressZipcode').exists().withMessage('postal code is required'),
  check('addressZipCode').isPostalCode('US').withMessage('postal code does not seem valid'),
  check('addressPhone').exists().withMessage('phone number is required'),
  check('addressPhone').isMobilePhone('any').withMessage('not a valid phone number'),
  async (req: Request, res: Response) => {
    const create = { id: req.params.id, ...req.body };
    const update = { ...req.body };
    const record = await prisma.contact.upsert({
      where: {
        id: req.params.id,
      },
      create,
      update,
    });
    res.json(record);
  },
);

export default router;
