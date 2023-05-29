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
import { getEdaImprovedData } from "./../../../api/algorithmsImproved";

import TableMainData from "../../../components/improved/TableMainData";
import DescripcionData from "../../../components/improved/DescriptionData";
import NullData from "../../../components/improved/NullData";
import DescribeData from "../../../components/improved/DescribeData";
import CorrData from "../../../components/improved/CorrData";
// import MatrizData from "../../../components/improved/MatrizData";

var customEvents = [];

export default function ProcessEda() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { user, name, menu } = router.query;

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
      status: "Objetivo",
      subTitle: "Análisis exploratorio de datos",
      description:
        "Hacer un análisis exploratorio de datos con base en información obtenida de " +
        name,
      icon: "pi pi-bolt",
      color: "#4B244A"
    });
    customEvents.push({
      status: "Fuente de datos",
      subTitle: "Información dada por el usaurio",
      description:
        "Se ocupa información obtenida del archivo CSV proporcionado por el usuario.",
      icon: "pi pi-code",
      color: "#533A7B"
    });

    setCountTask(0);
    setEventsTask(customEvents);
    getEdaImprovedData(user, name, loadMainDataHandler, loadErrorHandler);

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
        <title>Alpha Mining | EDA</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
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

        <div
          className={
            windowSize.width > 590 ? "col-7 xl:col-7" : "col-12 xl:col-12"
          }
        >
          <div className="card">
            <div>
              <h5>{name}</h5>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}

            {countTask >= 1 ? (
              <div className="pt-5">
                <h5>Paso 1: Descripción de la estructura de los datos.</h5>
                <p>
                  La cantidad de filas y columnas que tiene el conjunto de
                  datos:
                </p>

                <DescripcionData var={mainData} />

                <p>
                  Se observa que los datos son numéricos (flotante y entero).
                </p>
              </div>
            ) : null}

            {countTask >= 2 ? (
              <div className="pt-5">
                <h5>Paso 2: Identificación de datos faltantes.</h5>
                <p>
                  Regresa la suma de todos los valores nulos en cada variable:
                </p>

                <NullData var={mainData} />
              </div>
            ) : null}

            {countTask >= 3 ? (
              <div className="pt-3">
                <h5>Paso 3: Detección de valores atípicos.</h5>
                <p>
                  Se pueden utilizar gráficos para tener una idea general de las
                  distribuciones de los datos, y se sacan estadísticas para
                  resumir los datos. Estas dos estrategias son recomendables y
                  se complementan.
                </p>
                <p>
                  Se sacan estadísticas que muestra un resumen de las variables
                  numéricas.
                </p>

                <DescribeData var={mainData} />

                <ul>
                  <li>
                    Se incluye un recuento, media, desviación, valor mínimo,
                    valor máximo, percentil inferior (25%), 50% y percentil
                    superior (75%).
                  </li>
                  <li>
                    Por defecto, el percentil 50 es lo mismo que la mediana.
                  </li>
                  <li>
                    Se observa que para cada variable, el recuento también ayuda
                    a identificar variables con valores nulos o vacios.
                  </li>
                </ul>
              </div>
            ) : null}

            {countTask >= 4 ? (
              <div className="pt-3">
                <h5>
                  Paso 4: Identificación de relaciones entre pares variables.
                </h5>
                <p>
                  Regresa la suma de todos los valores nulos en cada variable:
                </p>

                <CorrData var={mainData} />
              </div>
            ) : null}

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
                    pathname: "/process-improved",
                    query: { user: user, name: name, menu: "yes" }
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
