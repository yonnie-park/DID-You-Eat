import express, { Request, Response } from 'express';
import { get_tokens_by_address_service } from '../services/aptostoken/get_tokens_by_address.service';
import { get_tokens_by_email_service } from '../services/aptostoken/get_tokens_by_email.service';
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

tokenRouter.get('/:address', (req: Request, res: Response) => {
  return get_tokens_by_address_service(req.params.address, res);
});

tokenRouter.get('/email/:email', (req: Request, res: Response) => {
  return get_tokens_by_email_service(req.params.email, res);
});

export { tokenRouter };
