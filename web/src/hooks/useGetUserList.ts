import { useGetUsersQuery } from "../services/users.service";

interface useGetUserListProps {
  q?: string | undefined;
}

export const useGetUserList = ({ q = undefined }: useGetUserListProps) => {
  const {
    isFetching,
    isLoading,
    data: users,
  } = useGetUsersQuery({ name_search: q });

  return {
    users,
    loadingUsers: isFetching || isLoading,
  };
};
