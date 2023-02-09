import { atom } from "recoil";

import { v1 } from "uuid";

export const ClientEmailAtom = atom({
  key: `clientEmail/${v1()}`,
  default: "",
});

export const ClientAddressAtom = atom({
  key: `clientAddress/${v1()}`,
  default: "",
});

export const IsLoggedInAtom = atom({
  key: `isLoggedIn/${v1()}`,
  default: false,
});

export const RequestKey = atom({
  key: `requestKey/${v1()}`,
  default: "",
});

export const AdminAddressAtom = atom({
  key: `adminAddress/${v1()}`,
  default: "",
});

export const IsBoomLoginAtom = atom({
  key: `isBoomLogin/${v1()}`,
  default: false,
});
