import React, { useEffect } from "react";
import { useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

var objectData = [["Day", "Open", "Close"]];

export default function LineData(props) {
  const [symbol, setSymbol] = useState(null);
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setSymbol(null);
    setDataValue(null);
  }, []);

  useEffect(() => {
    if (props.var !== undefined) {
      setSymbol(props.value);
      objectData = [["Day", "Open", "Close"]];

      for (const item in props.var) {
        objectData.push([
          item,
          Number(props.var[item]["1. open"]),
          Number(props.var[item]["4. close"])
        ]);
      }
      setDataValue(objectData);
    }
  }, [props]);

  var options = {
    colors: ["#22C597", "#C89FA3"],
    chart: {
      title: symbol,
      subtitle: "(USD)"
    }
  };

  return (
    <div className="pt-5 pl-0 pr-0 pb-0">
      <p style={{ fontWeight: "bold" }}>
        4) Se genera una gráfica para variables categóricas.
      </p>

      <Chart
        chartType="Line"
        width="100%"
        height="100%"
        data={dataValue}
        options={options}
      />
    </div>
  );
}
