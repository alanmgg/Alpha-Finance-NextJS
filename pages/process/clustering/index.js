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
import { getClusteringData } from "./../../../api/algorithms";
// JSON
// import Clustering from "./../../../config/Clustering.json";

import TableMainData from "../../../components/clustering/TableMainData";
import MatrizData from "../../../components/clustering/MatrizData";
import ModeloOne from "../../../components/clustering/ModeloOne";
import ModeloTwo from "../../../components/clustering/ModeloTwo";

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
      description: "Segmentar datos de clientes de una compañía automotriz.",
      icon: "pi pi-bolt",
      color: "#25171A"
    });
    customEvents.push({
      status: "Fuente de datos",
      subTitle: "Kaggle",
      description: "Segmentation.csv",
      icon: "pi pi-code",
      color: "#4B244A"
    });

    setCountTask(0);
    setEventsTask(customEvents);
    getClusteringData(loadMainDataHandler, loadErrorHandler);

    // JSON
    // setMainData(Clustering);
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
          status: "Modelo 1: Segmentación particional",
          subTitle: "Algoritmo: K-means",
          description:
            "Los clústeres mediante K-means es un aprendizaje no supervisado popular. Se utiliza para encontrar grupos intrínsecos dentro del conjunto de datos sin etiquetar y extraer inferencias de ellos.",
          icon: "pi pi-chart-bar",
          color: "#25171A"
        });
        setEventsTask(customEvents);
        setCountTask(count + 1);
        break;
      case 2:
        customEvents.push({
          status: "Modelo 2: Clasificación múltiple",
          subTitle: "Algoritmo: Bosques aleatorios",
          description:
            "Definición de las variables predictoras y variable clase.",
          icon: "pi pi-chart-bar",
          color: "#4B244A"
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
        <title>Alpha Mining | Clustering</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-5 xl:col-5" : "col-12 xl:col-12"
          }
        >
          <div className="card timeline-demo">
            <h5>Clustering Particional y Clasificación</h5>
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
                La segmentación de clientes es la práctica de dividir una base
                de clientes en grupos de individuos que son similares en formas
                específicas relevantes para el marketing, como la edad, el
                género, los intereses y los hábitos de gasto.
              </p>
              <p>
                Las empresas que emplean la segmentación de clientes operan bajo
                el hecho de que cada cliente es diferente y que sus esfuerzos de
                marketing estarían mejor atendidos si se dirigen a grupos
                específicos y más pequeños con mensajes que esos consumidores
                encontrarían relevantes y los llevarían a comprar algo. Las
                empresas también esperan obtener una comprensión más profunda de
                las preferencias y necesidades de sus clientes con la idea de
                descubrir lo que cada segmento encuentra más valioso para
                adaptar con mayor precisión los materiales de marketing hacia
                ese segmento.
              </p>

              <h5>Contenido.</h5>
              <p>
                Una compañía automotriz tiene planes de ingresar a nuevos
                mercados con sus productos existentes (P1, P2, P3, P4 y P5).
                Después de una intensa investigación de mercado, han deducido
                que el comportamiento del nuevo mercado es similar al de su
                mercado existente.
              </p>
              <p>
                En su mercado existente, el equipo de ventas ha clasificado a
                todos los clientes en 4 segmentos (A, B, C, D). Luego,
                realizaron un alcance y comunicación segmentados para diferentes
                segmentos de clientes. Esta estrategia ha funcionado
                excepcionalmente bien para ellos. Planean utilizar la misma
                estrategia en nuevos mercados y han identificado 2627 nuevos
                clientes potenciales.
              </p>

              <h5>Variables.</h5>
              <ul>
                <li>ID: ID único</li>
                <li>Gender: Sexo del cliente</li>
                <li>Ever_Married: Estado civil del cliente</li>
                <li>Age: Edad del cliente</li>
                <li>Graduated: ¿El cliente es un graduado?</li>
                <li>Profession: Profesión del cliente</li>
                <li>Work_Experience: Experiencia laboral en años</li>
                <li>Spending_Score: Puntuación de gastos</li>
                <li>Family_Size: Tamaño de la familia</li>
                <li>Var_1: Categoría anónima para el cliente</li>
              </ul>
            </div>

            {countTask >= 0 ? <TableMainData var={mainData} /> : null}
            {countTask >= 1 ? <MatrizData var={mainData} /> : null}
            {countTask >= 2 ? <ModeloOne var={mainData} /> : null}
            {countTask >= 3 ? <ModeloTwo var={mainData} /> : null}

            {countTask >= 0 && countTask <= 2 ? (
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

            {countTask >= 3 ? (
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
