import express, { Request, Response } from 'express';
import { mint_token_service } from '../services/aptostoken/mint_token_to_email_user.service';

const tokenRouter = express.Router();

tokenRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send('this is token');
});

tokenRouter.post('/mint', (req: Request, res: Response) => {
  if (
    Object.keys(req.body).length != 3 ||
    !req.body.email ||
    !req.body.owner_address ||
    !req.body.collection_name
  ) {
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });
  }
  return mint_token_service(req.body, res);
});

export { tokenRouter };
