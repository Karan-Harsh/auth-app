import { atom } from "recoil";

export const emailAtom = atom({
  key: "emailAtom",
  default: "",
});

export const authenticatedAtom = atom({
  key: "authenticatedAtom",
  default: false,
});
