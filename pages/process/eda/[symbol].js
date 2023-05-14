import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
// API
import { getInformation, getMainData } from "../../../api/eda";

import Tablemaindata from "../../../components/eda/tablemaindata";
import Spinner from "../../../components/utilities/spinner";

export default function ProcessEda() {
  const router = useRouter();
  const { symbol } = router.query;

  const [loadSpinner, setLoadSpinner] = useState(true);
  const [information, setInformation] = useState(null);
  const [mainData, setMainData] = useState(null);

  var customEvents = [
    {
      status: "Contexto",
      subTitle: "API de Alpha Vantage",
      description:
        "Alpha Vantage ofrece una amplia variedad de datos de mercado sobre acciones, bonos, divisas y criptomonedas, todos accesibles a través de su API.",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0"
    },
    {
      status: "Objetivo",
      subTitle: "Todos los datos actualizados al día de hoy",
      description:
        "Hacer un análisis exploratorio de datos con base en información obtenida de Alpha Vantage",
      icon: "pi pi-desktop",
      color: "#673AB7"
    }
  ];

  useEffect(() => {
    setLoadSpinner(true);
    getInformation(symbol, loadInformationHandler, loadErrorHandler);
    getMainData(symbol, loadMainDataHandler, loadErrorHandler);
  }, []);

  async function loadInformationHandler(response) {
    if (response.ok) {
      var responseInformation = await response.json();
      setInformation(responseInformation);
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

  return (
    <div>
      <div className="grid">
        <div className="col-5">
          <div className="card timeline-demo">
            <h5>Análisis exploratorio de datos</h5>
            <Timeline
              value={customEvents}
              align="alternate"
              className="customized-timeline"
              marker={customizedMarker}
              content={customizedContent}
            />
          </div>
        </div>

        <div className="col-7">
          <div className="card">
            {loadSpinner === false && information !== null ? (
              <div>
                <h5>
                  {information.Name} ({information.Symbol}).
                </h5>
                <p style={{ textAlign: "justify" }}>
                  {information.Description}
                </p>
              </div>
            ) : null}

            {loadSpinner === false && information !== null ? (
              <Tablemaindata var={mainData} />
            ) : null}

            {loadSpinner === true ? <Spinner layout="small" /> : null}

            {loadSpinner === false ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                className="pt-5"
              >
                <Button label="Siguiente" className="p-3 text-sl"></Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
