import "@/styles/globals.css";
import "@/styles/bootstrap.css";
import "rc-pagination/assets/index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/Layout/Footer"));
// import "@/public/scss/style.scss"
export default function App({ Component, pageProps }) {
  const renderLoader = () => <p>Loading</p>;
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={renderLoader()}>
          {" "}
          <ToastContainer /> <Component {...pageProps} />
          <Footer />
        </Suspense>
      </Provider>
    </>
  );
}
export async function getServerSideProps(context) {
  // Your redirection logic here
  const oldDomain = "https://bootcamp-next.vercel.app/";
  const newDomain = "https://bootcamp-navigator.vercel.app/";
  const shouldRedirect = true; // Change this based on your condition

  if (shouldRedirect) {
    const newPath = context.req.url.replace(oldDomain, newDomain);
    return {
      redirect: {
        destination: newPath,
        permanent: true, // Set to true for a permanent redirection (301)
        statusCode: 301, // Set the status code to 301
      },
    };
  }

  return {
    props: {}, // Return empty props if no redirection
  };
}
