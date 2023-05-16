import React, { useEffect, useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

var objectOpen = [];
var objectHigh = [];
var objectLow = [];
var objectClose = [];
var objectVolume = [];

var objectDataOpen = [];
var objectDataHigh = [];
var objectDataLow = [];
var objectDataClose = [];
var objectDataVolume = [];

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

    if (props.var !== undefined) {
      objectOpen = [];
      objectOpen.push("day");
      objectHigh = [];
      objectHigh.push("day");
      objectLow = [];
      objectLow.push("day");
      objectClose = [];
      objectClose.push("day");
      objectVolume = [];
      objectVolume.push("day");

      objectDataOpen = [];
      objectDataOpen.push("Open");
      objectDataHigh = [];
      objectDataHigh.push("High");
      objectDataLow = [];
      objectDataLow.push("Low");
      objectDataClose = [];
      objectDataClose.push("Close");
      objectDataVolume = [];
      objectDataVolume.push("Volume");

      for (const item in props.var) {
        objectOpen.push(item);
        objectHigh.push(item);
        objectLow.push(item);
        objectClose.push(item);
        objectVolume.push(item);
        objectDataOpen.push(Number(props.var[item]["1. open"]));
        objectDataHigh.push(Number(props.var[item]["2. high"]));
        objectDataLow.push(Number(props.var[item]["3. low"]));
        objectDataClose.push(Number(props.var[item]["4. close"]));
        objectDataVolume.push(Number(props.var[item]["5. volume"]));
      }

      const arrayOfArraysOpen = [objectOpen, objectDataOpen];
      const arrayOfArraysHigh = [objectHigh, objectDataHigh];
      const arrayOfArraysLow = [objectLow, objectDataLow];
      const arrayOfArraysClose = [objectClose, objectDataClose];
      const arrayOfArraysVolume = [objectVolume, objectDataVolume];

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
    <div className="pt-3">
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
    </div>
  );
}
