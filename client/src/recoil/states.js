import { atom } from "recoil";
import { v1 } from "uuid";

import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const ClientEmailAtom = atom({
  key: `clientEmail`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const ClientAddressAtom = atom({
  key: `clientAddress`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const IsLoggedInAtom = atom({
  key: `isLoggedIn`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const RequestKey = atom({
  key: `requestKey`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const AdminAddressAtom = atom({
  key: `adminAddress`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const IsBoomLoginAtom = atom({
  key: `isBoomLogin`,
  default: false,
});
