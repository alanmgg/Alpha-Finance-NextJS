import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// API
import { getDescribeData } from "./../../api/eda";
// JSON
import DescribeDataJson from "./../../config/docs/describeData.json";

var objectData = [];

export default function DescribeData(props) {
  const [describeDataCharge, setDescribeDataCharge] = useState(null);

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      // getDescribeData(props.value, loadDescribeHandler, loadErrorHandler);

      // JSON
      objectData = [];

      for (const item in DescribeDataJson.data) {
        objectData.push({
          index: DescribeDataJson.data[item].index,
          open: DescribeDataJson.data[item].open,
          high: DescribeDataJson.data[item].high,
          low: DescribeDataJson.data[item].low,
          close: DescribeDataJson.data[item].close,
          volume: DescribeDataJson.data[item].volume
        });
      }
      setDescribeDataCharge(objectData);
      //
    }
  }, [props, props.value]);

  async function loadDescribeHandler(response) {
    if (response.ok) {
      var responseDescribe = await response.json();
      objectData = [];

      for (const item in responseDescribe.data) {
        objectData.push({
          index: responseDescribe.data[item].index,
          open: responseDescribe.data[item].open,
          high: responseDescribe.data[item].high,
          low: responseDescribe.data[item].low,
          close: responseDescribe.data[item].close,
          volume: responseDescribe.data[item].volume
        });
      }
      setDescribeDataCharge(objectData);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
    } else if (response.status === 404) {
      const error = await response.json();
    }
    throw new Error("Network response was not ok");
  }

  function loadErrorHandler(error) {}

  return (
    <div className="pt-5">
      <p style={{ fontWeight: "bold" }}>
        2) Resumen estadístico de variables numéricas.
      </p>
      <p>
        Se sacan estadísticas que muestra un resumen de las variables numéricas.
      </p>

      <DataTable value={describeDataCharge} rows={5}>
        <Column
          field="index"
          header=""
          style={{ width: "25%", fontWeight: "bold" }}
        />
        <Column field="open" header="Open" style={{ width: "20%" }} />
        <Column field="high" header="High" style={{ width: "20%" }} />
        <Column field="low" header="Low" style={{ width: "20%" }} />
        <Column field="close" header="Close" style={{ width: "20%" }} />
        <Column field="volume" header="Volume" style={{ width: "25%" }} />
      </DataTable>
    </div>
  );
}
