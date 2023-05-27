import React, { useState, useEffect } from "react";
import ValoresMod from "./ValoresMod";
import MatrizClassification from "./MatrizClassification";
import ImportanciaModOne from "./ImportanciaModOne";
import Spinner from "./../utilities/Spinner";

var text = "[";

export default function ModeloOne(props) {
  const [mainData, setMainData] = useState(null);
  const [textClassification, setTextClassification] = useState(null);
  const [variables, SetVariables] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      text = "[";

      for (const item in props.var.y_clasificacion_ad) {
        text = text + props.var.y_clasificacion_ad[item] + ", ";
        if (item === "12" || item === "24") {
          text = text + "\n";
        }
      }

      text = text.slice(0, -1) + "]";
      setTextClassification(text);
      setMainData(props.var);
      SetVariables(props.var.variables_ad);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null &&
      textClassification !== null &&
      variables !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Modelo 1: Árboles de decisión (AD).</h5>
            <p>Se muestra a continuación la variable predictoria: </p>

            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>{textClassification}</code>
            </pre>

            <p className="pt-2">
              Se muestrán los valores de la predicción del modelo:
            </p>

            <ValoresMod var={mainData} />

            <p className="pt-4">Matriz de clasificación: Árbol de decisión:</p>

            <MatrizClassification var={mainData} />

            <p className="pt-4">Reporte de la clasificación:</p>

            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                {"Criterio: "}
                {variables.criterion}
                <br />
                {"Exactitud: "}
                {variables.exactitud}
              </code>
            </pre>

            <p className="pt-2">Se muestra la importancia de las variables:</p>

            <ImportanciaModOne var={mainData} />
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
