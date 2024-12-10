import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "authentication",
  storage: localStorage,
});

export default atom({
  key: "authentication",
  default: {
    isLoggedIn: false,
    token: null,
    user: null,
  },
  effects_UNSTABLE: [persistAtom],
});
