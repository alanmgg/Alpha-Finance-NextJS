import React, { useEffect } from "react";

export default function MatrizData(props) {
  useEffect(() => {
    props.methodCharge();
  }, [props]);

  return (
    <div className="grid pt-5">
      <div className="col-12">
        <div className="card">
          <h5>Paso 4: Identificación de relaciones entre pares variables.</h5>
          <p>Regresa la suma de todos los valores nulos en cada variable:</p>
        </div>
      </div>
    </div>
  );
}
