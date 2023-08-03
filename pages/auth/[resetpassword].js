import { messageNotification } from "@/component/utils/functions";
import Input from "@/component/utils/input";
import { RESET_PASSWORD_SCHEMA } from "@/component/utils/schema";
import { useAuthHook } from "@/store/hooks/useAuthHook";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/component/Layout/Header"));
const ResetPassword = () => {
  const { resetPassword } = useAuthHook();
  const router = useRouter();
  const token = router?.query?.resetpassword ?? "";
  const resetPasswordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: RESET_PASSWORD_SCHEMA,
    onSubmit: async (values) => {
      let body = {
        password: values.confirmPassword,
      };
      const resp = await resetPassword({ body: body, token: token });

      if (resp?.data?.success) {
        resetPasswordFormik.resetForm();
        router.push("/auth/login");
        messageNotification("Password Reset Successfully", "success");
      } else {
        messageNotification(resp?.error?.data?.error, "error");
      }
    },
  });
  return (
    <>
      <Header />
      <section className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h1 className="mb-2">Update Password</h1>

                <div className="form-group">
                  <label>New Password</label>
                  <Input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="New Password"
                    formik={resetPasswordFormik}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm New Password"
                    formik={resetPasswordFormik}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-dark btn-block"
                    onClick={resetPasswordFormik.handleSubmit}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ResetPassword;
