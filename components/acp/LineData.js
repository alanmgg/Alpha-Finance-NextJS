import React, { useEffect } from "react";
import { useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

var objectData = [["x", "Varianza"]];

export default function LineData(props) {
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setDataValue(null);

    if (props.var !== null) {
      objectData = [["x", "Varianza"]];

      for (const item in props.var.varianza) {
        objectData.push([
          item,
          Number(props.var.varianza[item]["0"].toFixed(4))
        ]);
      }
      setDataValue(objectData);
    }
  }, [props]);

  var options = {
    colors: ["#763CAD"],
    hAxis: {
      title: "Número de componentes"
    },
    vAxis: {
      title: "Varianza acumulada"
    },
    series: {
      0: { curveType: "function" }
    }
  };

  return (
    <div className="pt-5 pl-0 pr-0">
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
