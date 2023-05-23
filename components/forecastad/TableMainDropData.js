import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function TableMainDropData(props) {
  const [mainDropData, setMainDropData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.main_data_drop) {
        var date = props.var.main_data_drop[item]["Date"].split("T");
        objectData.push({
          date: date[0],
          open: props.var.main_data_drop[item]["Open"].toFixed(4),
          high: props.var.main_data_drop[item]["High"].toFixed(4),
          low: props.var.main_data_drop[item]["Low"].toFixed(4),
          close: props.var.main_data_drop[item]["Close"].toFixed(4)
        });
      }
      setMainDropData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-5">
      <DataTable
        value={mainDropData}
        rows={5}
        paginator
        responsiveLayout="scroll"
      >
        <Column
          field="date"
          header="Date"
          style={{ width: "10%", fontWeight: "bold", fontSize: 12 }}
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
      </DataTable>
    </div>
  );
}
