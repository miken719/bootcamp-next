import createTransform from "redux-persist/lib/createTransform";
import storage from "redux-persist/lib/storage";

export const setTransform = createTransform(
  (inboundState, key) => {
    // convert mySet to an Array.
    if (key === "authApi" && inboundState?.mutations?.["user-verify-post"])
      return {
        ...inboundState,
        mutations: {
          ["user-verify-post"]: inboundState?.mutations?.["user-verify-post"],
        },
      };
  },
  // transform state being rehydrated
  (outboundState) => {
    // convert mySet back to a Set.
    return { ...outboundState };
  },
  // define which reducers this transform gets called for.
  { whitelist: ["authApi"] }
);

export const persistConfig = {
  key: "root",
  storage,
  transforms: [setTransform],
};
