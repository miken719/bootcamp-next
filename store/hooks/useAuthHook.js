import {
  useDeleteUserMutation,
  useForgetpasswordMutation,
  useGetUsersQuery,
  useRegisterMutation,
  useResetpasswordMutation,
  useUserLoginMutation,
} from "../reducer/auth";

export const useAuthHook = () => {
  const [userLogin, { data: loginData, isLoading: loginIsLoading }] =
    useUserLoginMutation();

  const [
    userRegister,
    { data: userRegisterData, isLoading: userRegisterIsLoading },
  ] = useRegisterMutation();

  const [
    forgetPassword,
    { data: forgetPasswordData, isLoading: forgetPasswordIsLoading },
  ] = useForgetpasswordMutation();
  const [
    resetPassword,
    { data: resetPasswordData, isLoading: resetPasswordIsLoading },
  ] = useResetpasswordMutation();

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
    forgetPassword,
    forgetPasswordData,
    forgetPasswordIsLoading,
    resetPassword,
    resetPasswordData,
    resetPasswordIsLoading,
  };
};
