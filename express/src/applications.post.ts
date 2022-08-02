import express, { Router, Request, Response } from "express";
import { body, validationResult } from 'express-validator';

const router: Router = express.Router();
router.post('/',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }), async (req: Request, res: Response) => {
    try {
        res.send('OK');
    } catch (e: any) {
        res.status(500).send(e.toString());
    }
});

export default router;