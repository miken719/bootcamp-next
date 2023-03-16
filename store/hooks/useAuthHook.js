import {
  useDeleteUserMutation,
  useForgetpasswordMutation,
  useGetMeMutation,
  useRegisterMutation,
  useResetpasswordMutation,
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
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

  const [
    updateUserDetails,
    { data: updateDetailsData, isLoading: updateDetailsDataIsLoading },
  ] = useUpdateUserDetailsMutation();

  const [
    updatePassword,
    { data: updatePasswordData, isLoading: updatePasswordIsLoading },
  ] = useUpdatePasswordMutation();

  const [getMe, { data: getMeData, isLoading: getMeIsLoading }] =
    useGetMeMutation();
  return {
    userLogin,
    loginData,
    loginIsLoading,
    userRegister,
    userRegisterData,
    userRegisterIsLoading,
    userDelete,
    userDeleteData,
    userDeleteLoading,
    forgetPassword,
    forgetPasswordData,
    forgetPasswordIsLoading,
    resetPassword,
    resetPasswordData,
    resetPasswordIsLoading,
    updateUserDetails,
    updateDetailsData,
    updateDetailsDataIsLoading,
    updatePassword,
    updatePasswordData,
    updatePasswordIsLoading,
    getMe,
    getMeData,
    getMeIsLoading,
  };
};
