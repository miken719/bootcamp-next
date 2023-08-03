import { useFormik } from "formik";
import { useRouter } from "next/router";
import Input from "../../component/utils/input";
import geoLocationHook from "../google-map/geoLocationHook";
import { useEffect } from "react";

function HomePage({ cms }) {
  const router = useRouter();
  const { errorLoading, address, handleTrackLocation } = geoLocationHook();

  useEffect(() => {
    if (!errorLoading && address?.postalCode) {
      router.push(`/bootcamp/${address?.postalCode}/10`);
    }
  }, [address]);
  const browseBootcampsByLocation = async () => {
    handleTrackLocation();
  };
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
            <div className="btn-block-container">
              <button
                type="submit"
                defaultValue="Find Bootcamps"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
              <span>Or</span>
              <button
                type="button"
                onClick={browseBootcampsByLocation}
                className="btn btn-primary btn-block"
              >
                {errorLoading ? "Locating..." : "Locate Me"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default HomePage;
