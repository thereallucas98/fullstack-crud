import { serverApi } from "../api/server.service";

interface IUser {
  id: string;
  name: string;
  email: string;
  birthday: string;
  registry: string;
}

interface IRequestParams {
  q?: string;
}

interface IRequestCreateUser {
  name: string;
  email: string;
  birthday: string;
  password: string;
}

export const usersServiceApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    createUser: build.mutation<void, IRequestCreateUser>({
      query: (body) => ({
        url: "/users",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = usersServiceApi;
