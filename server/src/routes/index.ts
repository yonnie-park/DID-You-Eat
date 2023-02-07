import { userRouter } from "./user.route";
import { ownerRouter } from "./owner.route";
import { collectionRouter } from "./collection.route";
import { tokenRouter } from "./token.route";

const router = {
  userRouter,
  ownerRouter,
  collectionRouter,
  tokenRouter,
};

export { router };
