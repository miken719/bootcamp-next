import Head from "next/head";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Head>
        {" "}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <script src="https://kit.fontawesome.com/3da1a747b2.js"></script>
        <meta charSet="UTF-8" />
        <title>DevCamper | Find a coding bootcamp</title>
      </Head>{" "}
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fas fa-laptop-code" /> DevCamper
          </a>
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
              <li className="nav-item">
                <Link className="nav-link" href={"/auth/login"}>
                  <i className="fas fa-sign-in-alt" /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/auth/register"}>
                  <i className="fas fa-user-plus" /> Register
                </Link>
              </li>
              <li className="nav-item d-none d-sm-block">
                <a className="nav-link" href="#">
                  |
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/bootcamp"}>
                  Browse Bootcamps
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
