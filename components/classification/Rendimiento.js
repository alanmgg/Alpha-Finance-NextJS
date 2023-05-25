import React, { useEffect } from "react";
import { useState } from "react";
// Google Chart
import { Chart } from "react-google-charts";

export default function Rendimiento(props) {
  var dataValue = [
    ["AUC", "1", "2"],
    [1, 0, 1],
    [2, 1, 1]
  ];

  var options = {
    colors: ["#763CAD"],
    hAxis: {
      title: "False Positive Rate"
    },
    vAxis: {
      title: "True Positive Rate"
    },
    series: {
      0: { curveType: "function" }
    },
    legend: "none"
  };

  return (
    <div className="pt-0">
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={dataValue}
        options={options}
      />
    </div>
  );
}
