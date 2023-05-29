import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function MatrizClassification(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.matriz_clasificacion) {
        objectData.push({
          reales: props.var.matriz_clasificacion[item]["Reales"],
          zero: props.var.matriz_clasificacion[item]["0"],
          one: props.var.matriz_clasificacion[item]["1"],
          two: props.var.matriz_clasificacion[item]["2"],
          three: props.var.matriz_clasificacion[item]["3"]
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-2">
      <DataTable value={mainData} rows={5} responsiveLayout="scroll">
        <Column
          field="reales"
          header="Reales"
          style={{ width: "10%", fontSize: 12, fontWeight: "bold" }}
        />
        <Column
          field="zero"
          header="0"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column field="one" header="1" style={{ width: "15%", fontSize: 12 }} />
        <Column field="two" header="2" style={{ width: "15%", fontSize: 12 }} />
        <Column
          field="three"
          header="3"
          style={{ width: "15%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
