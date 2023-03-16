import { useGetUsersQuery } from "../reducer/user";

export const useUserHook = () => {
  const { data: getUsersData, isLoading: getUsersIsLoading } = useGetUsersQuery(
    { refetchOnMountOrArgChange: true, fixedCacheKey: "user-data-fetch" }
  );

  return {
    getUsersData,
    getUsersIsLoading,
  };
};
