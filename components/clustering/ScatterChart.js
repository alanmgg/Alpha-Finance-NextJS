import React, { useEffect } from "react";
import { useState } from "react";
// Plotly
import Plot from "react-plotly.js";

var objectDataX = [];
var objectDataY = [];
var objectDataZ = [];

export default function ScatterChart(props) {
  const [dataValue, setDataValue] = useState(null);

  useEffect(() => {
    objectDataX = [];
    objectDataY = [];
    objectDataZ = [];

    setDataValue(null);

    if (props.var !== null) {
      for (const item in props.var.scatter_m_est_x) {
        objectDataX.push(Number(props.var.scatter_m_est_x[item].toFixed(4)));
        objectDataY.push(Number(props.var.scatter_m_est_y[item].toFixed(4)));
        objectDataZ.push(Number(props.var.scatter_m_est_z[item].toFixed(4)));
      }

      setDataValue([
        {
          x: objectDataX,
          y: objectDataY,
          z: objectDataZ,
          mode: "markers",
          marker: {
            size: 12,
            line: {
              color: "rgba(217, 217, 217, 0.14)",
              width: 0.5
            },
            opacity: 0.8
          },
          type: "scatter3d"
        }
      ]);
    }
  }, [props]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
      className="mt-3"
    >
      <Plot
        data={dataValue}
        layout={{
          autosize: true,
          scene: {
            xaxis: { title: "X" },
            yaxis: { title: "Y" },
            zaxis: { title: "Z" }
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
          }
        }}
        responsive
      />
    </div>
  );
}
