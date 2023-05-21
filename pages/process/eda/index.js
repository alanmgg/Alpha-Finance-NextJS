import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { LayoutContext } from "./../../../layout/context/layoutcontext";
import styles from "./../../uikit/button/index.module.scss";
// API
import { getEdaData } from "./../../../api/algorithms";
// JSON
// import EDAJson from "./../../../config/EDA.json";

import TableMainData from "./../../../components/eda/TableMainData";
import DescripcionData from "../../../components/eda/DescripcionData";
import NullData from "../../../components/eda/NullData";
import ValuesOutliners from "../../../components/eda/ValuesOutliers";
import MatrizData from "../../../components/eda/MatrizData";

var customEvents = [];

export default function ProcessEda() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { symbol, name, menu } = router.query;

  const [mainData, setMainData] = useState(null);
  const [countTask, setCountTask] = useState(0);
  const [eventsTask, setEventsTask] = useState([]);

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
      subTitle: "Análisis exploratorio de datos",
      description:
        "Hacer un análisis exploratorio de datos con base en información obtenida de Yahoo Finance.",
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
    getEdaData(symbol, loadMainDataHandler, loadErrorHandler);

    // JSON
    // setMainData(EDAJson);
    //

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
          status: "Paso 1: Descripción de la estructura de los datos",
          subTitle:
            "Forma (dimensiones) del DataFrame y tipos de datos (variables)",
          description:
            "Al tener una estructura adecuada, se pueden identificar patrones y relaciones que de otra manera podrían haber pasado desapercibidos.",
          icon: "pi pi-book",
          color: "#6969B3"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 1:
        customEvents.push({
          status: "Paso 2: Identificación de datos faltantes",
          subTitle: "Se obtiene la suma de valores nulos",
          description:
            "Esto es relevante porque los valores faltantes pueden afectar la precisión de los modelos de minería de datos y los resultados obtenidos a partir de ellos.",
          icon: "pi pi-exclamation-circle",
          color: "#25171A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 2:
        customEvents.push({
          status: "Paso 3: Detección de valores atípicos",
          subTitle:
            "Se utilizan histogramas que agrupan los números en rangos.",
          description:
            "La distribución se refiere a cómo se distribuyen los valores en una variable o con qué frecuencia ocurren.",
          icon: "pi pi-chart-bar",
          color: "#4B244A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 3:
        customEvents.push({
          status: "Paso 4: Identificación de relaciones entre pares variables",
          subTitle: "Matriz de correlaciones.",
          description:
            "Una matriz de correlaciones es útil para analizar la relación entre las variables numéricas.",
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
        <title>Alpha Finance | EDA</title>
      </Head>

      <div className="grid">
        <div className="col-5">
          <div className="card timeline-demo">
            <h5>Análisis Exploratorio de Datos</h5>
            <Timeline
              value={eventsTask}
              align="alternate"
              className="customized-timeline"
              marker={customizedMarker}
              content={customizedContent}
            />
          </div>
        </div>

        <div className="col-7">
          <div className="card">
            <div>
              <h5>
                {name} ({symbol}).
              </h5>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}
            {countTask >= 1 ? <DescripcionData var={mainData} /> : null}
            {countTask >= 2 ? <NullData var={mainData} /> : null}
            {countTask >= 3 ? (
              <ValuesOutliners var={mainData} name={name} />
            ) : null}
            {countTask >= 4 ? <MatrizData var={mainData} /> : null}

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
