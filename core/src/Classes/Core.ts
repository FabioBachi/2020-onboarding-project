import axios, { AxiosInstance } from "axios";
import { setupCache } from "axios-cache-adapter";
import localforage from "localforage";
import memoryDriver from "localforage-memoryStorageDriver";

export default class Core {
  async getApi(): Promise<AxiosInstance> {
    // Register the custom `memoryDriver` to `localforage`
    await localforage.defineDriver(memoryDriver);

    const forageStore = localforage.createInstance({
      // List of drivers used
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver,
      ],
      name: "2020-onboarding",
    });

    const cache = setupCache({
      exclude: {
        query: false,
      },
      maxAge: 15 * 60 * 1000, // 15 minutes
      store: forageStore,
    });

    return axios.create({ adapter: cache.adapter });
  }
}
