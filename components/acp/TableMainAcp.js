import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function TableMainAcp(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.data_main_acp) {
        var date = props.var.data_main_acp[item]["Date"].split("T");
        objectData.push({
          date: date[0],
          open: props.var.data_main_acp[item]["Open"].toFixed(4),
          high: props.var.data_main_acp[item]["High"].toFixed(4),
          low: props.var.data_main_acp[item]["Low"].toFixed(4),
          close: props.var.data_main_acp[item]["Close"].toFixed(4)
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-5">
      <h5>Datos finales.</h5>
      <DataTable value={mainData} rows={5} paginator responsiveLayout="scroll">
        <Column
          field="date"
          header="Fecha"
          sortable
          style={{ width: "20%", fontSize: 12 }}
        />
        <Column
          field="open"
          header="Open"
          sortable
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="high"
          header="High"
          sortable
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="low"
          header="Low"
          sortable
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="close"
          header="Close"
          sortable
          style={{ width: "15%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
