import { serverApi } from '../api/server.service'
import { IUser } from '../redux'

interface IRequestCreateAccountParams {
  name: string
  email: string
  birthday: string
  password: string
}

interface IRequestLoginParams {
  email: string
  password: string
}

interface IResponseLogin {
  user: IUser
  token: string
}

export const authServiceApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation<void, IRequestCreateAccountParams>({
      query: (body) => ({
        url: '/account',
        body,
        method: 'POST',
      }),
    }),
    login: build.mutation<IResponseLogin, IRequestLoginParams>({
      query: (body) => ({
        url: '/sessions',
        body,
        method: 'POST',
      }),
    }),
  }),
})

export const { useCreateAccountMutation, useLoginMutation } = authServiceApi
