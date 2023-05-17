import React, { useEffect, useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

var objectField = ["day", "a", "b", "c", "d"];
var objectDataOpen = ["Open", 0];
var objectDataHigh = ["High", 0];
var objectDataLow = ["Low", 0];
var objectDataClose = ["Close", 0];
var objectDataVolume = ["Volume", 0];

var maxValueOpen = 0;
var maxValueHigh = 0;
var maxValueLow = 0;
var maxValueClose = 0;
var maxValueVolume = 0;

export default function CandleData(props) {
  const [valuesOutlinersOpen, setValuesOutlinersOpen] = useState(null);
  const [valuesOutlinersHigh, setValuesOutlinersHigh] = useState(null);
  const [valuesOutlinersLow, setValuesOutlinersLow] = useState(null);
  const [valuesOutlinersClose, setValuesOutlinersClose] = useState(null);
  const [valuesOutlinersVolume, setValuesOutlinersVolume] = useState(null);

  useEffect(() => {
    setValuesOutlinersOpen(null);
    setValuesOutlinersHigh(null);
    setValuesOutlinersLow(null);
    setValuesOutlinersClose(null);
    setValuesOutlinersVolume(null);

    objectDataOpen = ["Open", 0];
    objectDataHigh = ["High", 0];
    objectDataLow = ["Low", 0];
    objectDataClose = ["Close", 0];
    objectDataVolume = ["Volume", 0];

    if (props.var !== undefined) {
      for (const item in props.var) {
        if (Number(props.var[item]["1. open"]) > maxValueOpen) {
          maxValueOpen = Number(props.var[item]["1. open"]);
        }
        if (Number(props.var[item]["2. high"]) > maxValueHigh) {
          maxValueHigh = Number(props.var[item]["2. high"]);
        }
        if (Number(props.var[item]["3. low"]) > maxValueLow) {
          maxValueLow = Number(props.var[item]["3. low"]);
        }
        if (Number(props.var[item]["4. close"]) > maxValueClose) {
          maxValueClose = Number(props.var[item]["4. close"]);
        }
        if (Number(props.var[item]["5. volume"]) > maxValueVolume) {
          maxValueVolume = Number(props.var[item]["5. volume"]);
        }
      }

      let minValueOpen = maxValueOpen;
      let minValueHigh = maxValueHigh;
      let minValueLow = maxValueLow;
      let minValueClose = maxValueClose;
      let minValueVolume = maxValueVolume;

      for (const item in props.var) {
        if (Number(props.var[item]["1. open"]) < minValueOpen) {
          minValueOpen = Number(props.var[item]["1. open"]);
        }
        if (Number(props.var[item]["2. high"]) < minValueHigh) {
          minValueHigh = Number(props.var[item]["2. high"]);
        }
        if (Number(props.var[item]["3. low"]) < minValueLow) {
          minValueLow = Number(props.var[item]["3. low"]);
        }
        if (Number(props.var[item]["4. close"]) < minValueClose) {
          minValueClose = Number(props.var[item]["4. close"]);
        }
        if (Number(props.var[item]["5. volume"]) < minValueVolume) {
          minValueVolume = Number(props.var[item]["5. volume"]);
        }
      }

      let topOpen = maxValueOpen + 50;
      let topHigh = maxValueHigh + 50;
      let topLow = maxValueLow + 50;
      let topClose = maxValueClose + 50;
      let topVolume = maxValueVolume + 2500;

      objectDataOpen.push(minValueOpen, maxValueOpen, topOpen);
      objectDataHigh.push(minValueHigh, maxValueHigh, topHigh);
      objectDataLow.push(minValueLow, maxValueLow, topLow);
      objectDataClose.push(minValueClose, maxValueClose, topClose);
      objectDataVolume.push(minValueVolume, maxValueVolume, topVolume);
      const arrayOfArraysOpen = [objectField, objectDataOpen];
      const arrayOfArraysHigh = [objectField, objectDataHigh];
      const arrayOfArraysLow = [objectField, objectDataLow];
      const arrayOfArraysClose = [objectField, objectDataClose];
      const arrayOfArraysVolume = [objectField, objectDataVolume];

      setValuesOutlinersOpen(arrayOfArraysOpen);
      setValuesOutlinersHigh(arrayOfArraysHigh);
      setValuesOutlinersLow(arrayOfArraysLow);
      setValuesOutlinersClose(arrayOfArraysClose);
      setValuesOutlinersVolume(arrayOfArraysVolume);
    }
  }, [props]);

  const options = {
    legend: "none",
    orientation: "vertical",
    colors: ["#22C597"]
  };

  return (
    <div className="pt-5 pl-0 pr-0">
      <p style={{ fontWeight: "bold" }}>
        3) Diagramas para detectar posibles valores atípicos.
      </p>
      <p>
        Se pueden generar diagramas de cajas para detectar valores atípicos.
      </p>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={valuesOutlinersOpen}
        options={options}
      />

      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={valuesOutlinersHigh}
        options={options}
      />

      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={valuesOutlinersLow}
        options={options}
      />

      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={valuesOutlinersClose}
        options={options}
      />

      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={valuesOutlinersVolume}
        options={options}
      />

      <p>
        Se observa que en Volume se tienen valores atípicos que están lejos de
        los otros valores.
      </p>
    </div>
  );
}
