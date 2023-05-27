import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

import CargasComponents from "./CargasComponents";
import TableMainAcp from "./TableMainAcp";

var text = "";

export default function CargasData(props) {
  const [mainData, setMainData] = useState(null);
  const [textComponents, setTextComponents] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      text = "";

      for (const item in props.var.cargas) {
        text = text + "          " + item + "";
      }
      text = text + "\n0 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["0"].toFixed(8) + " ";
      }
      text = text + "\n1 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["1"].toFixed(8) + " ";
      }
      text = text + "\n2 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["2"].toFixed(8) + " ";
      }
      text = text + "\n3 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["3"].toFixed(8) + " ";
      }
      text = text + "\n4 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["4"].toFixed(8) + " ";
      }
      text = text + "\n5 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["5"].toFixed(8) + " ";
      }
      text = text + "\n6 ";
      for (const item in props.var.cargas) {
        text = text + props.var.cargas[item]["6"].toFixed(8) + " ";
      }
      setTextComponents(text);
      setMainData(props.var);
    }
  }, []);

  return (
    <div className="grid pt-5">
      {mainData !== null && textComponents !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Paso 6: Se examina la proporción de relevancias (cargas).</h5>
            <p>
              La importancia de cada variable se refleja en la magnitud de los
              valores en los componentes (mayor magnitud es sinónimo de mayor
              importancia).
            </p>
            <p>
              Se revisan los valores absolutos de los componentes principales
              seleccionados. Cuanto mayor sea el valor absoluto, más importante
              es esa variable en el componente principal.
            </p>

            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>{textComponents}</code>
            </pre>

            <CargasComponents var={mainData} />
            <TableMainAcp var={mainData} />
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
