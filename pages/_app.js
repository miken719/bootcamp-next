import "@/styles/globals.css";
import "@/styles/bootstrap.css";
import "rc-pagination/assets/index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Suspense } from "react";

// import "@/public/scss/style.scss"
export default function App({ Component, pageProps }) {
  const renderLoader = () => <p>Loading</p>;
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={renderLoader()}>
          {" "}
          <ToastContainer /> <Component {...pageProps} />
        </Suspense>
      </Provider>
    </>
  );
}
