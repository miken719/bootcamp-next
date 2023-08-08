import dynamic from "next/dynamic";
import { messageNotification } from "@/component/utils/functions";
import { useFormik } from "formik";
import { REGISTER_COMPANY_SCHEMA } from "@/component/utils/schema";
import { useAuthHook } from "@/store/hooks/useAuthHook";
import { useRouter } from "next/router";
import Input from "@/component/utils/input";
const Header = dynamic(() => import("@/component/Layout/Header"));
const FormInputError = dynamic(() => import("@/component/utils/error"));

const Register = () => {
  const { userRegister, userRegisterIsLoading } = useAuthHook();
  const router = useRouter();
  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      isShow: false,
    },
    validationSchema: REGISTER_COMPANY_SCHEMA,
    onSubmit: async (values) => {
      const body = {
        username: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };
      const resp = await userRegister(body);

      if (resp?.data?.success) {
        router.push("/auth/login");
        messageNotification("User Created Successfully", "success");
      } else {
        messageNotification(resp?.error?.data?.error, "error");
      }
    },
  });
  return (
    <>
      <Header />{" "}
      <section className="form " style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <div className="card bg-white p-4 mb-4">
                <div className="card-body">
                  <h1>
                    <i className="fas fa-user-plus" /> Register
                  </h1>
                  <p>
                    Register to list your bootcamp or rate, review and favorite
                    bootcamps
                  </p>

                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter full name"
                      formik={registerFormik}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      formik={registerFormik}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type={registerFormik.values.isShow ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      formik={registerFormik}
                      required
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        registerFormik.setFieldValue(
                          "isShow",
                          !registerFormik.values.isShow
                        )
                      }
                    >
                      {!registerFormik.values.isShow ? "Show" : "Hide"}
                    </button>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password2">Confirm Password</label>
                    <Input
                      type={registerFormik.values.isShow ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      formik={registerFormik}
                      required
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        registerFormik.setFieldValue(
                          "isShow",
                          !registerFormik.values.isShow
                        )
                      }
                    >
                      {!registerFormik.values.isShow ? "Show" : "Hide"}
                    </button>
                  </div>
                  <div className="card card-body mb-3">
                    <h5>User Role</h5>
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="user"
                        formik={registerFormik}
                      />

                      <label className="form-check-label">
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="publisher"
                        formik={registerFormik}
                      />

                      <label className="form-check-label">
                        Bootcamp Publisher
                      </label>
                    </div>
                  </div>
                  <p className="text-danger">
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to CodeMasteryBootcamp.
                  </p>
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={() => registerFormik.handleSubmit()}
                      defaultValue="Register"
                      className="btn btn-primary btn-block"
                    >
                      {" "}
                      {userRegisterIsLoading ? "Loading..." : "Register"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
