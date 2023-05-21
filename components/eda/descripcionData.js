import React, { useEffect, useState } from "react";
import Spinner from "../utilities/Spinner";

export default function DescripcionData(props) {
  const [shape, setShape] = useState(null);
  const [dTypes, setDTypes] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setShape(props.var.shape);
      setDTypes(props.var.d_types);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {shape !== null && dTypes !== null ? (
        <div className="col-12">
          <div className="card">
            <h5>Paso 1: Descripción de la estructura de los datos.</h5>
            <p>
              La cantidad de filas y columnas que tiene el conjunto de datos:
            </p>
            <pre className="app-code">
              <code>
                {`(`}
                {shape[0]}
                {`, `}
                {shape[1]}
                {`)`}
              </code>
            </pre>
            <p>Los tipos de datos de las columnas (variables y tipos):</p>
            <pre className="app-code">
              <code>
                {`Open            `}
                {dTypes.open}
                <br />
                {`High            `}
                {dTypes.high}
                <br />
                {`Low             `}
                {dTypes.low}
                <br />
                {`Close           `}
                {dTypes.close}
                <br />
                {`Volume          `}
                {dTypes.volume}
                <br />
                {`Dividends       `}
                {dTypes.dividends}
                <br />
                {`Stock Splits    `}
                {dTypes["stock splits"]}
                <br />
                {`dtype: `}
                {dTypes.dtype}
              </code>
            </pre>
            <p>Se observa que los datos son numéricos (flotante y entero).</p>
          </div>
        </div>
      ) : (
        <Spinner layout="small" />
      )}
    </div>
  );
}
