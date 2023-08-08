import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import { FILE_URL } from "@/config";
import { useBootcampHook } from "@/store/hooks/useBootcampHook";
import { googleEvent } from "@/component/utils/googleAnalytics";
import { useRouter } from "next/router";
import geoLocationHook from "@/component/google-map/geoLocationHook";
import Head from "next/head";
import GoogleMaps from "@/component/google-map/maps";
const Header = dynamic(() => import("@/component/Layout/Header"));

const Bootcamps = () => {
  const router = useRouter();
  const { errorLoading, address, handleTrackLocation } = geoLocationHook();
  const [pagesize, setPagesize] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [browseBootcamps, setBrowseBootcamps] = useState([]);

  const [sort, setSort] = useState(1);
  const [radius, setRadius] = useState({
    zipcode: router?.query?.slug?.[0],
    distance: router?.query?.slug?.[1],
  });

  useEffect(() => {
    setRadius({
      zipcode: router?.query?.slug?.[0],
      distance: router?.query?.slug?.[1],
    });
  }, [router?.query?.slug]);

  const {
    fetchBootcamp,
    bootcampIsLoading,
    fetchBootcampByRadius,
    bootcampIsLoadingByRadius,
  } = useBootcampHook();

  const getLink = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
  };

  const link = getLink();
  useEffect(() => {
    if (radius.zipcode && radius.distance) {
      browseBootcampsByRadius();
    } else {
      browseBootcampsAllBootcamps();
    }
    googleEvent({
      event_category: "Browse Bootcamp",
      event_label: link,
    });
  }, [radius.zipcode, page, pagesize, sort]);

  const browseBootcampsByRadius = async () => {
    let params = {
      zipcode: radius.zipcode ?? "",
      distance: radius.distance ?? "",
    };
    const api = await fetchBootcampByRadius(params);
    setBrowseBootcamps(api?.data?.data);
    setTotal(api?.data?.totalrecords);
  };

  const browseBootcampsByLocation = async () => {
    handleTrackLocation();
    if (!errorLoading && address?.postalCode) {
      let params = {
        zipcode: address?.postalCode,
        distance: "10",
      };
      const api = await fetchBootcampByRadius(params);
      setBrowseBootcamps(api?.data?.data);
      setTotal(api?.data?.totalrecords);
    }
  };

  const browseBootcampsAllBootcamps = async () => {
    const params = `?limit=${pagesize}&page=${page}&sort=${sort}`;
    const api = await fetchBootcamp(params);

    googleEvent({
      event_category: "Browse Bootcamp By Radius",
      event_label: params,
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
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"
        ></script>
      </Head>
      {/* Navbar */}
      <Header privateRoute={true} />

      {/* Latest bootcamps */}
      <section className="browse my-5 p-4">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4">
              {address?.adminArea6 && (
                <div className="card card-body mb-4">
                  <h4 className="mb-3">You are in:</h4>
                  <p>Area: {address?.adminArea6}</p>
                  <p>City: {address?.adminArea4}</p>
                  <p>State: {address?.adminArea3}</p>
                  <p>Country: {address?.adminArea1}</p>
                </div>
              )}

              <div className="card card-body mb-4">
                <h4 className="mb-3">Find Nearby BootCamps</h4>
                <form>
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={browseBootcampsByLocation}
                      className="btn btn-primary btn-block"
                    >
                      {errorLoading ? "Locating..." : "Locate Me"}
                    </button>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      className="btn btn-primary btn-block"
                    >
                      Show on map
                    </button>
                  </div>
                </form>
              </div>
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
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={browseBootcampsByRadius}
                      className="btn btn-primary btn-block"
                    >
                      Find Bootcamps
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRadius({ ...radius, distance: "", zipcode: "" });
                        browseBootcampsAllBootcamps();
                      }}
                      className="btn btn-primary btn-block"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
              <div className="card card-body mb-4">
                <h4 className="mb-3">Sort</h4>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <button
                        type="primary"
                        className="btn-primary form-control"
                        value={radius.distance}
                        onClick={() => setSort("-createdAt")}
                      >
                        {" "}
                        Newest{" "}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <button
                        type="primary"
                        className="btn-primary form-control"
                        value={radius.distance}
                        onClick={() => setSort("createdAt")}
                      >
                        {" "}
                        Oldest{" "}
                      </button>
                    </div>
                  </div>
                </div>
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
              {(browseBootcamps && bootcampIsLoading) ||
              bootcampIsLoadingByRadius ? (
                <h3 className="text-center mt-5">
                  {" "}
                  <img
                    src={"/img/loading.gif"}
                    style={{ width: "150px" }}
                    alt="Loading..."
                  />
                </h3>
              ) : browseBootcamps?.length === 0 ? (
                <h3 className="text-center mt-5">
                  {" "}
                  <img
                    src={"/img/no-records.png"}
                    style={{ width: "550px" }}
                    alt="No Records Found..."
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      setRadius({ ...radius, distance: "", zipcode: "" });
                      browseBootcampsAllBootcamps();
                    }}
                  >
                    Find All Bootcamps
                  </button>
                </h3>
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
                              <Link href={`/bootcamp-details/${bootcamp._id}`}>
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
        <div>
          {/* Button trigger modal */}

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Find Nearby Bootcamp
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {browseBootcamps?.map((cords, index) => {
                    return (
                      <GoogleMaps
                        key={index}
                        lng={cords?.location?.coordinates?.[0]}
                        lat={cords?.location?.coordinates?.[1]}
                      />
                    );
                  })}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Bootcamps;
