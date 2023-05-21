import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// API
import { getCompanies } from "./../api/dashboard";
// JSON
// import Companies from "./../config/Companies.json";

import TableCompanies from "./../components/dashboard/TableCompanies.js";
import Spinner from "./../components/utilities/Spinner";

export default function Dashboard() {
  const [companies, setCompanies] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const sessionClient = localStorage.getItem("logClient");
    if (sessionClient === null) {
      router.push("/auth/login");
    }

    if (companies === null) {
      getCompanies(loadCompaniesHandler, loadErrorHandler);

      // JSON
      // setCompanies(Companies);
      //
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

  return (
    <div>
      <Head>
        <title>Alpha Finance</title>
      </Head>
      {companies === null ? (
        <Spinner />
      ) : (
        <div>
          <TableCompanies var={companies} />
        </div>
      )}
    </div>
  );
}
