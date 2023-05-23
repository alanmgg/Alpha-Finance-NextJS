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
import { getForecastAdData } from "./../../../api/algorithms";
// JSON
// import ForecastADJson from "./../../../config/ForecastAD.json";

import TableMainData from "../../../components/forecastad/TableMainData";
import NullData from "../../../components/forecastad/NullData";
import LineDataActions from "../../../components/forecastad/LineDataActions";
import Aplication from "../../../components/forecastad/Aplication";
import LineDataPronostico from "../../../components/forecastad/LineDataPronostico";

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
      subTitle: "Pronóstico del precio",
      description:
        "Hacer un pronóstico del precio de las acciones a través de un algoritmo de aprendizaje automático.",
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
    getForecastAdData(symbol, loadMainDataHandler, loadErrorHandler);

    // JSON
    // setMainData(ForecastADJson);
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
          status: "Descripción de la estructura de los datos",
          subTitle: "",
          description:
            "Se observa que los datos son numéricos (flotante y entero).",
          icon: "pi pi-book",
          color: "#6969B3"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 1:
        customEvents.push({
          status: "Gráfica de los precios de las acciones",
          subTitle: "",
          description:
            "Se muestra una gráfica de las acciones de la empresa, además de una tabla con los datos no nulos.",
          icon: "pi pi-chart-bar",
          color: "#25171A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 2:
        customEvents.push({
          status: "Aplicación del algoritmo",
          subTitle: "Se hace la división de los datos.",
          description:
            "Se seleccionan las variables predictoras (X) y la variable a pronosticar (Y) y se entrena el modelo.",
          icon: "pi pi-chart-bar",
          color: "#4B244A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 3:
        customEvents.push({
          status: "Conformación del modelo de pronóstico",
          subTitle: "Gráfica del pronóstico y la importancia",
          description:
            "Se muestra el modelo final y la gráfica del pronóstico terminada.",
          icon: "pi pi-map",
          color: "#533A7B"
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
        <title>Alpha Finance | Forecast AD</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
          <div className="card timeline-demo">
            <h5>Pronóstico con árboles de decisión</h5>
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
          <div className="card">
            <div>
              <h5>
                {name} ({symbol}).
              </h5>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}
            {countTask >= 1 ? <NullData var={mainData} /> : null}
            {countTask >= 2 ? <LineDataActions var={mainData} /> : null}
            {countTask >= 3 ? <Aplication var={mainData} /> : null}
            {countTask >= 4 ? <LineDataPronostico var={mainData} /> : null}

            {countTask >= 0 && countTask <= 3 ? (
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

            {countTask >= 4 ? (
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
