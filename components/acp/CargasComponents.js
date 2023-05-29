import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function CargasComponents(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.cargas_components) {
        objectData.push({
          index: props.var.cargas_components[item]["index"],
          open: props.var.cargas_components[item]["Open"].toFixed(4),
          high: props.var.cargas_components[item]["High"].toFixed(4),
          low: props.var.cargas_components[item]["Low"].toFixed(4),
          close: props.var.cargas_components[item]["Close"].toFixed(4),
          volume: props.var.cargas_components[item]["Volume"].toFixed(4),
          dividends: props.var.cargas_components[item]["Dividends"],
          stockSplits:
            props.var.cargas_components[item]["Stock Splits"].toFixed(4)
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-3">
      <DataTable value={mainData} rows={7} responsiveLayout="scroll">
        <Column
          field="index"
          header=""
          style={{ width: "20%", fontWeight: "bold", fontSize: 12 }}
        />
        <Column
          field="open"
          header="Open"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="high"
          header="High"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="low"
          header="Low"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="close"
          header="Close"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="volume"
          header="Volume"
          style={{ width: "25%", fontSize: 12 }}
        />
        <Column
          field="dividends"
          header="Dividends"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="stockSplits"
          header="Stock Splits"
          style={{ width: "10%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
