import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { serverApi } from "../api/server.service";

import authReducer from "./auth";

const reducer = combineReducers({
  auth: authReducer,
  [serverApi.reducerPath]: serverApi.reducer,
});

const customMiddleware = [
  serverApi.middleware,
]

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
