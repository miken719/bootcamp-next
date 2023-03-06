import "@/styles/globals.css";
import "@/styles/bootstrap.css";
import "rc-pagination/assets/index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store";

// import "@/public/scss/style.scss"
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        {" "}
        <ToastContainer /> <Component {...pageProps} />
      </Provider>
    </>
  );
}
