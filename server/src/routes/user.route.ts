import express, { Request, Response } from 'express';
import { userEmailAuth } from '../services/user/user_email_auth.service';

const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send('this is user');
});

userRouter.post('/auth', (req: Request, res: Response) => {
  const { email } = req.body;
  if (Object.keys(req.body).length != 1 || !email)
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });
  return userEmailAuth(res, email);
});

export { userRouter };
