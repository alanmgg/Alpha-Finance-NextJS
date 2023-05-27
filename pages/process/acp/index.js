import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { LayoutContext } from "./../../../layout/context/layoutcontext";
import styles from "./../../uikit/button/index.module.scss";
// API
import { getAcpData } from "./../../../api/algorithms";
// JSON
import ACPJson from "./../../../config/ACP.json";

import TableMainData from "../../../components/acp/TableMainData";
import MatrizData from "../../../components/acp/MatrizData";
import TableStandardData from "../../../components/acp/TableStandardData";
import MatrizComponents from "../../../components/acp/MatrizComponents";
import VarianzaData from "../../../components/acp/VarianzaData";
import CargasData from "../../../components/acp/CargasData";

var customEvents = [];

export default function ProcessAcp() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { symbol, name, menu } = router.query;

  const [mainData, setMainData] = useState(null);
  const [countTask, setCountTask] = useState(0);
  const [eventsTask, setEventsTask] = useState([]);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    if (menu === "no") {
      onMenuToggleProcess(false);
    }

    customEvents = [];
    customEvents.push({
      status: "Contexto",
      subTitle: "API de Yahoo Finance",
      description:
        "Yahoo Finance ofrece una amplia variedad de datos de mercado sobre acciones, bonos, divisas y criptomonedas. También proporciona informes de noticias con varios puntos de vista sobre diferentes mercados de todo el mundo, todos accesibles a través de la biblioteca yfinance.",
      icon: "pi pi-credit-card",
      color: "#25171A"
    });
    customEvents.push({
      status: "Objetivo",
      subTitle: "Análisis de componentes principales",
      description:
        "Hacer un análisis de componentes principales con base en información obtenida de Yahoo Finance.",
      icon: "pi pi-bolt",
      color: "#4B244A"
    });
    customEvents.push({
      status: "Fuente de datos",
      subTitle: "Datos actualizados al dia de hoy",
      description:
        "De Yahoo Finance se utiliza el Ticker -Etiqueta de cotización- de la acción bursatil.",
      icon: "pi pi-code",
      color: "#533A7B"
    });

    setCountTask(0);
    setEventsTask(customEvents);
    getAcpData(symbol, loadMainDataHandler, loadErrorHandler);

    // JSON
    // setMainData(ACPJson);
    //

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

  async function loadMainDataHandler(response) {
    if (response.ok) {
      var responseMainData = await response.json();
      setMainData(responseMainData);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
    } else if (response.status === 404) {
      const error = await response.json();
    }
    throw new Error("Network response was not ok");
  }

  function loadErrorHandler(error) {}

  function customizedMarker(item) {
    return (
      <span
        className="custom-marker shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  }

  function customizedContent(item) {
    return (
      <Card title={item.status} subTitle={item.subTitle}>
        <p style={{ textAlign: "justify" }}>{item.description}</p>
      </Card>
    );
  }

  function nextTask(count) {
    switch (count) {
      case 0:
        customEvents.push({
          status:
            "Paso 1: Hay evidencia de variables posiblemente correlacionadas",
          subTitle: "",
          description:
            "Se utiliza esta transformación para convertir un conjunto de variables, posiblemente correlacionadas, en un conjunto reducido de variables que ya no guardan correlación.",
          icon: "pi pi-book",
          color: "#6969B3"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 1:
        customEvents.push({
          status: "Paso 2: Se hace una estandarización de los datos",
          subTitle:
            "Transformar los datos a escalas comparables puede evitar este problema",
          description:
            "El objetivo de este paso es estandarizar (escalar o normalizar) el rango de las variables iniciales, para que cada una de éstas contribuya por igual en el análisis.",
          icon: "pi pi-exclamation-circle",
          color: "#25171A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 2:
        customEvents.push({
          status:
            "Pasos 3 y 4: Se calcula la matriz de covarianzas o correlaciones, y se calculan los componentes (eigen-vectores) y la varianza (eigen-valores)",
          subTitle:
            "Esto se hace a partir de la matriz de covarianzas o correlaciones.",
          description:
            "El objetivo es comprender cómo las variables del conjunto de datos varían con respecto a la media entre sí.",
          icon: "pi pi-chart-bar",
          color: "#4B244A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 3:
        customEvents.push({
          status: "Paso 5: Se decide el número de componentes principales",
          subTitle: "",
          description:
            "Se decide el número de componentes mediante una evaluación de las varianzas.",
          icon: "pi pi-map",
          color: "#533A7B"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 4:
        customEvents.push({
          status: "Paso 6: Se examina la proporción de relevancias (cargas)",
          subTitle: "",
          description:
            "La importancia de cada variable se refleja en la magnitud de los valores en los componentes (mayor magnitud es sinónimo de mayor importancia).",
          icon: "pi pi-map",
          color: "#6969B3"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Head>
        <title>Alpha Finance | Mining</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
          <div
            className="card timeline-demo"
            style={{ borderColor: "#F1F1F1", boxShadow: "2px 2px 4px #F1F1F1" }}
          >
            <h5>Análisis de Componentes Principales</h5>
            <Timeline
              value={eventsTask}
              align="alternate"
              className="customized-timeline"
              marker={customizedMarker}
              content={customizedContent}
            />
          </div>
        </div>

        <div
          className={
            windowSize.width > 590 ? "col-7 xl:col-7" : "col-12 xl:col-12"
          }
        >
          <div
            className="card"
            style={{ borderColor: "#F1F1F1", boxShadow: "2px 2px 4px #F1F1F1" }}
          >
            <div>
              <h5>
                {name} ({symbol}).
              </h5>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}
            {countTask >= 1 ? <MatrizData var={mainData} /> : null}
            {countTask >= 2 ? <TableStandardData var={mainData} /> : null}
            {countTask >= 3 ? <MatrizComponents var={mainData} /> : null}
            {countTask >= 4 ? <VarianzaData var={mainData} /> : null}
            {countTask >= 5 ? <CargasData var={mainData} /> : null}

            {countTask >= 0 && countTask <= 4 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                className="pt-5"
              >
                <Button
                  className={styles.google}
                  aria-label="Google"
                  onClick={() => nextTask(countTask)}
                >
                  <span className="flex align-items-center px-2 bg-purple-700 text-white">
                    <i className="pi pi-angle-double-right"></i>
                  </span>
                  <span className="px-3 py-2 flex align-items-center text-white">
                    Siguiente
                  </span>
                </Button>
              </div>
            ) : null}

            {countTask >= 5 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                className="pt-5"
              >
                <Link
                  href={{
                    pathname: "/process",
                    query: { symbol: symbol, name: name, menu: "yes" }
                  }}
                >
                  <Button
                    className={styles.google}
                    aria-label="Google"
                    onClick={() => nextTask(countTask)}
                  >
                    <span className="flex align-items-center px-2 bg-purple-700 text-white">
                      <i className="pi pi-angle-double-left"></i>
                    </span>
                    <span className="px-3 py-2 flex align-items-center text-white">
                      Regresar
                    </span>
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
