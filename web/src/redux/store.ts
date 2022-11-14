import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { serverApi } from '../api/server.service'

import authReducer from './auth'

const reducer = combineReducers({
  auth: authReducer,
  [serverApi.reducerPath]: serverApi.reducer,
})

const rootReducer = (
  state: ReturnType<typeof reducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'LOGOUT') {
    return reducer(undefined, action)
  }
  return reducer(state, action)
}

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  timeout: 0,
  whitelist: ['auth'],
}

const customMiddleware = [serverApi.middleware]

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /**
       * Using as recommended in {@link https://redux-toolkit.js.org/ @reduxjs/toolkit} docs
       * @see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
       */
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(customMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
