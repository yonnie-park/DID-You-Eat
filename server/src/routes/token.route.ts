import express, { Request, Response } from "express";

const tokenRouter = express.Router();

tokenRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).send("this is token");
});

export { tokenRouter };
