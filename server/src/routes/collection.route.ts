import express, { Request, Response } from "express";

const collectionRouter = express.Router();

collectionRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).send("this is collection");
});

export { collectionRouter };
