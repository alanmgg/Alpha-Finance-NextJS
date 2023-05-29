import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function TableXData(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.x) {
        objectData.push({
          index: props.var.x[item]["index"],
          zero: props.var.x[item]["0"].toFixed(4),
          one: props.var.x[item]["1"].toFixed(4),
          two: props.var.x[item]["2"].toFixed(4),
          three: props.var.x[item]["3"].toFixed(4),
          four: props.var.x[item]["4"].toFixed(4),
          five: props.var.x[item]["5"].toFixed(4),
          six: props.var.x[item]["6"].toFixed(4),
          seven: props.var.x[item]["7"].toFixed(4),
          eight: props.var.x[item]["8"].toFixed(4)
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-2">
      <DataTable value={mainData} rows={5} paginator responsiveLayout="scroll">
        <Column field="index" header="" style={{ width: "5%", fontSize: 12 }} />
        <Column field="zero" header="0" style={{ width: "7%", fontSize: 12 }} />
        <Column field="one" header="1" style={{ width: "7%", fontSize: 12 }} />
        <Column field="two" header="2" style={{ width: "7%", fontSize: 12 }} />
        <Column
          field="three"
          header="3"
          style={{ width: "7%", fontSize: 12 }}
        />
        <Column field="four" header="4" style={{ width: "7%", fontSize: 12 }} />
        <Column field="five" header="5" style={{ width: "7%", fontSize: 12 }} />
        <Column field="six" header="6" style={{ width: "7%", fontSize: 12 }} />
        <Column
          field="seven"
          header="7"
          style={{ width: "7%", fontSize: 12 }}
        />
        <Column
          field="eight"
          header="8"
          style={{ width: "7%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
