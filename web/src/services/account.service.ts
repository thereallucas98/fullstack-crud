import { serverApi } from "../api/server.service";

interface IUser {
  id: string;
  name: string;
  email: string;
  birthday: string;
  registry: string;
}

interface IRequestParams {
  name: string;
}

export const accountServiceApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    updateAccount: build.mutation<IUser, IRequestParams>({
      query: (body) => ({
        url: "/account/me",
        body,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useUpdateAccountMutation } = accountServiceApi;
