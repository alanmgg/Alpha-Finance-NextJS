import React, { useEffect, useState } from "react";
import Spinner from "./../utilities/Spinner";

export default function PCAComponents(props) {
  const [textComponents, setTextComponents] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      const components = props.var.pca_components.map((item) =>
        Object.values(item)
          .map((value) => value.toFixed(8))
          .join(" ")
      );
      const text = components.join("\n");
      setTextComponents(text);
    }
  }, [props.var]);

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
