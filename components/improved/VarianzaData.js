import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

export default function VarianzaData(props) {
  const [textComponents, setTextComponents] = useState(null);
  const [varianzaComponents, setVarianzaComponents] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      const varianzaItems = props.var.varianza.map((item) =>
        item["0"].toFixed(8)
      );
      const varianzaText = varianzaItems.join(" ");

      setTextComponents(varianzaText);
      setVarianzaComponents(props.var.num_varianza);
    }
  }, [props.var]);

  return (
    <div className="grid">
      {textComponents !== null && varianzaComponents !== null ? (
        <div className="col-12 xl:col-12">
          <div>
            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                Proporción de varianza: {textComponents}
                <br />
                Varianza acumulada: {varianzaComponents}
              </code>
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
