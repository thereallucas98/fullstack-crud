import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IUser = {
  id: string
  name: string
  email: string
  registry: string
  birthday: string
  is_deleted: boolean
}

type AuthState = { user: IUser | null; token: string | null }

type LoginData = { user: IUser; accessToken: string }

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
  },
})

export const { setCredentials, updateUserProfile } = authSlice.actions

export default authSlice.reducer
