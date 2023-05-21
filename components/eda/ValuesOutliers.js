import React, { useEffect, useState } from "react";
import DescribeData from "./DescribeData";
import CandleData from "./CandleData";
import LineData from "./LineData";
// Google Chart
import { Chart } from "react-google-charts";

import Spinner from "../utilities/Spinner";

var objectDataOpen = [];
var objectDataHigh = [];
var objectDataLow = [];
var objectDataClose = [];
var objectDataVolume = [];
var objectDataDividends = [];
var objectDataStock = [];

export default function ValuesOutliners(props) {
  const [valuesOutlinersOpen, setValuesOutlinersOpen] = useState(null);
  const [valuesOutlinersHigh, setValuesOutlinersHigh] = useState(null);
  const [valuesOutlinersLow, setValuesOutlinersLow] = useState(null);
  const [valuesOutlinersClose, setValuesOutlinersClose] = useState(null);
  const [valuesOutlinersVolume, setValuesOutlinersVolume] = useState(null);
  const [valuesOutlinersDividends, setValuesOutlinersDividends] =
    useState(null);
  const [valuesOutlinersStock, setValuesOutlinersStock] = useState(null);

  const [mainData, setMainData] = useState(null);
  const [name, setName] = useState(null);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setValuesOutlinersOpen(null);
    setValuesOutlinersHigh(null);
    setValuesOutlinersLow(null);
    setValuesOutlinersClose(null);
    setValuesOutlinersVolume(null);
    setValuesOutlinersDividends(null);
    setValuesOutlinersStock(null);

    if (props.var !== null && props.name !== null) {
      setMainData(props.var);
      setName(props.name);

      objectDataOpen = [];
      objectDataOpen.push(["Open", "Value"]);
      objectDataHigh = [];
      objectDataHigh.push(["High", "Value"]);
      objectDataLow = [];
      objectDataLow.push(["Low", "Value"]);
      objectDataClose = [];
      objectDataClose.push(["Close", "Value"]);
      objectDataVolume = [];
      objectDataVolume.push(["Volume", "Value"]);
      objectDataDividends = [];
      objectDataDividends.push(["Dividends", "Value"]);
      objectDataStock = [];
      objectDataStock.push(["Stock Splits", "Value"]);

      for (const item in props.var.main_data) {
        var date = props.var.main_data[item]["Date"].split("T");
        objectDataOpen.push([
          date[0],
          props.var.main_data[item]["Open"].toFixed(4)
        ]);
        objectDataHigh.push([
          date[0],
          props.var.main_data[item]["High"].toFixed(4)
        ]);
        objectDataLow.push([
          date[0],
          props.var.main_data[item]["Low"].toFixed(4)
        ]);
        objectDataClose.push([
          date[0],
          props.var.main_data[item]["Close"].toFixed(4)
        ]);
        objectDataVolume.push([date[0], props.var.main_data[item]["Volume"]]);
        objectDataDividends.push([
          date[0],
          props.var.main_data[item]["Dividends"]
        ]);
        objectDataStock.push([
          date[0],
          props.var.main_data[item]["Stock Splits"]
        ]);
      }
      setValuesOutlinersOpen(objectDataOpen);
      setValuesOutlinersHigh(objectDataHigh);
      setValuesOutlinersLow(objectDataLow);
      setValuesOutlinersClose(objectDataClose);
      setValuesOutlinersVolume(objectDataVolume);
      setValuesOutlinersDividends(objectDataDividends);
      setValuesOutlinersStock(objectDataStock);
    }
  }, [props]);

  const optionsOpen = {
    title: "Open",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  const optionsHigh = {
    title: "High",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  const optionsLow = {
    title: "Low",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  const optionsClose = {
    title: "Close",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  const optionsVolume = {
    title: "Volume",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  const optionsDividends = {
    title: "Dividends",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  const optionsStock = {
    title: "Stock Splits",
    legend: { position: "none" },
    colors: ["#763CAD"],
    chartArea: { width: 321 },
    bar: { gap: 0 }
  };

  return (
    <div className="grid pt-5 pl-0 pr-0">
      <div className="col-12 xl:col-12">
        {valuesOutlinersOpen !== null &&
        valuesOutlinersHigh !== null &&
        valuesOutlinersLow !== null &&
        valuesOutlinersClose !== null &&
        valuesOutlinersVolume !== null &&
        valuesOutlinersDividends !== null &&
        valuesOutlinersStock !== null ? (
          <div className="card">
            <h5>Paso 3: Detección de valores atípicos.</h5>
            <p style={{ fontWeight: "bold" }}>
              1) Distribución de variables numéricas.
            </p>
            <p>
              Se pueden utilizar gráficos para tener una idea general de las
              distribuciones de los datos, y se sacan estadísticas para resumir
              los datos. Estas dos estrategias son recomendables y se
              complementan.
            </p>
            <div className="grid">
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersOpen}
                  options={optionsOpen}
                />
              </div>
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersHigh}
                  options={optionsHigh}
                />
              </div>
            </div>

            <div className="grid">
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersLow}
                  options={optionsLow}
                />
              </div>
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersClose}
                  options={optionsClose}
                />
              </div>
            </div>

            <div className="grid">
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersVolume}
                  options={optionsVolume}
                />
              </div>
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersDividends}
                  options={optionsDividends}
                />
              </div>
            </div>

            <div className="grid">
              <div
                className={
                  windowSize.width > 590 ? "col-6 xl:col-6" : "col-12 xl:col-12"
                }
              >
                <Chart
                  chartType="Histogram"
                  width="100%"
                  height="400px"
                  data={valuesOutlinersStock}
                  options={optionsStock}
                />
              </div>
            </div>

            <p>
              En el histograma se observa que Volume tiene valores sesgados a la
              izquierda. Las variables Dividens y Stock Splits presentan valores
              en <strong>cero</strong>.
            </p>

            <DescribeData var={mainData} />
            <CandleData var={mainData} />
            <LineData var={mainData} name={name} />
          </div>
        ) : (
          <div className="col-12 xl:col-12">
            <Spinner layout="small" />
          </div>
        )}
      </div>
    </div>
  );
}
