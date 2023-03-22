import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

import { router } from './routes';

const PORT: number = 3000;

const app = express();

const sslOptions = {
  ca: fs.readFileSync(__dirname + '/../api.didyoueatapi.kro.kr/ca_bundle.crt'),
  key: fs.readFileSync(__dirname + '/../api.didyoueatapi.kro.kr/private.key'),
  cert: fs.readFileSync(
    __dirname + '/../api.didyoueatapi.kro.kr/certificate.crt'
  ),
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('This is Server!!');
});

//routes

app.use('/users', router.userRouter);
app.use('/owners', router.ownerRouter);
app.use('/collections', router.collectionRouter);
app.use('/tokens', router.tokenRouter);

app.listen(PORT, () => {
  console.log(`server is listening at post ${PORT}`);
});

https.createServer(sslOptions, app).listen(3002);
