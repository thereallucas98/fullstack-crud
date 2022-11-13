import { serverApi } from "../api/server.service";

interface IRequestCreateAccountParams {
  name: string;
  email: string;
  birthday: string;
  password: string;
}

export const authServiceApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation<void, IRequestCreateAccountParams>({
      query: (body) => ({
        url: "/account",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateAccountMutation } = authServiceApi;
