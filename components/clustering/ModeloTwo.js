import React, { useState, useEffect } from "react";
import TableXData from "./TableXData";
import TableYData from "./TableYData";
import ClasificacionFinal from "./ClasificacionFinal";
import ValoresBAData from "./ValoresBAData";
import MatrizClassification from "./MatrizClasificacion";
import Importancia from "./Importancia";
import Validation from "./Validation";
import Spinner from "./../utilities/Spinner";

export default function ModeloOne(props) {
  const [mainData, setMainData] = useState(null);
  const [variables, SetVariables] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setMainData(props.var);
      SetVariables(props.var.variables);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Modelo 2: Clasificación múltiple.</h5>
            <h6>Algoritmo: Bosques aleatorios.</h6>
            <p>
              Definición de las variables predictoras y variable clase. Se
              muestra la variables predictorias:{" "}
            </p>

            <TableXData var={mainData} />

            <p className="mt-3">Se muestra la variable clase: </p>
            <TableYData var={mainData} />

            <p className="mt-3">Clasificación final: </p>
            <ClasificacionFinal var={mainData} />

            <p className="mt-3">Se muestra la validación de las variables: </p>
            <ValoresBAData var={mainData} />

            <h6>Matriz de clasificación: Bosques aleatorios.</h6>
            <MatrizClassification var={mainData} />

            <p className="mt-3">Reporte de la clasificación:</p>
            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                {"Criterio: "}
                {variables.criterion}
                <br />
                {"Exactitud: "}
                {variables.exactitud}
              </code>
            </pre>

            <p className="mt-3">Se muestra la importancia de cada variable: </p>
            <Importancia var={mainData} />

            <p className="mt-3">
              Se calcula la curva ROC y el área bajo la curva para cada clase:{" "}
            </p>
            <Validation var={mainData} />
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
