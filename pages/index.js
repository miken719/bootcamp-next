import Header from "@/component/Layout/Header";
import { googleEvent } from "@/component/utils/googleAnalytics";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    googleEvent({
      event_category: "Home (Banner)",
      event_label: "Home",
    });
  }, []);

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
    <div>
      {/* Navbar */}
      <Header />
      {/* Showcase */}
      <section className="showcase">
        <div className="dark-overlay">
          <div className="showcase-inner container">
            <h1 className="display-4">Find a Code Bootcamp</h1>
            <p className="lead">
              Find, rate and read reviews on coding bootcamps
            </p>

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
    </div>
  );
}
