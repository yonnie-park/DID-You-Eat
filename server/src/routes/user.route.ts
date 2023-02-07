import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).send("this is user");
});

export { userRouter };
