import React, { useEffect } from "react";
import { useState } from "react";
import TableMainDropData from "./TableMainDropData";
import Spinner from "../utilities/Spinner";
// Google Chart
import { Chart } from "react-google-charts";

var objectData = [["Fecha", "Open", "High", "Low", "Close"]];

export default function LineDataActions(props) {
  const [mainDataDrop, setMainDataDrop] = useState(null);
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setDataValue(null);

    if (props.var !== null) {
      objectData = [["Fecha", "Open", "High", "Low", "Close"]];

      for (const item in props.var.main_data_drop) {
        var date = props.var.main_data_drop[item]["Date"].split("T");
        objectData.push([
          date[0],
          Number(props.var.main_data_drop[item]["Open"].toFixed(4)),
          Number(props.var.main_data_drop[item]["High"].toFixed(4)),
          Number(props.var.main_data_drop[item]["Low"].toFixed(4)),
          Number(props.var.main_data_drop[item]["Close"].toFixed(4))
        ]);
      }
      setDataValue(objectData);
      setMainDataDrop(props.var);
    }
  }, [props]);

  var options = {
    vAxis: {
      title: "Precio de las acciones"
    },
    series: {
      0: { curveType: "function" },
      1: { curveType: "function" },
      2: { curveType: "function" },
      3: { curveType: "function" },
      4: { curveType: "function" }
    }
  };

  return (
    <div className="grid pt-5">
      {mainDataDrop !== null && dataValue !== null ? (
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Gráfica de los precios de las acciones.</h5>

            <Chart
              chartType="LineChart"
              width="100%"
              height="100%"
              data={dataValue}
              options={options}
            />

            <TableMainDropData var={mainDataDrop} />
          </div>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
