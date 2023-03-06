import PrivateHeader from "@/component/Layout/PrivateHeader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Pagination from "rc-pagination";
import { FILE_URL } from "@/config";
import { useBootcampHook } from "@/store/hooks/useBootcampHook";
import { googleEvent } from "@/component/utils/googleAnalytics";

const Bootcamps = () => {
  const [pagesize, setPagesize] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [browseBootcamps, setBrowseBootcamps] = useState([]);

  const [radius, setRadius] = useState({
    zipcode: "",
    distance: "",
  });
  const {
    fetchBootcamp,
    bootcampIsLoading,
    fetchBootcampByRadius,
    bootcampIsLoadingByRadius,
  } = useBootcampHook();

  useEffect(() => {
    browseBootcampsAllBootcamps();
  }, [page, pagesize]);

  const browseBootcampsByRadius = async () => {
    let params = {
      zipcode: radius.zipcode ? radius.zipcode : "0",
      distance: radius.distance ? radius.distance : "0",
    };
    const api = await fetchBootcampByRadius(params);
    setBrowseBootcamps(api?.data?.data);
    setTotal(api?.data?.totalrecords);
  };
  const getLink = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
  };
  const link = getLink();
  const browseBootcampsAllBootcamps = async () => {
    const params = `?limit=${pagesize}&page=${page}`;
    const api = await fetchBootcamp(params);

    googleEvent({
      event_category: "Browse Bootcamp By Radius",
      event_label: link,
    });

    setBrowseBootcamps(api?.data?.result);
    setTotal(api?.data?.totalrecords);
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
              {browseBootcamps &&
              (bootcampIsLoading || bootcampIsLoadingByRadius) ? (
                <h3 className="text-center mt-5">
                  {" "}
                  <img
                    src={"/img/loading.gif"}
                    style={{ width: "150px" }}
                    alt="Loading..."
                  />
                </h3>
              ) : browseBootcamps?.length === 0 ? (
                <h3 className="text-center ">No Records Found</h3>
              ) : (
                browseBootcamps?.map((bootcamp) => {
                  return (
                    <div className="card mb-3" key={bootcamp?._id}>
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <Image
                            height={100}
                            width={100}
                            src={FILE_URL + bootcamp?.photo}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/img/image_3.jpg";
                            }}
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

              {/* Pagination */}
              {browseBootcamps?.length > 0 && (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <Pagination
                      className="ant-pagination "
                      pageSize={pagesize}
                      current={page}
                      total={total}
                      onChange={paginationChange}
                    />
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Bootcamps;
