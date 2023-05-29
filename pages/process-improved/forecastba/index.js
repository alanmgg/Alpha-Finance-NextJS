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
import {
  getMainImprovedData,
  getForecastBaImprovedData,
  getForecastBaPronosticImprovedData
} from "./../../../api/algorithmsImproved";

import TableMainDataForecast from "../../../components/improved/TableMainDataForecast";
import TableMainData from "../../../components/improved/TableMainData";
import NullData from "../../../components/improved/NullData";
import DescribeData from "../../../components/improved/DescribeData";
import XData from "../../../components/improved/XData";
import YData from "../../../components/improved/YData";
import XTestData from "../../../components/improved/XTestData";
import YPronosticoData from "../../../components/improved/YPronosticoData";
import ValoresData from "../../../components/improved/ValoresData";
import Variables from "../../../components/improved/Variables";
import LinePronosticoData from "../../../components/improved/LinePronosticoData";
import ImportanciaData from "../../../components/improved/ImportanciaData";
import Pronosticar from "../../../components/improved/Pronosticar";

var customEvents = [];

export default function ForecastAD() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { user, name, menu } = router.query;

  const [mainData, setMainData] = useState(null);
  const [mainNewData, setMainNewData] = useState(null);
  const [column, setColumn] = useState(null);
  const [pronosticData, setPronosticData] = useState(null);
  const [pronosticApi, setPronosticApi] = useState(null);
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
      subTitle: "Pronóstico de los datos",
      description:
        "Hacer un pronóstico de los datos de " +
        name +
        " a través de un algoritmo de aprendizaje automático.",
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
    getMainImprovedData(user, name, loadMainDataHandler, loadErrorHandler);

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

  async function loadMainNewDataHandler(response) {
    if (response.ok) {
      var responseMainData = await response.json();
      setMainNewData(responseMainData);
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

  async function loadPronosticDataHandler(response) {
    if (response.ok) {
      var responsePronosticData = await response.json();
      setPronosticApi(responsePronosticData);
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
        getForecastBaImprovedData(
          user,
          name,
          column,
          loadMainNewDataHandler,
          loadErrorHandler
        );
        setCountTask(count + 1);
        break;
      case 1:
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
      case 4:
        customEvents.push({
          status: "Pronóstico listo",
          subTitle: "Modelo de pronóstico terminado",
          description: "Es momento de generar valores y ver magia.",
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

  function selectColumn(value) {
    setColumn(value);
  }

  function pronostic(value) {
    setPronosticData(value);
  }

  function onPronostic() {
    setPronosticApi(null);
    getForecastBaPronosticImprovedData(
      user,
      name,
      column,
      pronosticData,
      loadPronosticDataHandler,
      loadErrorHandler
    );
  }

  return (
    <div>
      <Head>
        <title>Alpha Mining | Forecast BA</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
          <div className="card timeline-demo">
            <h5>Pronóstico con árboles aleatorios</h5>
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

            {countTask >= 0 ? (
              <TableMainDataForecast var={mainData} method={selectColumn} />
            ) : null}

            {countTask >= 1 ? <TableMainData var={mainNewData} /> : null}

            {countTask >= 2 ? (
              <div className="pt-5">
                <h5>Descripción de la estructura de los datos.</h5>

                <NullData var={mainNewData} />
                <DescribeData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 3 ? (
              <div className="pt-5">
                <h5>Aplicación del algoritmo</h5>
                <p>
                  Se seleccionan las variables predictoras (X) y la variable a
                  pronosticar (Y). Primero la variable predictoria (X).
                </p>

                <XData var={mainNewData} />

                <p>
                  Segundo la variable a pronosticar (Y), esta formada de Close.
                </p>

                <YData var={mainNewData} />

                <p>
                  Se hace la división de los datos. En variables de
                  entrenamiento y variables iniciales. A continuación se muestra
                  las variables iniciales.
                </p>

                <XTestData var={mainNewData} />

                <p>Se entrena el modelo.</p>

                <YPronosticoData var={mainNewData} />

                <p>
                  Comprobamos que nuestro modelo esta entrenado comparando los
                  valores iniciales con el pronostico.
                </p>

                <ValoresData var={mainNewData} />

                <p>La información del algoritmo se muestra a continuación:</p>

                <Variables var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 4 ? (
              <div className="pt-5">
                <h5>Conformación del modelo de pronóstico.</h5>
                <ul>
                  <li>
                    Se tiene un Score de{" "}
                    {mainNewData.variables.score.toFixed(4)}, que indica que el
                    pronóstico del precio de cierre de la acción se logrará con
                    un {mainNewData.variables.score.toFixed(4) * 100}% de
                    efectividad.
                  </li>
                  <li>
                    Además, los pronósticos del modelo final se alejan en
                    promedio {mainNewData.variables.mse.toFixed(2)} y{" "}
                    {mainNewData.variables.rmse.toFixed(2)} unidades del valor
                    real, esto es, MSE y RMSE, respectivamente.
                  </li>
                </ul>

                <LinePronosticoData var={mainNewData} />

                <p>Se muestra la importancia del modelo:</p>

                <ImportanciaData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 5 ? (
              <div className="pt-5">
                <h5>Pronóstico listo.</h5>
                <p>
                  Escribe los valores para generar un pronóstico del dataframe
                </p>

                <Pronosticar
                  var={mainNewData}
                  method={pronostic}
                  pronostic={pronosticApi}
                />
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

                <Button
                  className={styles.twitter}
                  aria-label="Google"
                  onClick={() => onPronostic()}
                  style={{ marginLeft: 3 }}
                >
                  <span className="flex align-items-center px-2 bg-blue-500 text-white">
                    <i className="pi pi-chart-bar"></i>
                  </span>
                  <span className="px-3 py-2 flex align-items-center text-white">
                    Pronosticar
                  </span>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
