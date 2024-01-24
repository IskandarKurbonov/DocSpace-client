import { createContext, useContext } from "react";

import SpacesStore from "./SpacesStore";

import store from "client/store";
import { UserStore } from "@docspace/shared/store/UserStore";
import { BannerStore } from "@docspace/shared/store/BannerStore";
const {
  auth: authStore,
  userStore,
  bannerStore,
}: { userStore: UserStore; bannerStore: BannerStore; auth: any } = store;

export class RootStore {
  authStore = authStore;
  userStore = userStore;
  bannerStore = bannerStore;
  spacesStore = new SpacesStore(this.authStore);
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with RootStoreProvider"
    );
  }

  return context;
};
