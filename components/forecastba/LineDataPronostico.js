import React, { useEffect } from "react";
import { useState } from "react";
import Importancia from "./Importancia";
import Spinner from "./../utilities/Spinner";
// Google Chart
import { Chart } from "react-google-charts";

var objectData = [["X", "Real", "Estimado"]];

export default function LineDataPronostico(props) {
  const [mainData, setMainData] = useState(null);
  const [variables, setVariables] = useState(null);
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    setDataValue(null);

    if (props.var !== null) {
      objectData = [["X", "Real", "Estimado"]];

      for (const item in props.var.y_test) {
        objectData.push([
          item,
          Number(props.var.y_test[item]["0"].toFixed(4)),
          Number(props.var.y_pronostico[item]["0"].toFixed(4))
        ]);
      }
      setDataValue(objectData);
      setVariables(props.var.variables);
      setMainData(props.var);
    }
  }, [props]);

  var options = {
    vAxis: {
      title: "Pronóstico de las acciones"
    },
    series: {
      0: { curveType: "function" },
      1: { curveType: "function" }
    }
  };

  return (
    <div className="grid pt-5">
      {mainData !== null && dataValue !== null && variables !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Conformación del modelo de pronóstico.</h5>
            <ul>
              <li>
                Se tiene un Score de {variables.score.toFixed(4)}, que indica
                que el pronóstico del precio de cierre de la acción se logrará
                con un {variables.score.toFixed(4) * 100}% de efectividad.
              </li>
              <li>
                Además, los pronósticos del modelo final se alejan en promedio{" "}
                {variables.mse.toFixed(2)} y {variables.rmse.toFixed(2)}{" "}
                unidades del valor real, esto es, MSE y RMSE, respectivamente.
              </li>
            </ul>

            <Chart
              chartType="LineChart"
              width="100%"
              height="100%"
              data={dataValue}
              options={options}
            />

            <p className="p-3">Se muestra la importancia del modelo:</p>

            <Importancia var={mainData} />
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
