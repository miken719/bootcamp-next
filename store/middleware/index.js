import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../reducer/auth";
import { bootcampApi } from "../reducer/bootcamp";

/** ***************** 
@purpose : root reducer
@Author : INIC
@return : combine reducers
***************** */
export default () =>
  combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [bootcampApi.reducerPath]: bootcampApi.reducer,
  });

/** ***************** 
@purpose : RTK Query middlwares
@Author : INIC
@return : array of middlewares
***************** */
export const getReducerMiddlewares = () => [
  authApi.middleware,
  bootcampApi.middleware,
];
