import React, { useEffect, useState } from "react";

export default function AplicationVariables(props) {
  const [variablesData, setVariablesData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setVariablesData(props.var.variables);
    }
  }, [props]);

  return (
    <pre className="app-code" style={{ fontSize: 12 }}>
      {variablesData !== null ? (
        <code>
          {`Criterio: `}
          {variablesData.criterion}
          <br />
          {`MAE: `}
          {variablesData.mae.toFixed(4)}
          <br />
          {`MSE: `}
          {variablesData.mse.toFixed(4)}
          <br />
          {`RMSE: `}
          {variablesData.rmse.toFixed(4)}
          <br />
          {`Score: `}
          {variablesData.score.toFixed(4)}
        </code>
      ) : null}
    </pre>
  );
}
