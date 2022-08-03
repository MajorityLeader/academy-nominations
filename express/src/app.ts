import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import applications from './applications.post';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

app.use('/applications', applications);

app.listen(3000, () => {
  console.log('🎖️ Academy Nominations API running on port 3000\n');
});
