import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { LayoutContext } from "./../layout/context/layoutcontext";
// API
import { getCompanies } from "./../api/dashboard";
// JSON
// import Companies from "./../config/Companies.json";

import TableCompanies from "../components/dashboard/TableCompanies";
import Spinner from "../components/utilities/Spinner";

export default function Dashboard() {
  const [companies, setCompanies] = useState(null);
  const [nameUser, setNameUser] = useState(null);
  const [closeButton, setCloseButton] = useState(false);
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { menu } = router.query;

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    if (menu === "yes") {
      onMenuToggleProcess(true);
    }

    const sessionClient = localStorage.getItem("logClient");
    if (sessionClient === null) {
      router.push("/auth/login");
    } else {
      var objectJSON = JSON.parse(sessionClient);
      setNameUser(objectJSON.name);
    }

    if (companies === null) {
      getCompanies(loadCompaniesHandler, loadErrorHandler);

      // JSON
      // setCompanies(Companies);
      //
    }

    // Screen resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCompaniesHandler(response) {
    if (response.ok) {
      var responseCompanies = await response.json();
      setCompanies(responseCompanies);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else if (response.status === 404) {
      const error = await response.json();
      toast.error(error.detail, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
    throw new Error("Network response was not ok");
  }

  function loadErrorHandler(error) {}

  function closeFButton() {
    setCloseButton(true);
  }

  return (
    <div>
      <Head>
        <title>Alpha Mining</title>
      </Head>
      {companies === null ? (
        <Spinner />
      ) : (
        <div>
          <div className="grid">
            <div
              className={
                windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
              }
            >
              <Link
                href={{
                  pathname: "/process/classification",
                  query: { menu: "no" }
                }}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    height: "10vh"
                  }}
                >
                  <h5>Clasificación múltiple</h5>
                </div>
              </Link>
            </div>

            <div
              className={
                windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
              }
            >
              <Link
                href={{
                  pathname: "/"
                }}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    height: "10vh"
                  }}
                >
                  <h5>Clustering particional y clasificación</h5>
                </div>
              </Link>
            </div>

            <div className="col-12 xl:col-12">
              <TableCompanies var={companies} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
