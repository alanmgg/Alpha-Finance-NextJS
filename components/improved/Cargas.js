import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

export default function Cargas(props) {
  const [textComponents, setTextComponents] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      let text = "";

      for (let i = 0; i <= 5; i++) {
        text += `${i} `;
        for (const item in props.var.cargas) {
          text += props.var.cargas[item][i].toFixed(8) + " ";
        }
        text += "\n";
      }

      setTextComponents(text);
    }
  }, [props]);

  return (
    <div className="grid">
      {textComponents !== null ? (
        <div className="col-12 xl:col-12">
          <div>
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
