import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useRegisterMutation,
  useUserLoginMutation,
} from "../reducer/auth";

export const useAuthHook = () => {
  const [userLogin, { data: loginData, isLoading: loginIsLoading }] =
    useUserLoginMutation();

  const [
    userRegister,
    { data: userRegisterData, isLoading: userRegisterIsLoading },
  ] = useRegisterMutation();

  const [userDelete, { data: userDeleteData, isLoading: userDeleteLoading }] =
    useDeleteUserMutation();

  const { data: getUsersData, isLoading: getUsersIsLoading } = useGetUsersQuery(
    { refetchOnMountOrArgChange: true, fixedCacheKey: "user-data-fetch" }
  );
  return {
    userLogin,
    loginData,
    loginIsLoading,
    userRegister,
    userRegisterData,
    userRegisterIsLoading,
    getUsersData,
    getUsersIsLoading,
    userDelete,
    userDeleteData,
    userDeleteLoading,
  };
};
