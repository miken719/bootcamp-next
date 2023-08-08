import Head from "next/head";
import React from "react";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404-Page Not Found</title>
      </Head>
      <div style={styles.container}>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.subheading}>
          Oops! The page you are looking for doesn't exist.
        </p>
        <img src="/img/404.png" alt="404 Error" style={styles.image} />
        <a href="/" style={styles.link}>
          Go back to the homepage
        </a>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#292929",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.2rem",
    color: "#777",
    marginBottom: "2rem",
  },
  image: {
    maxWidth: "50%",
    height: "300px",
    marginBottom: "2rem",
  },
  link: {
    fontSize: "1.1rem",
    color: "#007bff",
    textDecoration: "none",
    borderBottom: "1px solid #007bff",
  },
};

export default Custom404;
