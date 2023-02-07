import { atom } from "recoil";

import { v1 } from "uuid";

export const UserId = atom({
  key: `userId/${v1()}`,
  default: "",
});

export const ClientAddress = atom({
  key: `clientAddress/${v1()}`,
  default: "",
});

export const RequestKey = atom({
  key: `requestKey/${v1()}`,
  default: "",
});
