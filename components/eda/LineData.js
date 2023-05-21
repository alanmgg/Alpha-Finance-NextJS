import React, { useEffect } from "react";
import { useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

var objectData = [["Day", "Open", "Close"]];

export default function LineData(props) {
  const [dataValue, setDataValue] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    setDataValue(null);
    setName(null);

    if (props.var !== null && props.name !== null) {
      objectData = [["Day", "Open", "Close"]];

      for (const item in props.var.main_data) {
        var date = props.var.main_data[item]["Date"].split("T");
        objectData.push([
          date[0],
          Number(props.var.main_data[item]["Open"].toFixed(4)),
          Number(props.var.main_data[item]["Close"].toFixed(4))
        ]);
      }
      setDataValue(objectData);
      setName(props.name);
    }
  }, [props]);

  var options = {
    colors: ["#763CAD", "#D02525"],
    chart: {
      title: name,
      subtitle: "(USD)"
    }
  };

  return (
    <div className="pt-5 pl-0 pr-0">
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
