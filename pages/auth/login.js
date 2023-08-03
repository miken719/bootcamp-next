import { useRouter } from "next/router";
import { messageNotification } from "@/component/utils/functions";
import { useFormik } from "formik";
import { LOGIN_VALIDATION_SCHEMA } from "@/component/utils/schema";
import { useAuthHook } from "@/store/hooks/useAuthHook";
import Input from "@/component/utils/input";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/component/Layout/Header"));

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
        localStorage?.setItem("token", resp?.data?.token);
        messageNotification("User Login Successfully", "success");
        router.push("/users");
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
                    <Input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      required
                      formik={loginFormik}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <Input
                      type={loginFormik.values.isShow ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      required
                      formik={loginFormik}
                    />

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
                    <a href="/auth/forgetpassword">Reset Password</a>
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
