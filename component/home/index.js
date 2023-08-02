import { useFormik } from "formik";
import { useRouter } from "next/router";
import Input from "../../component/utils/input";

function HomePage({ cms }) {
  const router = useRouter();
  const exploreBootcampFormik = useFormik({
    initialValues: {
      miles: "",
      zipcode: "",
    },
    onSubmit: (values) => {
      if (!values.miles || !values.zipcode) {
        router.push("/bootcamp/[slug]");
      } else {
        router.push(`/bootcamp/${values.zipcode}/${values.miles}`);
      }
    },
  });
  return (
    <section className="showcase">
      <div className="dark-overlay">
        <div className="showcase-inner container">
          <h1 className="display-4">{cms?.title}</h1>
          <p className="lead">{cms?.description}</p>
          <form onSubmit={exploreBootcampFormik.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="miles"
                    placeholder="Miles From"
                    formik={exploreBootcampFormik}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder="Enter Zipcode"
                    formik={exploreBootcampFormik}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              defaultValue="Find Bootcamps"
              className="btn btn-primary btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default HomePage;
