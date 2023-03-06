import { messageNotification } from "@/component/utils/functions";
import Header from "@/component/Layout/Header";
import { useFormik } from "formik";
//import { loginUser } from "../../api/api";
import { LOGIN_VALIDATION_SCHEMA } from "@/component/utils/schema";
import FormInputError from "@/component/utils/error";
import { useRouter } from "next/router";

import { useAuthHook } from "@/store/hooks/useAuthHook";

const Login = () => {
  const router = useRouter();
  const { userLogin } = useAuthHook();
  const loginFormik = useFormik({
    initialValues: { email: "", password: "", isShow: false },
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      const resp = await userLogin(body);

      if (resp?.data?.success) {
        localStorage.setItem("token", resp?.token);
        messageNotification("User Login Successfully", "success");
        router.push("/bootcamp");
      } else {
        messageNotification(resp?.error?.data?.error, "error");
      }
    },
  });
  return (
    <>
      <Header />
      <section className="form" style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <div className="card bg-white p-4 mb-4">
                <div className="card-body">
                  <h1>
                    <i className="fas fa-sign-in-alt" /> Login
                  </h1>
                  <p>
                    Log in to list your bootcamp or rate, review and favorite
                    bootcamps
                  </p>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      required
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                    />
                    <FormInputError formik={loginFormik} name={"email"} />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      type={loginFormik.values.isShow ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      required
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                    />

                    <FormInputError formik={loginFormik} name={"password"} />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        loginFormik.setFieldValue(
                          "isShow",
                          !loginFormik.values.isShow
                        )
                      }
                    >
                      {!loginFormik.values.isShow ? "Show" : "Hide"}
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={() => loginFormik.handleSubmit()}
                      className="btn btn-primary btn-block"
                    >
                      Login
                    </button>
                  </div>

                  <p>
                    {" "}
                    Forgot Password?{" "}
                    <a href="reset-password.html">Reset Password</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
