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
