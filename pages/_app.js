import "@/styles/globals.css";
import "@/styles/bootstrap.css";
import "rc-pagination/assets/index.css";
import { ToastContainer } from "react-toastify";

// import "@/public/scss/style.scss"
export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer /> <Component {...pageProps} />
    </>
  );
}
