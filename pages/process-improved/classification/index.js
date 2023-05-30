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
  getClassificationImprovedData,
  getClassificationPronosticImprovedData
} from "./../../../api/algorithmsImproved";

import TableMainDataForecast from "../../../components/improved/TableMainDataForecast";
import TableMainData from "../../../components/improved/TableMainData";
import NullData from "../../../components/improved/NullData";
import GroupBy from "../../../components/improved/GroupBy";
import DescribeData from "../../../components/improved/DescribeData";
import CorrData from "../../../components/improved/CorrData";
import XData from "../../../components/improved/XData";
import YData from "../../../components/improved/YData";
import ValoresData from "../../../components/improved/ValoresData";
import MatrizClassification from "../../../components/improved/MatrizClassification";
import ImportanciaData from "../../../components/improved/ImportanciaData";
import Pronosticar from "../../../components/improved/Pronosticar";

var customEvents = [];

export default function ForecastBA() {
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
      subTitle: "Clasificación de los datos",
      description:
        "Clasificar los datos de " +
        name +
        "a través de un algoritmo de clasificación multiple.",
      icon: "pi pi-bolt",
      color: "#25171A"
    });
    customEvents.push({
      status: "Fuente de datos",
      subTitle: "Información dada por el usuario",
      description:
        "Se ocupa información obtenida del archivo CSV proporcionado por el usuario.",
      icon: "pi pi-code",
      color: "#4B244A"
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
        getClassificationImprovedData(
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
          status: "Selección de características",
          subTitle: "",
          description:
            "A través de un mapa de calor de identifican posibles variables correlacionadas.",
          icon: "pi pi-book",
          color: "#533A7B"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 2:
        customEvents.push({
          status: "Definición de las variables predictoras y variable clase",
          subTitle: "",
          description:
            "Variables que utilizaremos para la creación de nuestros modelos.",
          icon: "pi pi-chart-bar",
          color: "#25171A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 3:
        customEvents.push({
          status: "Modelo 1",
          subTitle: "Árboles de decisión (AD).",
          description:
            "Se aplicará el algoritmo de árboles de decisión a nuestra dataset.",
          icon: "pi pi-chart-bar",
          color: "#4B244A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 4:
        customEvents.push({
          status: "Modelo 2",
          subTitle: "Bosques aleatorios (BA).",
          description:
            "Se aplicará el algoritmo de bosques aleatorios a nuestra dataset.",
          icon: "pi pi-map",
          color: "#533A7B"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 5:
        customEvents.push({
          status: "Validación",
          subTitle: "",
          description: "Se validan los modelos para conocer la mejor opción.",
          icon: "pi pi-map",
          color: "#25171A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 6:
        customEvents.push({
          status: "Clasificación lista",
          subTitle: "Modelo de clasificación terminado",
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
    getClassificationPronosticImprovedData(
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
        <title>Alpha Mining | Classification</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
          <div className="card timeline-demo">
            <h5>Clasificación múltiple</h5>
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

            {countTask >= 1 ? (
              <div>
                <TableMainData var={mainNewData} />

                <p>Variables nulas: </p>
                <NullData var={mainNewData} />

                <p>Agrupación de datos por variable: </p>
                <GroupBy var={mainNewData} column={column} />

                <p>Descripción de los datos: </p>
                <DescribeData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 2 ? (
              <div className="pt-5">
                <h5>Selección de características.</h5>

                <p>
                  A través de un mapa de calor de identifican posibles variables
                  correlacionadas.
                </p>
                <CorrData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 3 ? (
              <div className="pt-5">
                <h5>
                  Definición de las variables predictoras y variable clase.
                </h5>

                <p>Variables predictorias:</p>
                <XData var={mainNewData} />

                <p>Variable clase:</p>
                <YData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 4 ? (
              <div className="pt-5">
                <h5>Modelo 1: Árboles de decisión (AD).</h5>

                <p>Se muestrán los valores de la predicción del modelo: </p>
                <ValoresData var={mainNewData} />

                <p>Matriz de clasificación: Árbol de decisión:</p>
                <MatrizClassification var={mainNewData} />

                <p>Reporte de la clasificación:</p>
                <pre className="app-code" style={{ fontSize: 12 }}>
                  <code>
                    {"Criterio: "}
                    {mainNewData.variables_ad.criterion}
                    <br />
                    {"Exactitud: "}
                    {mainNewData.variables_ad.exactitud}
                  </code>
                </pre>

                <p>Se muestra la importancia de las variables:</p>
                <ImportanciaData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 5 ? (
              <div className="pt-5">
                <h5>Modelo 2: Bosques aleatorios (BA).</h5>

                <p>Se muestrán los valores de la predicción del modelo: </p>
                <ValoresData var={mainNewData} />

                <p>Matriz de clasificación: Bosques aleatorios:</p>
                <MatrizClassification var={mainNewData} />

                <p>Reporte de la clasificación:</p>
                <pre className="app-code" style={{ fontSize: 12 }}>
                  <code>
                    {"Criterio: "}
                    {mainNewData.variables_ba.criterion}
                    <br />
                    {"Exactitud: "}
                    {mainNewData.variables_ba.exactitud}
                  </code>
                </pre>

                <p>Se muestra la importancia de las variables:</p>
                <ImportanciaData var={mainNewData} />
              </div>
            ) : null}

            {countTask >= 6 ? (
              <div className="pt-5">
                <h5>Validación de los modelos.</h5>

                <p>Se muestra la confianza de cada modelo.</p>
                <pre className="app-code" style={{ fontSize: 12 }}>
                  <code>
                    {"Árboles de decisión: "}
                    {mainNewData.validation.ad}
                    <br />
                    {"Bosques aleatorios: "}
                    {mainNewData.validation.ba}
                  </code>
                </pre>
              </div>
            ) : null}

            {countTask >= 7 ? (
              <div className="pt-5">
                <h5>Nuevas clasificaciones.</h5>
                <p>
                  Escribe los valores para generar una clasificación del
                  dataframe.
                </p>

                <Pronosticar
                  var={mainNewData}
                  method={pronostic}
                  pronostic={pronosticApi}
                />
              </div>
            ) : null}

            {countTask >= 0 && countTask <= 6 ? (
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

            {countTask >= 7 ? (
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
