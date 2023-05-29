import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function LinePronosticoData(props) {
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setDataValue(null);

    if (props.var !== null) {
      const newData = [["x", "Real", "Estimado"]];

      for (const item in props.var.y_test) {
        const value = Number(props.var.y_test[item]["0"].toFixed(4));
        const value2 = Number(props.var.y_pronostico[item]["0"].toFixed(4));
        newData.push([item, value, value2]);
      }

      setDataValue(newData);
    }
  }, [props]);

  var options = {
    colors: ["#763CAD", "#D02525"],
    chart: {
      title: "Pronóstico"
    }
  };

  return (
    <div className="grid">
      {dataValue !== null ? (
        <div className="col-12 xl:col-12">
          <Chart
            chartType="Line"
            width="100%"
            height="100%"
            data={dataValue}
            options={options}
          />
        </div>
      ) : null}
    </div>
  );
}
