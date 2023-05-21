import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

import LineData from "./LineData";

var text = "[";

export default function VarianzaData(props) {
  const [mainData, setMainData] = useState(null);
  const [textComponents, setTextComponents] = useState(null);
  const [varianzaComponents, setVarianzaComponents] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      text = "[";

      for (const item in props.var.varianza) {
        text = text + props.var.varianza[item]["0"].toFixed(8) + " ";
      }
      text = text.slice(0, -1) + "]";
      setTextComponents(text);
      setVarianzaComponents(props.var.num_varianza);
      setMainData(props.var);
    }
  }, []);

  return (
    <div className="grid pt-5">
      {mainData !== null &&
      textComponents !== null &&
      varianzaComponents !== null ? (
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Paso 5: Se decide el número de componentes principales.</h5>
            <ul>
              <li>
                Se calcula el porcentaje de relevancia, es decir, entre el 75 y
                90% de varianza total.
              </li>
              <li>
                Se identifica mediante una gráfica el grupo de componentes con
                mayor varianza.
              </li>
            </ul>

            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                Proporción de varianza: {textComponents}
                <br />
                Varianza acumulada: {varianzaComponents}
              </code>
            </pre>

            <LineData var={mainData} />
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
