import React, { useEffect } from "react";

export default function NullData(props) {
  useEffect(() => {
    props.methodCharge();
  }, [props]);

  return (
    <div className="grid pt-5">
      <div className="col-12">
        <div className="card">
          <h5>Paso 2: Identificación de datos faltantes.</h5>
          <p>Regresa la suma de todos los valores nulos en cada variable:</p>
          <pre className="app-code">
            <code>
              {`Open            0`}
              <br />
              {`High            0`}
              <br />
              {`Low             0`}
              <br />
              {`Close           0`}
              <br />
              {`Volume          0`}
              <br />
              {`dtype: int64`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
