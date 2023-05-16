import React, { useEffect, useState } from "react";

export default function DescripcionData(props) {
  const [shape, setShape] = useState(null);

  useEffect(() => {
    if (props.var !== null && shape === null) {
      const arr = Object.keys(props.var);
      setShape(arr.length);
    }
  }, [props]);

  useEffect(() => {
    if (shape !== null) {
      props.methodCharge();
    }
  }, [shape]);

  return (
    <div className="grid pt-5">
      <div className="col-12">
        <div className="card">
          <h5>Paso 1: Descripción de la estructura de los datos.</h5>
          <p>La cantidad de filas y columnas que tiene el conjunto de datos:</p>
          <pre className="app-code">
            <code>
              {`(`}
              {shape}
              {`, 5)`}
            </code>
          </pre>
          <p>Los tipos de datos de las columnas (variables y tipos):</p>
          <pre className="app-code">
            <code>
              {`Open            float64`}
              <br />
              {`High            float64`}
              <br />
              {`Low             float64`}
              <br />
              {`Close           float64`}
              <br />
              {`Volume          int64`}
              <br />
              {`dtype: object`}
            </code>
          </pre>
          <p>Se observa que los datos son numéricos (flotante y entero).</p>
        </div>
      </div>
    </div>
  );
}
