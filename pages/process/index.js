import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutContext } from "./../../layout/context/layoutcontext";

export default function Process() {
  const { onMenuToggleProcess } = useContext(LayoutContext);
  const router = useRouter();
  const { symbol, name, menu } = router.query;

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    if (menu === "yes") {
      onMenuToggleProcess(true);
    }

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

  return (
    <div>
      <Head>
        <title>Alpha Mining</title>
      </Head>

      <div className="grid">
        <div
          className={
            windowSize.width > 590 ? "col-3 xl:col-3" : "col-12 xl:col-12"
          }
        >
          <Link
            href={{
              pathname: "/process/eda",
              query: { symbol: symbol, name: name, menu: "no" }
            }}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "15vh"
              }}
            >
              <h5>Análisis Exploratorio de Datos</h5>
            </div>
          </Link>
        </div>

        <div
          className={
            windowSize.width > 590 ? "col-3 xl:col-3" : "col-12 xl:col-12"
          }
        >
          <Link
            href={{
              pathname: "/process/acp",
              query: { symbol: symbol, name: name, menu: "no" }
            }}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "15vh"
              }}
            >
              <h5>Análisis de Componentes Principales</h5>
            </div>
          </Link>
        </div>

        <div
          className={
            windowSize.width > 590 ? "col-3 xl:col-3" : "col-12 xl:col-12"
          }
        >
          <Link
            href={{
              pathname: "/process/forecastad",
              query: { symbol: symbol, name: name, menu: "no" }
            }}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "15vh"
              }}
            >
              <h5>Pronóstico con árboles de decisión</h5>
            </div>
          </Link>
        </div>

        <div
          className={
            windowSize.width > 590 ? "col-3 xl:col-3" : "col-12 xl:col-12"
          }
        >
          <Link
            href={{
              pathname: "/process/forecastba",
              query: { symbol: symbol, name: name, menu: "no" }
            }}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "15vh"
              }}
            >
              <h5>Pronóstico con bosques aleatorios</h5>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid pt-2">
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>¿Qué es el análisis exploratorio de datos?</h5>
            <p style={{ textAlign: "justify" }}>
              Es una técnica utilizada en la minería de datos que consiste en
              explorar y analizar los datos con el objetivo de comprender su
              naturaleza y detectar patrones, relaciones y anomalías en los
              datos. Es una fase importante en el proceso de minería de datos,
              ya que permite identificar problemas en los datos, como valores
              faltantes, valores atípicos o datos incorrectos.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src="https://i0.wp.com/gonzalezgouveia.com/wp-content/uploads/2020/04/fasesEDAR.png?resize=1080%2C828&ssl=1"
                alt="process-eda"
                width={windowSize.width > 590 ? "500" : "250"}
              />
            </div>
            <br />

            <h5>¿Qué es el análisis de componentes principales?</h5>
            <p style={{ textAlign: "justify" }}>
              Es una técnica de minería de datos utilizada para reducir la
              dimensionalidad de un conjunto de datos manteniendo la mayor
              cantidad posible de información. En términos simples, el PCA busca
              transformar un conjunto de datos con muchas variables (o
              dimensiones) en un conjunto de datos con menos variables (o
              dimensiones) sin perder mucha información. Esto se logra mediante
              la identificación de las componentes principales que explican la
              mayor cantidad de variabilidad en los datos.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src="https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2022-04/whatis_data-mining.webp"
                alt="process-acp"
                width={windowSize.width > 590 ? "500" : "250"}
              />
            </div>
            <br />

            <h5>¿Qué es el pronóstico con árboles de decisión?</h5>
            <p style={{ textAlign: "justify" }}>
              El pronóstico con árboles de decisión es una técnica utilizada en
              el campo del aprendizaje automático y la inteligencia artificial
              para predecir o clasificar valores futuros en función de datos
              históricos y características relevantes. Un árbol de decisión es
              una estructura de datos en forma de árbol en la que cada nodo
              interno representa una característica o atributo, cada rama
              representa una posible respuesta o valor para esa característica,
              y cada hoja representa una predicción o clasificación final.
            </p>
            <p style={{ textAlign: "justify" }}>
              En el contexto del pronóstico, se utiliza un árbol de decisión
              para realizar predicciones o clasificaciones sobre un conjunto de
              datos dado. Para construir un árbol de decisión, se utiliza un
              algoritmo que divide iterativamente los datos en función de las
              características más relevantes para realizar la predicción. Estas
              divisiones se basan en criterios como la ganancia de información o
              la reducción de la impureza en los datos.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src="https://www.plandemejora.com/wp-content/uploads/ejemplo-1-1.png"
                alt="process-forecast-ad"
                width={windowSize.width > 590 ? "500" : "250"}
              />
            </div>
            <br />

            <h5>¿Qué es el pronóstico con bosques aleatorios?</h5>
            <p style={{ textAlign: "justify" }}>
              es una técnica de aprendizaje automático que utiliza conjuntos de
              árboles de decisión para hacer predicciones o clasificaciones. En
              lugar de utilizar un solo árbol de decisión, los bosques
              aleatorios combinan múltiples árboles de decisión para mejorar la
              precisión y la estabilidad de las predicciones.
            </p>
            <p style={{ textAlign: "justify" }}>
              La idea principal detrás de los bosques aleatorios es la
              combinación de la predicción de múltiples modelos débiles, que son
              los árboles de decisión individuales, para obtener una predicción
              más robusta y generalizada.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src="https://www.tibco.com/sites/tibco/files/media_entity/2021-05/random-forest-diagram.svg"
                alt="process-forecast-ba"
                width={windowSize.width > 590 ? "500" : "250"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
