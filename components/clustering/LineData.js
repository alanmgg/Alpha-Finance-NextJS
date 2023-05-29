import React, { useEffect } from "react";
import { useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

var objectData = [["X", "SSE"]];

export default function LineSSEData(props) {
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setDataValue(null);

    if (props.var !== null) {
      objectData = [["X", "SSE"]];

      for (const item in props.var.sse) {
        objectData.push([Number(item), Number(props.var.sse[item].toFixed(4))]);
      }
      setDataValue(objectData);
    }
  }, [props]);

  var options = {
    title: "Elbow Method",
    curveType: "function",
    legend: { position: "bottom" }
  };

  return (
    <div className="pt-3 pl-0 pr-0">
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={dataValue}
        options={options}
      />
    </div>
  );
}
