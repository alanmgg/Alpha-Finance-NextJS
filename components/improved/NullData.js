import React, { useEffect, useState } from "react";
import Spinner from "../utilities/Spinner";

export default function NullData(props) {
  const [nullData, setNullData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setNullData(props.var.is_null);
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
  if (nullData !== null) {
    formattedCode = formatCode(
      Object.entries(nullData)
        .map(([key, value]) => `${key}        ${value}`)
        .join("\n")
    );
  }

  return (
    <div className="grid">
      {nullData !== null ? (
        <div className="col-12 xl:col-12">
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
