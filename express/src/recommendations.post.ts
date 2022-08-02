import express, { Router, Request, Response } from "express";
import fs from 'fs';
import { validationResult, check } from 'express-validator';

const router: Router = express.Router();
router.post('/:id',
    async (req: Request, res: Response) => {
    try {
        // const {email: ['required-email']} = req.body;
        fs.writeFileSync(`../files/recommendations/${req.params.id}`, req.body);
        res.json({});
    } catch (e: any) {
        res.status(500).send(e.toString());
    }
});

export default router;