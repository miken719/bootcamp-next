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
      <div class="dark-overlay">
        <div class="showcase-inner container">
          <h1 class="display-4">Explore Bootcamps</h1>
          <p class="lead">Find coding bootcamps near you.</p>
          <form
            class="explore-form"
            onSubmit={exploreBootcampFormik.handleSubmit}
          >
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="miles"
                  placeholder="Distance (Miles)"
                  formik={exploreBootcampFormik}
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="zipcode"
                  placeholder="Enter Zipcode"
                  formik={exploreBootcampFormik}
                  required
                />
              </div>
            </div>
            <div class="btn-block-container">
              <button type="submit" class="btn btn-primary btn-block">
                Find Bootcamps
              </button>
              <span>Or</span>
              <button
                type="button"
                onClick={browseBootcampsByLocation}
                class="btn btn-secondary btn-block"
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
