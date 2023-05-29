import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutContext } from "./../../layout/context/layoutcontext";

export default function Process() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { user, name, menu } = router.query;

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    if (menu === "yes") {
      onMenuToggleProcess(true);
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

  return (
    <div>
      <Head>
        <title>Alpha Mining</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
          }
        >
          <Link
            href={{
              pathname: "/process-improved/eda",
              query: { user: user, name: name, menu: "no" }
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
                height: windowSize.width > 590 ? "25vh" : "15vh"
              }}
            >
              <h5>Análisis Exploratorio de Datos</h5>
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
              pathname: "/process-improved/acp",
              query: { user: user, name: name, menu: "no" }
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
                height: windowSize.width > 590 ? "25vh" : "15vh"
              }}
            >
              <h5>Análisis de Componentes Principales</h5>
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
              pathname: "/process-improved/forecastad",
              query: { user: user, name: name, menu: "no" }
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
                height: windowSize.width > 590 ? "25vh" : "15vh"
              }}
            >
              <h5>Pronóstico con árboles de decisión</h5>
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
              pathname: "/process-improved/forecastba",
              query: { user: user, name: name, menu: "no" }
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
                height: windowSize.width > 590 ? "25vh" : "15vh"
              }}
            >
              <h5>Pronóstico con bosques aleatorios</h5>
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
                height: windowSize.width > 590 ? "25vh" : "15vh"
              }}
            >
              <h5>Clasificación multiple</h5>
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
                height: windowSize.width > 590 ? "25vh" : "15vh"
              }}
            >
              <h5>Clustering particional y clasificación</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
