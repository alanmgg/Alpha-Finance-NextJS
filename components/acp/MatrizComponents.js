import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

var text = "[";

export default function MatrizComponents(props) {
  const [textComponents, setTextComponents] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      text = "[";

      for (const item in props.var.pca_components) {
        text =
          text +
          "[" +
          props.var.pca_components[item]["0"].toFixed(8) +
          " " +
          props.var.pca_components[item]["1"].toFixed(8) +
          " " +
          props.var.pca_components[item]["2"].toFixed(8) +
          " " +
          props.var.pca_components[item]["3"].toFixed(8) +
          " " +
          props.var.pca_components[item]["4"].toFixed(8) +
          " " +
          props.var.pca_components[item]["5"].toFixed(8) +
          " " +
          props.var.pca_components[item]["6"].toFixed(8) +
          "]\n";
      }
      text = text.slice(0, -1) + "]";
      setTextComponents(text);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid pt-5">
      {textComponents !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>
              Pasos 3 y 4: Se calcula la matriz de covarianzas o correlaciones,
              y se calculan los componentes (eigen-vectores) y la varianza
              (eigen-valores).
            </h5>
            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>{textComponents}</code>
            </pre>
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
