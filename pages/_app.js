import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <LayoutProvider>
        {Component.getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </LayoutProvider>
    );
  } else {
    return (
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </LayoutProvider>
    );
  }
}
