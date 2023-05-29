import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function LineVarianzaData(props) {
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setDataValue(null);

    if (props.var !== null) {
      const newData = [["x", "Varianza"]];

      for (const item in props.var.varianza) {
        const value = Number(props.var.varianza[item]["0"].toFixed(4));
        newData.push([item, value]);
      }

      setDataValue(newData);
    }
  }, [props]);

  var options = {
    colors: ["#763CAD", "#D02525"],
    chart: {
      title: "Número de componentes",
      subtitle: "Varianza acumulada"
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
