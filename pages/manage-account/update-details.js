import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/component/Layout/Header"));
import { messageNotification } from "@/component/utils/functions";
import Input from "@/component/utils/input";
import { useAuthHook } from "@/store/hooks/useAuthHook";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ManageAccount = () => {
  const router = useRouter();
  const { updateUserDetails, updateDetailsDataIsLoading, getMe, getMeData } =
    useAuthHook();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await getMe();
  };

  const manageAccountFormik = useFormik({
    initialValues: {
      username: getMeData?.user?.username ?? "",
      email: getMeData?.user?.email ?? "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const body = {
        username: values.username,
        email: values.email,
      };
      const resp = await updateUserDetails(body);
      if (resp?.data?.success) {
        await getUserDetails();
        messageNotification("Details Updated Successfully", "success");
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
                <h1 className="mb-2">Manage Account</h1>
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <Input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Name"
                      formik={manageAccountFormik}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <Input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      formik={manageAccountFormik}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          type="button"
                          className="btn btn-success btn-block"
                          onClick={manageAccountFormik.handleSubmit}
                        >
                          {updateDetailsDataIsLoading ? "Loading..." : "Save"}
                        </button>
                      </div>
                      <div className="col-md-6">
                        <a
                          className="btn btn-secondary btn-block"
                          onClick={() =>
                            router.push("/manage-account/update-password")
                          }
                        >
                          Update Password
                        </a>
                      </div>
                    </div>
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
export default ManageAccount;
