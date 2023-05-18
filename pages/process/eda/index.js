import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { LayoutContext } from "./../../../layout/context/layoutcontext";
import styles from "./../../uikit/button/index.module.scss";
// API
import { getMainData } from "../../../api/eda";
// JSON
// import MainDataJson from "./../../../config/mainData.json";

import TableMainData from "../../../components/eda/tablemaindata";
import DescripcionData from "../../../components/eda/descripcionData";
import NullData from "../../../components/eda/nullData";
import ValuesOutliners from "../../../components/eda/valuesOutliers";
import MatrizData from "../../../components/eda/matrizData";
import Spinner from "../../../components/utilities/spinner";

var customEvents = [];

export default function ProcessEda() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { symbol, name, menu } = router.query;

  const [loadSpinner, setLoadSpinner] = useState(true);
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
      subTitle: "API de Alpha Vantage",
      description:
        "Alpha Vantage ofrece una amplia variedad de datos de mercado sobre acciones, bonos, divisas y criptomonedas, todos accesibles a través de su API.",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0"
    });
    customEvents.push({
      status: "Objetivo",
      subTitle: "Todos los datos actualizados al día de hoy",
      description:
        "Hacer un análisis exploratorio de datos con base en información obtenida de Alpha Vantage",
      icon: "pi pi-desktop",
      color: "#673AB7"
    });

    setLoadSpinner(true);
    setCountTask(0);
    setEventsTask(customEvents);
    getMainData(symbol, loadMainDataHandler, loadErrorHandler);

    // JSON
    // setMainData(MainDataJson["Weekly Time Series"]);
    // setLoadSpinner(false);
    //
  }, []);

  async function loadMainDataHandler(response) {
    if (response.ok) {
      var responseMainData = await response.json();
      setMainData(responseMainData["Weekly Time Series"]);
      setLoadSpinner(false);
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

  function finishCharge() {
    console.log("Entre");
    setLoadSpinner(false);
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
          color: "#FF9800"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        setLoadSpinner(true);
        break;
      case 1:
        customEvents.push({
          status: "Paso 2: Identificación de datos faltantes",
          subTitle: "Se obtiene la suma de valores nulos",
          description:
            "Esto es relevante porque los valores faltantes pueden afectar la precisión de los modelos de minería de datos y los resultados obtenidos a partir de ellos.",
          icon: "pi pi-exclamation-circle",
          color: "#607D8B"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        setLoadSpinner(true);
        break;
      case 2:
        customEvents.push({
          status: "Paso 3: Detección de valores atípicos",
          subTitle:
            "Se utilizan histogramas que agrupan los números en rangos.",
          description:
            "La distribución se refiere a cómo se distribuyen los valores en una variable o con qué frecuencia ocurren.",
          icon: "pi pi-chart-bar",
          color: "#9C27B0"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        setLoadSpinner(true);
        break;
      case 3:
        customEvents.push({
          status: "Paso 4: Identificación de relaciones entre pares variables",
          subTitle: "Matriz de correlaciones.",
          description:
            "Una matriz de correlaciones es útil para analizar la relación entre las variables numéricas.",
          icon: "pi pi-map",
          color: "#673AB7"
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
      <div className="grid">
        <div className="col-5">
          <div className="card timeline-demo">
            <h5>Análisis exploratorio de datos</h5>
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

            {mainData !== null && countTask >= 0 ? (
              <TableMainData var={mainData} />
            ) : null}

            {countTask >= 1 ? (
              <DescripcionData var={mainData} methodCharge={finishCharge} />
            ) : null}

            {countTask >= 2 ? <NullData methodCharge={finishCharge} /> : null}

            {countTask >= 3 ? (
              <ValuesOutliners
                symbol={symbol}
                var={mainData}
                methodCharge={finishCharge}
              />
            ) : null}

            {countTask >= 4 ? <MatrizData value={symbol} /> : null}

            {loadSpinner === true ? <Spinner layout="small" /> : null}

            {loadSpinner === false && countTask >= 0 && countTask <= 3 ? (
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

            {loadSpinner === false && countTask >= 4 ? (
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
