import { serverApi } from '../api/server.service'

interface IUser {
  id: string
  name: string
  email: string
  birthday: string
  registry: string
}

interface IRequestParams {
  name_search?: string | null | undefined
}

interface IRequestUserParams {
  id: string
}

interface IRequestUpdateUser {
  id: string
  name: string
}

interface IRequestCreateUser {
  name: string
  email: string
  birthday: string
  password: string
}

export const usersServiceApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser[], IRequestParams>({
      query: (params) => ({
        url: '/users',
        params,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    createUser: build.mutation<void, IRequestCreateUser>({
      query: (body) => ({
        url: '/users',
        body,
        method: 'POST',
      }),
    }),
    deleteUser: build.mutation<void, IRequestUserParams>({
      query: ({ id }) => ({
        url: `/users/soft-delete/${id}`,
        method: 'PATCH',
      }),
    }),
    updateUser: build.mutation<void, IRequestUpdateUser>({
      query: ({ id, name }) => ({
        url: `/users/${id}`,
        body: {
          name,
        },
        method: 'PATCH',
      }),
    }),
    getUser: build.query<IUser, IRequestUserParams>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersServiceApi
