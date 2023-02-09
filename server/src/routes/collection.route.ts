import express, { Request, Response } from 'express';
import { get_collections_by_address } from '../../prisma/scripts/collection';
import { create_collection_service } from '../services/collection/create_collection.service';
import { get_collections_service } from '../services/collection/get_collections.service';

const collectionRouter = express.Router();

collectionRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send('this is collection');
});

collectionRouter.post('/create', (req: Request, res: Response) => {
  return create_collection_service(req.body, res);
});

collectionRouter.post('/getcollections', (req: Request, res: Response) => {
  return get_collections_service(req.body.address, res);
});

export { collectionRouter };
