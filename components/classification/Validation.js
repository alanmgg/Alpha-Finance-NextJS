import React, { useState, useEffect } from "react";
import Rendimiento from "./Rendimiento";
import Spinner from "./../utilities/Spinner";

export default function Validation(props) {
  const [mainData, setMainData] = useState(null);
  const [validation, setValidation] = useState(null);
  const [auc, setAuc] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setValidation(props.var.validation);
      setAuc(props.var.auc);
      setMainData(props.var);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null && validation !== null && auc !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Validación de los modelos.</h5>
            <p>Se muestra la confianza de cada modelo.</p>

            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                {"Árboles de decisión: "}
                {validation.ad}
                <br />
                {"Bosques aleatorios: "}
                {validation.ba}
              </code>
            </pre>

            <p>
              Se calcula la curva ROC y el área bajo la curva para cada clase.
            </p>

            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                {"AUC para la clase 1: "}
                {auc[0]}
                {".0"}
                <br />
                {"AUC para la clase 2: "}
                {auc[1]}
                {".0"}
                <br />
                {"AUC para la clase 3: "}
                {auc[2]}
                {".0"}
                <br />
                {"AUC para la clase 4: "}
                {auc[3]}
                {".0"}
                <br />
                {"AUC para la clase 5: "}
                {auc[4]}
                {".0"}
              </code>
            </pre>

            <Rendimiento var={mainData} />
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
