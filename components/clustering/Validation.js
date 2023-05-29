import React, { useState, useEffect } from "react";

export default function Validation(props) {
  const [auc, setAuc] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setAuc(props.var.auc);
    }
  }, [props]);

  return (
    <div>
      {auc !== null ? (
        <pre className="app-code" style={{ fontSize: 12 }}>
          <code>
            {"AUC para la clase 1: "}
            {auc[0]}
            {".0"}
            <br />
            {"AUC para la clase 2: "}
            {auc[1]}
            {".0"}
            <br />
            {"AUC para la clase 3: "}
            {auc[2]}
            {".0"}
            <br />
            {"AUC para la clase 4: "}
            {auc[3]}
            {".0"}
          </code>
        </pre>
      ) : null}
    </div>
  );
}
