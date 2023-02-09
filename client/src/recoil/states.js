import { atom } from "recoil";

import { v1 } from "uuid";

export const ClientEmail = atom({
  key: `clientEmail/${v1()}`,
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

export const AdminAddressAtom = atom({
  key: `adminAddress/${v1()}`,
  default: "",
});
