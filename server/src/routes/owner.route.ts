import express, { Request, Response } from "express";

const ownerRouter = express.Router();

ownerRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).send("this is owner");
});

export { ownerRouter };
