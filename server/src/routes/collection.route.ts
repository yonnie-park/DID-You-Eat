import express, { Request, Response } from 'express';
import { get_collections_by_address } from '../../prisma/scripts/collection';
import { create_collection_service } from '../services/collection/create_collection.service';
import { get_collections_service } from '../services/collection/get_collections.service';
import { get_collection_detail_service } from '../services/collection/get_collection_detail.service';

const collectionRouter = express.Router();

collectionRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send('this is collection');
});

collectionRouter.post('/create', (req: Request, res: Response) => {
  return create_collection_service(req.body, res);
});

collectionRouter.get('/:address', (req: Request, res: Response) => {
  return get_collections_service(req.params.address, res);
});

collectionRouter.get('/detail/:shop_name', (req: Request, res: Response) => {
  return get_collection_detail_service(req.params.shop_name, res);
});

export { collectionRouter };
