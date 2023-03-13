import Header from "@/component/Layout/Header";
import { messageNotification } from "@/component/utils/functions";
import Input from "@/component/utils/input";
import { useAuthHook } from "@/store/hooks/useAuthHook";
import { useFormik } from "formik";

const UpdatePassword = () => {
  const { updatePassword, updatePasswordIsLoading } = useAuthHook();
  const updatePasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      let body = {
        currentPassword: values.currentPassword,
        newPassword: values.confirmPassword,
      };
      const resp = await updatePassword(body);

      if (resp?.data?.success) {
        updatePasswordFormik.resetForm();
        messageNotification("Password Reset Successfully", "success");
      } else {
        messageNotification(resp?.error?.data?.error, "error");
      }
    },
  });
  return (
    <>
      <Header />{" "}
      <section className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h1 className="mb-2">Update Password</h1>
                <div className="form-group">
                  <label>Current Password</label>
                  <Input
                    type="password"
                    name="currentPassword"
                    class="form-control"
                    placeholder="Current Password"
                    formik={updatePasswordFormik}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <Input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="New Password"
                    formik={updatePasswordFormik}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm New Password"
                    formik={updatePasswordFormik}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-dark btn-block"
                    onClick={updatePasswordFormik.handleSubmit}
                  >
                    {updatePasswordIsLoading ? "Loading..." : "Update Password"}
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
export default UpdatePassword;
