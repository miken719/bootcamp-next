import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { googleEvent } from "../utils/googleAnalytics";

const Header = ({ metaInfo, privateRoute }) => {
  const getLink = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
  };
  const link = getLink();
  useEffect(() => {
    googleEvent({
      event_category: "Login",
      event_label: link,
    });
  }, []);
  return (
    <>
      {/* /******************* 
        @purpose : SEO Intigration
        @Author :INIC
        ******************/}
      <Head>
        <title>
          {metaInfo && metaInfo.title
            ? metaInfo.title
            : "BootCampGo | Find a coding bootcamp"}
        </title>
        <meta name="title" content={"Bootcamp title"} />
        <meta
          name="description"
          content={
            "Become a Web Development Pro: Enroll in Our Intensive Coding Bootcamp Today!"
          }
        />
        <meta name="keywords" content={"Bootcamp keyword"} />
        <meta name="image" content={"Bootcamp image"} />

        <meta name="redirect" content={" Bootcamp redirect"} />
        <meta name="robots_adv" content={" Bootcamp robots adv"} />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <i className="fas fa-laptop-code" /> DevCamper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!privateRoute && (
                <li className="nav-item">
                  <Link className="nav-link" href={"/auth/login"}>
                    <i className="fas fa-sign-in-alt" /> Login
                  </Link>
                </li>
              )}
              {!privateRoute && (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" href={"/auth/register"}>
                      <i className="fas fa-user-plus" /> Register
                    </Link>
                  </li>
                </>
              )}

              {privateRoute && (
                <li className="nav-item d-none d-sm-block">
                  <Link className="nav-link" href="/">
                    <i className="fas fa-sign-out-alt" /> Logout
                  </Link>
                </li>
              )}
              {privateRoute && (
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                      >
                        <i className="fas fa-user" /> Account
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="/manage-bootcamp">
                          Manage Bootcamp
                        </a>
                        <a className="dropdown-item" href="#">
                          Manage Reviews
                        </a>
                        <a
                          className="dropdown-item"
                          href="/manage-account/update-details"
                        >
                          Manage Account
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="login.html">
                          <i className="fas fa-sign-out-alt" /> Logout
                        </a>
                      </div>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" href={"/bootcamp/[slug]"}>
                        Browse Bootcamps
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
