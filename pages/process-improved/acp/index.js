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
import { getAcpImprovedData } from "./../../../api/algorithmsImproved";

import TableMainData from "../../../components/improved/TableMainData";
import CorrData from "../../../components/improved/CorrData";
import MatrizEstandarizada from "../../../components/improved/MatrizEstandarizada";
import PCAComponents from "../../../components/improved/PCAComponents";
import VarianzaData from "../../../components/improved/VarianzaData";
import LineVarianzaData from "../../../components/improved/LineVarianzaData";
import Cargas from "../../../components/improved/Cargas";
import CargasData from "../../../components/improved/CargasData";

var customEvents = [];

export default function ProcessAcp() {
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
      subTitle: "Análisis de componentes principales",
      description:
        "Hacer un análisis de componentes principales con base en información obtenida de " +
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
    getAcpImprovedData(user, name, loadMainDataHandler, loadErrorHandler);

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
        <title>Alpha Mining | ACP</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
          <div className="card timeline-demo">
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
          <div className="card">
            <div>
              <h5>{name}</h5>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}

            {countTask >= 1 ? (
              <div className="pt-5">
                <h5>
                  Paso 1: Hay evidencia de variables posiblemente
                  correlacionadas.
                </h5>

                <CorrData var={mainData} />
              </div>
            ) : null}

            {countTask >= 2 ? (
              <div className="pt-5">
                <h5>Paso 2: Se hace una estandarización de los datos.</h5>

                <MatrizEstandarizada var={mainData} />
              </div>
            ) : null}

            {countTask >= 3 ? (
              <div className="pt-5">
                <h5>
                  Pasos 3 y 4: Se calcula la matriz de covarianzas o
                  correlaciones, y se calculan los componentes (eigen-vectores)
                  y la varianza (eigen-valores).
                </h5>

                <PCAComponents var={mainData} />
              </div>
            ) : null}

            {countTask >= 4 ? (
              <div className="pt-5">
                <h5>Paso 5: Se decide el número de componentes principales.</h5>
                <ul>
                  <li>
                    Se calcula el porcentaje de relevancia, es decir, entre el
                    75 y 90% de varianza total.
                  </li>
                  <li>
                    Se identifica mediante una gráfica el grupo de componentes
                    con mayor varianza.
                  </li>
                </ul>

                <VarianzaData var={mainData} />
                <LineVarianzaData var={mainData} />
              </div>
            ) : null}

            {countTask >= 5 ? (
              <div className="pt-5">
                <h5>
                  Paso 6: Se examina la proporción de relevancias (cargas).
                </h5>
                <p>
                  La importancia de cada variable se refleja en la magnitud de
                  los valores en los componentes (mayor magnitud es sinónimo de
                  mayor importancia).
                </p>
                <p>
                  Se revisan los valores absolutos de los componentes
                  principales seleccionados. Cuanto mayor sea el valor absoluto,
                  más importante es esa variable en el componente principal.
                </p>

                <Cargas var={mainData} />
                <CargasData var={mainData} />
              </div>
            ) : null}

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
