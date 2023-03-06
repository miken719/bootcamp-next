import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import combineReducers, { getReducerMiddlewares } from "./middleware/index";

import { persistConfig } from "./persistConfig";

export const combinedReducers = combineReducers();

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  enhancers: [],
  middleware: (getDefaultMiddleware) => {
    //applyMiddleware(thunkMiddleware);
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...getReducerMiddlewares());
  },

  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export const wrapper = createWrapper(store, { debug: true });
