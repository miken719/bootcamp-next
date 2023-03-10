import dynamic from "next/dynamic";

import { messageNotification } from "@/component/utils/functions";
import { useAuthHook } from "@/store/hooks/useAuthHook";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "@/component/Layout/Header";

const forgetPassword = () => {
  const [email, setEmail] = useState("");
  const { forgetPassword, forgetPasswordIsLoading } = useAuthHook();
  const router = useRouter();
  const handleForgetPassword = async () => {
    const resp = await forgetPassword({ email });

    if (resp?.data?.success) {
      messageNotification(resp.data?.message, "success");
    } else {
      messageNotification(resp?.error?.data?.error, "error");
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
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
export default forgetPassword;
