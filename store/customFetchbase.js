import { Mutex } from "async-mutex";
import { baseQuery } from "./baseQuery";

// Create a new mutex
const mutex = new Mutex();

const customFetchBase = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        setTimeout(() => (window.location.href = "/"), 500);
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export default customFetchBase;
