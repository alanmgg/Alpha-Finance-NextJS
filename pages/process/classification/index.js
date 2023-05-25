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
import { getForecastBaData } from "./../../../api/algorithms";
// JSON
import ClassificationADBAJson from "./../../../config/ClassificationADBA.json";

import TableMainData from "../../../components/classification/TableMainData";
import MatrizData from "../../../components/classification/MatrizData";
import Variables from "../../../components/classification/Variables";
import ModeloOne from "../../../components/classification/ModeloOne";

var customEvents = [];

export default function ForecastBA() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { menu } = router.query;

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
      subTitle: "",
      description:
        "Clasificar los exámenes de cardiotocograma que fueron clasificados en tres clases: Normal, Sospecha y Patológico.",
      icon: "pi pi-bolt",
      color: "#25171A"
    });
    customEvents.push({
      status: "Fuente de datos",
      subTitle: "Kaggle",
      description:
        "https://www.kaggle.com/datasets/ pablomgomez21/drugs-a-b-c-x-y-for-decision-trees",
      icon: "pi pi-code",
      color: "#4B244A"
    });

    setCountTask(0);
    setEventsTask(customEvents);
    // getForecastBaData(symbol, loadMainDataHandler, loadErrorHandler);

    // JSON
    setMainData(ClassificationADBAJson);
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
      case 1:
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
      case 2:
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
        <title>Alpha Finance | Classification</title>
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
              <h5>Contexto.</h5>
              <p>
                Imagina que eres un investigador médico que recopila datos para
                un estudio. Ha recopilado datos sobre un conjunto de pacientes,
                todos los cuales sufrían de la misma enfermedad. Durante el
                curso de su tratamiento, cada paciente respondió a uno de los 5
                medicamentos, Medicamento A, Medicamento B, Medicamento c,
                Medicamento x e y.
              </p>
              <p>
                Parte de su trabajo es construir un modelo para averiguar qué
                medicamento podría ser apropiado para un futuro paciente con la
                misma enfermedad. Las características de este conjunto de datos
                son la edad, el sexo, la presión arterial y el colesterol de los
                pacientes, y el objetivo es el medicamento al que respondió cada
                paciente.
              </p>
              <p>
                Es un ejemplo de clasificador multiclase y puede usar la parte
                de entrenamiento del conjunto de datos para crear un árbol de
                decisión y, a continuación, usarlo para predecir la clase de un
                paciente desconocido o para prescribir un medicamento a un nuevo
                paciente.
              </p>

              <h5>Datos.</h5>
              <p>
                El conjunto de datos contiene 200 registros de características,
                que luego fueron clasificados por expertos en 5 clases:
              </p>
              <ul>
                <li>Drug A</li>
                <li>Drug B</li>
                <li>Drug C</li>
                <li>Drug X</li>
                <li>Drug Y</li>
              </ul>

              <h5>Variables.</h5>
              <ul>
                <li>Age: Edad del paciente</li>
                <li>Sex: Sexo del paciente</li>
                <li>BP: Presión sanguínea</li>
                <li>Cholesterol: Nivel de colesterol</li>
                <li>Na_to_K: Sodio - Potasio</li>
                <li>Drug: Medicamento que funcionó con ese paciente</li>
              </ul>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}
            {countTask >= 1 ? <MatrizData var={mainData} /> : null}
            {countTask >= 2 ? <Variables var={mainData} /> : null}
            {countTask >= 3 ? <ModeloOne var={mainData} /> : null}
            {/* {countTask >= 4 ? <LineDataPronostico var={mainData} /> : null} */}

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
                    pathname: "/",
                    query: { menu: "yes" }
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
