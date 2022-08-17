// import axios from 'axios';
import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { check } from 'express-validator';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import multer from 'multer';
import sendMail from './email/recommendation-request';

const nanoid = customAlphabet(alphanumeric, 10);

const upload = multer();

const router: Router = express.Router();

router.post(
  '/',
  upload.fields([{ name: 'file-recommendation', maxCount: 1 }, { name: 'file-transcript', maxCount: 1 }, { name: 'file-essay', maxCount: 1 }, { name: 'file-photo', maxCount: 1 }]),
  check('required-FIRSTNAME', 'first name is required').exists(),
  check('required-LASTNAME').exists().withMessage('last name is required'),
  check('required-email').isEmail().normalizeEmail().trim()
    .withMessage('email is not valid'),
  check('required-dob').isDate().withMessage('date of birth must be a date').toDate(),
  check('required-pob').exists().withMessage('place of birth is required'),
  check('required-street').exists().withMessage('street address is required'),
  check('required-city').exists().withMessage('city is required'),
  check('required-state').exists().withMessage('state is required'),
  check('required-zipcode').exists().withMessage('postal code is required').isPostalCode('US')
    .withMessage('not a valid US postal code'),
  check('required-phone').isMobilePhone('any').withMessage('not a valid phone number'),
  check('required-highschool-location').exists().withMessage('high school is required'),
  check('required-highschool-graduation').exists().withMessage('high school year of graduation required').isNumeric()
    .withMessage('high school graduation must be a number')
    .isAfter('2018')
    .withMessage('high school graduation should be after 2018'),
  check('academy-selection-first').exists().withMessage('first choice of academy must be selected'),
  check('academy-selection-second').exists().withMessage('second choice of academy must be selected'),
  check('academy-selection-third').exists().withMessage('third choice of academy must be selected'),
  check('required-contact-reference').exists().withMessage('letters of recommendation option must be chosen'),
  check('file-transcript').exists().withMessage('transcript file must be attached'),
  check('file-essay').exists().withMessage('essay file must be attached'),
  check('file-photo').exists().withMessage('photo file must be attached'),
  async (req: Request, res: Response) => {
    try {
      const id = nanoid();
      const data = { id, ...req.body };
      // Save files locally
      const filePath = `../files/applications/${id}-${data['required-email']}/application.json`;
      const dirname = path.dirname(filePath);
      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
      }
      fs.writeFileSync(filePath, JSON.stringify(data));
      // Send recommendation request
      await sendMail({
        referenceName: 'Shaun Brown',
        referenceEmail: 'shaunjason@gmail.com',
        referenceLink: `http://localhost:3000/${id}`,
        applicationName: 'Shaun Brown',
        applicationDeadline: 'October 11, 2022',
        applicationCode: id,
      });
      // const { files } = req;
      // if (files['file-essay'].length) {
      //   fs.writeFileSync(`../files/applications/${id}-${data['required-email']}/attachments/transcript.json`, JSON.stringify(data));
      // }
      // if (req.files['file-essay'].length) {
      //   fs.writeFileSync(`../files/applications/${id}-${data['required-email']}/attachments/essay.json`, JSON.stringify(data));
      // }
      // if (req.files['file-photo'].length) {
      //   fs.writeFileSync(`../files/applications/${id}-${data['required-email']}/attachments/photo.json`, JSON.stringify(data));
      // }
      // Fire off email for recommendations request
      //   await axios.post('/htbin/formproc/nominations.txt&display=/academy-nominations-thank-you&nobase&fpGetVer=2', req.body);
      res.send('OK');
    } catch (e: any) {
      res.status(500).send(e.toString());
    }
  },
);

export default router;
