import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import { nanoid } from 'nanoid';

const router: Router = express.Router();

router.post('/start', async (req: Request, res: Response) => {
  const id = nanoid();
  const data = { id, ...req.body };
  const filePath = `../files/applications/${id}-${data['required-email']}/application.json`;
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.send('OK');
});
