import { messageNotification } from "@/component/utils/functions";
import { useAuthHook } from "@/store/hooks/useAuthHook";

import { useState } from "react";
import Header from "@/component/Layout/Header";
import { errorMessages, INPUT_VALIDATOR } from "@/component/utils/constant";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  let [error, setError] = useState({});
  const { forgetPassword, forgetPasswordIsLoading } = useAuthHook();

  function validateForm() {
    let isValid = false;
    let error = { email: "" };
    if (!email) {
      error.email = errorMessages.EMAIL;
    } else if (!new RegExp(INPUT_VALIDATOR.emailRegExp).test(email)) {
      error.email = errorMessages.EMAIL_VAL;
    } else if (!error.email) {
      isValid = true;
    }
    setError(error);
    return isValid;
  }
  const handleForgetPassword = async () => {
    if (validateForm()) {
      const resp = await forgetPassword({ email });

      if (resp?.data?.success) {
        messageNotification(resp.data?.message, "success");
      } else {
        messageNotification(resp?.error?.data?.error, "error");
      }
    }
  };
  return (
    <>
      <Header />
      <section className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <a href="/auth/login">Back to login</a>
                <h1 className="mb-2">Reset Password</h1>
                <p>
                  {" "}
                  Use this form to reset your password using the registered
                  email address.
                </p>
                <form>
                  <div className="form-group">
                    <label>Enter Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        error = Object.assign(error, {
                          email: "",
                        });
                        setError(error);
                        setEmail(e.target.value);
                      }}
                    />
                    <span className="text-danger">{error?.email}</span>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-dark btn-block"
                      onClick={handleForgetPassword}
                    >
                      {!forgetPasswordIsLoading
                        ? "Reset Password"
                        : "Loading.."}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ForgetPassword;
