import { useFormik } from "formik";
import { useRouter } from "next/router";

const HomePage = ({ cms }) => {
  const router = useRouter();
  const exploreBootcampFormik = useFormik({
    initialValues: {
      miles: "",
      zipcode: "",
    },
    onSubmit: (values) => {
      if (values.miles === "" || values.zipcode === "") {
        router.push("/bootcamp");
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

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="miles"
                  placeholder="Miles From"
                  value={exploreBootcampFormik.values.miles}
                  onChange={exploreBootcampFormik.handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="zipcode"
                  placeholder="Enter Zipcode"
                  value={exploreBootcampFormik.values.zipcode}
                  onChange={exploreBootcampFormik.handleChange}
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            onClick={() => exploreBootcampFormik.handleSubmit()}
            defaultValue="Find Bootcamps"
            className="btn btn-primary btn-block"
          />
        </div>
      </div>
    </section>
  );
};
export default HomePage;
