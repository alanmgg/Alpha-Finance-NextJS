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

    if (props.var !== null) {
      for (const item in props.var.main_data) {
        if (
          Number(props.var.main_data[item]["Open"].toFixed(4)) > maxValueOpen
        ) {
          maxValueOpen = Number(props.var.main_data[item]["Open"].toFixed(4));
        }
        if (
          Number(props.var.main_data[item]["High"].toFixed(4)) > maxValueHigh
        ) {
          maxValueHigh = Number(props.var.main_data[item]["High"].toFixed(4));
        }
        if (Number(props.var.main_data[item]["Low"].toFixed(4)) > maxValueLow) {
          maxValueLow = Number(props.var.main_data[item]["Low"].toFixed(4));
        }
        if (
          Number(props.var.main_data[item]["Close"].toFixed(4)) > maxValueClose
        ) {
          maxValueClose = Number(props.var.main_data[item]["Close"].toFixed(4));
        }
        if (
          Number(props.var.main_data[item]["Volume"].toFixed(4)) >
          maxValueVolume
        ) {
          maxValueVolume = Number(
            props.var.main_data[item]["Volume"].toFixed(4)
          );
        }
      }

      let minValueOpen = maxValueOpen;
      let minValueHigh = maxValueHigh;
      let minValueLow = maxValueLow;
      let minValueClose = maxValueClose;
      let minValueVolume = maxValueVolume;

      for (const item in props.var.main_data) {
        if (
          Number(props.var.main_data[item]["Open"].toFixed(4)) < minValueOpen
        ) {
          minValueOpen = Number(props.var.main_data[item]["Open"].toFixed(4));
        }
        if (
          Number(props.var.main_data[item]["High"].toFixed(4)) < minValueHigh
        ) {
          minValueHigh = Number(props.var.main_data[item]["High"].toFixed(4));
        }
        if (Number(props.var.main_data[item]["Low"].toFixed(4)) < minValueLow) {
          minValueLow = Number(props.var.main_data[item]["Low"].toFixed(4));
        }
        if (
          Number(props.var.main_data[item]["Close"].toFixed(4)) < minValueClose
        ) {
          minValueClose = Number(props.var.main_data[item]["Close"].toFixed(4));
        }
        if (
          Number(props.var.main_data[item]["Volume"].toFixed(4)) <
          minValueVolume
        ) {
          minValueVolume = Number(
            props.var.main_data[item]["Volume"].toFixed(4)
          );
        }
      }

      let topOpen = maxValueOpen + 50;
      let topHigh = maxValueHigh + 50;
      let topLow = maxValueLow + 50;
      let topClose = maxValueClose + 50;
      let topVolume = maxValueVolume + 3500;

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
    colors: ["#763CAD"]
  };

  return (
    <div className="pt-3 pl-0 pr-0">
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
