import { FILE_URL } from "@/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useBootcampHook } from "@/store/hooks/useBootcampHook";
import { googleEvent } from "@/component/utils/googleAnalytics";
import dynamic from "next/dynamic";
import { bootcampApi } from "@/store/reducer/bootcamp";
import { store } from "@/store";

const Header = dynamic(() => import("@/component/Layout/Header"));
const GoogleMaps = dynamic(() => import("@/component/google-map/maps"));

const BootcampDetails = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [bootcampDetails, setBootcampDetails] = useState();
  const [courses, setCourses] = useState();
  const { fetchBootcampById, fetchCoursesById, bootcampByIdLoading } =
    useBootcampHook();
  const fetchBootcampDetails = async () => {
    const resp = await fetchBootcampById(id);
    const courseResp = await fetchCoursesById(id);

    setCourses(courseResp?.data?.course);
    setBootcampDetails(resp?.data?.data);
  };
  useEffect(() => {
    if (id) fetchBootcampDetails();
    googleEvent({
      event_category: `Bootcamp ID:- ${id}`,
      event_label: id,
    });
  }, [id]);

  return (
    <div>
      {/* Navbar */}
      <Header privateRoute={true} />
      {bootcampByIdLoading ? (
        <h3 className="text-center mt-5">
          {" "}
          <img
            src={"/img/loading.gif"}
            style={{ width: "150px", marginTop: "200px" }}
            alt="Loading..."
          />
        </h3>
      ) : (
        <section className="bootcamp mt-5  p-4">
          <div className="container">
            <div className="row">
              {/* Main col */}
              <div className="col-md-8">
                <h1>{bootcampDetails?.name}</h1>
                {/* Description */}
                <p>{bootcampDetails?.description}</p>
                {/* Avg cost */}
                <p className="lead mb-4">
                  Average Course Cost:{" "}
                  <span className="text-primary">
                    ${bootcampDetails?.averageCost}
                  </span>
                </p>
                {/* Courses */}
                {courses &&
                  courses?.map((course) => (
                    <div
                      className="card mb-3 text-capitalize"
                      key={course?._id}
                    >
                      <h5 className="card-header bg-primary text-white">
                        {course?.title}
                      </h5>
                      <div className="card-body">
                        <h5 className="card-title">
                          Duration: {course?.weeks} Weeks
                        </h5>
                        <p className="card-text">{course?.description}</p>
                        <ul className="list-group mb-3">
                          <li className="list-group-item">
                            Cost: ${course?.tuition} USD
                          </li>
                          <li className="list-group-item">
                            Skill Required: {course?.minimumSkill}
                          </li>
                          <li className="list-group-item">
                            Scholarship Available:
                            <i
                              className={`fas ${
                                !course?.scholarhipsAvailable
                                  ? "fa-times text-danger"
                                  : "fa-check text-success"
                              }`}
                            />{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
              {/* Sidebar */}
              <div className="col-md-4">
                {/* Image */}
                {bootcampDetails?.photo && (
                  <Image
                    height={100}
                    width={100}
                    src={FILE_URL + bootcampDetails?.photo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/image_3.jpg";
                    }}
                    className="img-thumbnail"
                    alt="..."
                  />
                )}

                {/* Rating */}
                <h1 className="text-center my-4">
                  <span className="badge badge-secondary badge-success rounded-circle p-3">
                    8.8
                  </span>{" "}
                  Rating
                </h1>
                {/* Buttons */}
                <a href="reviews.html" className="btn btn-dark btn-block my-3">
                  <i className="fas fa-comments" /> Read Reviews
                </a>
                <a
                  href="add-review.html"
                  className="btn btn-light btn-block my-3"
                >
                  <i className="fas fa-pencil-alt" /> Write a Review
                </a>
                <a
                  href={bootcampDetails?.website}
                  target="_blank"
                  className="btn btn-secondary btn-block my-3"
                >
                  <i className="fas fa-globe" /> Visit Website
                </a>
                {/* Map */}
                <div id="map" style={{ width: "100%", height: "300px" }}>
                  {" "}
                  {bootcampDetails?.location?.coordinates?.[0] && (
                    <GoogleMaps
                      lng={bootcampDetails?.location?.coordinates?.[0]}
                      lat={bootcampDetails?.location?.coordinates?.[1]}
                    />
                  )}{" "}
                </div>
                {/* Perks */}

                <ul className="list-group list-group-flush mt-4">
                  <li className="list-group-item">
                    <i
                      className={`fas ${
                        bootcampDetails?.housing
                          ? "fa-check text-success"
                          : "fa-times text-danger"
                      }`}
                    />{" "}
                    Housing
                  </li>
                  <li className="list-group-item">
                    <i
                      className={`fas ${
                        bootcampDetails?.jobAssistance
                          ? "fa-check text-success"
                          : "fa-times text-danger"
                      }`}
                    />{" "}
                    Job Assistance
                  </li>
                  <li className="list-group-item">
                    <i
                      className={`fas ${
                        bootcampDetails?.jobGuarantee
                          ? "fa-check text-success"
                          : "fa-times text-danger"
                      }`}
                    />{" "}
                    Job Guarantee
                  </li>
                  <li className="list-group-item">
                    <i
                      className={`fas ${
                        bootcampDetails?.acceptGi
                          ? "fa-check text-success"
                          : "fa-times text-danger"
                      }`}
                    />{" "}
                    Accepts GI Bill
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default BootcampDetails;

export async function getServerSideProps(context) {
  const [bootcamp] = bootcampApi.endpoints.bootcamp.useMutation();
  const response = await bootcamp(context.query.id);
  console.log(response, "response");
  return {
    props: {
      data: response,
    },
  };
}
