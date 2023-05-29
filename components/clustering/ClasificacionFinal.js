import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

var text = "[";
var count = 0;

export default function ClasificacionFinal(props) {
  const [textComponents, setTextComponents] = useState(null);

  useEffect(() => {
    count = 0;
    if (props.var !== null) {
      text = "[";

      for (const item in props.var.y_clasificacion_ba) {
        if (count % 20 === 0 && count !== 0) {
          text = text + "\n";
        }
        text = text + props.var.y_clasificacion_ba[item] + ", ";
        count = count + 1;
      }
      text = text.slice(0, -2) + "]";
      setTextComponents(text);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-1">
      <div>
        <pre className="app-code" style={{ fontSize: 12 }}>
          <code>{textComponents}</code>
        </pre>
      </div>
    </div>
  );
}
