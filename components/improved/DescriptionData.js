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

  const formatCode = (code) => {
    const lines = code.split("\n");
    const maxKeyLength = Math.max(
      ...lines.map((line) => line.indexOf("        "))
    );
    const formattedLines = lines.map((line) => {
      const padding = " ".repeat(maxKeyLength - line.indexOf("        "));
      return line.replace("        ", padding);
    });
    return formattedLines.join("\n");
  };

  let formattedCode = "";
  if (dTypes !== null) {
    formattedCode = formatCode(
      Object.entries(dTypes)
        .map(([key, value]) => `${key}        ${value}`)
        .join("\n")
    );
  }

  return (
    <div className="grid">
      {shape !== null && dTypes !== null ? (
        <div className="col-12 xl:col-12">
          <pre className="app-code" style={{ fontSize: 12 }}>
            <code>
              {`(`}
              {shape[0]}
              {`, `}
              {shape[1]}
              {`)`}
            </code>
          </pre>

          <pre className="app-code" style={{ fontSize: 12 }}>
            <code>{formattedCode}</code>
          </pre>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
