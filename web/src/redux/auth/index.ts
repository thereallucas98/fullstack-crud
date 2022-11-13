import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IUser = {
  id: string
  name: string
  email: string
  registry: string
  birthday: string
  is_deleted: boolean
}

export type AuthState = { user: IUser | null; token: string | null }

export type LoginData = { user: IUser; accessToken: string }

type UpdateAccount = { name: string }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, accessToken } }: PayloadAction<LoginData>,
    ) => {
      state.token = accessToken
      state.user = user
    },
    updateUserProfile: (
      state,
      { payload: { name } }: PayloadAction<UpdateAccount>,
    ) => {
      if (state.user) {
        state.user.name = name
      }
    },
    logout: (state, { payload: { user, token } }: PayloadAction<AuthState>) => {
      state.user = user
      state.token = token
    },
  },
})

export const { setCredentials, updateUserProfile, logout } = authSlice.actions

export default authSlice.reducer
