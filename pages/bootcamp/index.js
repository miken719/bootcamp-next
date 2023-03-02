import PrivateHeader from "@/component/Layout/PrivateHeader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBootcampByRadius, fetchBootcamps } from "../api/api";
import Pagination from "rc-pagination";
import { FILE_URL } from "@/config";

const Bootcamps = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [pagesize, setPagesize] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);
  const [browseBootcamps, setBrowseBootcamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [radius, setRadius] = useState({
    zipcode: "",
    distance: "",
  });

  useEffect(() => {
    browseBootcampsAllBootcamps();
  }, [page, pagesize]);

  const browseBootcampsByRadius = async () => {
    setIsLoading(true);
    let params = {
      zipcode: radius.zipcode ? radius.zipcode : slug?.[0],
      distance: radius.distance ? radius.distance : slug?.[1],
    };

    const api = await fetchBootcampByRadius(params);

    setBrowseBootcamps(api?.data);
    setIsLoading(false);
  };

  const browseBootcampsAllBootcamps = async () => {
    setIsLoading(true);
    const api = await fetchBootcamps(page, pagesize);
    setBrowseBootcamps(api?.result);
    setTotal(5);
    setIsLoading(false);
  };

  const handleChange = (e, name) => {
    setRadius({ ...radius, [name]: e.target.value });
  };

  const paginationChange = (page, pageSize) => {
    setPage(page);
    setPagesize(pageSize);
  };
  return (
    <div>
      {/* Navbar */}
      <PrivateHeader />
      {/* Latest bootcamps */}
      <section className="browse my-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4">
              <div className="card card-body mb-4">
                <h4 className="mb-3">By Location</h4>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="miles"
                          placeholder="Miles From"
                          value={radius.distance}
                          onChange={(e) => handleChange(e, "distance")}
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
                          value={radius.zipcode}
                          onChange={(e) => handleChange(e, "zipcode")}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={browseBootcampsByRadius}
                    className="btn btn-primary btn-block"
                  >
                    Find Bootcamps
                  </button>
                </form>
              </div>
              <h4>Filter</h4>
              <form>
                {/* <div class="form-group">
								<label> Career</label>
								<select class="custom-select mb-2">
									<option value="any" selected>Any</option>
									<option value="Web Development">Web Development</option>
									<option value="Mobile Development">Mobile Development</option>
									<option value="UI/UX">UI/UX</option>
									<option value="Data Science">Data Science</option>
									<option value="Business">Business</option>
									<option value="Other">Other</option>
								</select>
							</div> */}
                <div className="form-group">
                  <label> Rating</label>
                  <select className="custom-select mb-2">
                    <option value="any" selected>
                      Any
                    </option>
                    <option value={9}>9+</option>
                    <option value={8}>8+</option>
                    <option value={7}>7+</option>
                    <option value={6}>6+</option>
                    <option value={5}>5+</option>
                    <option value={4}>4+</option>
                    <option value={3}>3+</option>
                    <option value={2}>2+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label> Budget</label>
                  <select className="custom-select mb-2">
                    <option value="any" selected>
                      Any
                    </option>
                    <option value={20000}>$20,000</option>
                    <option value={15000}>$15,000</option>
                    <option value={10000}>$10,000</option>
                    <option value={8000}>$8,000</option>
                    <option value={6000}>$6,000</option>
                    <option value={4000}>$4,000</option>
                    <option value={2000}>$2,000</option>
                  </select>
                </div>
                <input
                  type="submit"
                  defaultValue="Find Bootcamps"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
            {/* Main col */}
            <div className="col-md-8">
              {/* Bootcamps */}
              {browseBootcamps && isLoading ? (
                <span>Loading...</span>
              ) : browseBootcamps?.length === 0 ? (
                <div>No records</div>
              ) : (
                browseBootcamps?.map((bootcamp) => {
                  return (
                    <div className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <Image
                            height={100}
                            width={100}
                            src={FILE_URL + bootcamp?.photo}
                            className="card-img"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link href={`/bootcampDetails/${bootcamp._id}`}>
                                {bootcamp?.name}
                                <span className="float-right badge badge-success">
                                  8.8
                                </span>
                              </Link>
                            </h5>
                            <span className="badge badge-dark mb-2">
                              {bootcamp?.location?.city},{" "}
                              {bootcamp?.location?.country}
                            </span>
                            <p className="card-text">
                              {bootcamp?.careers?.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src="img/image_2.jpg" className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="bootcamp.html">
                          ModernTech Bootcamp
                          <span className="float-right badge badge-success">
                            7.5
                          </span>
                        </a>
                      </h5>
                      <span className="badge badge-dark mb-2">Boston, MA</span>
                      <p className="card-text">
                        Web Development, UI/UX, Mobile Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src="img/image_3.jpg" className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="bootcamp.html">
                          Codemasters
                          <span className="float-right badge badge-success">
                            9.2
                          </span>
                        </a>
                      </h5>
                      <span className="badge badge-dark mb-2">
                        Burlington, VT
                      </span>
                      <p className="card-text">
                        Web Development, Data Science, Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src="img/image_4.jpg" className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="bootcamp.html">
                          DevCentral Bootcamp
                          <span className="float-right badge badge-success">
                            6.4
                          </span>
                        </a>
                      </h5>
                      <span className="badge badge-dark mb-2">
                        Kingston, RI
                      </span>
                      <p className="card-text">
                        Web Development, UI/UX, Mobile Development, Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* Pagination */}

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <Pagination
                    className="ant-pagination"
                    pageSize={pagesize}
                    current={page}
                    total={total}
                    onChange={paginationChange}
                  />
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Bootcamps;
