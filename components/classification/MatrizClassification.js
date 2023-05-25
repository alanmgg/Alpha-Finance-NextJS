import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function MatrizClassification(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.matriz_clasificacion_1) {
        objectData.push({
          actual: props.var.matriz_clasificacion_1[item]["Actual"],
          one: props.var.matriz_clasificacion_1[item]["1.0"],
          two: props.var.matriz_clasificacion_1[item]["2.0"],
          three: props.var.matriz_clasificacion_1[item]["3.0"],
          four: props.var.matriz_clasificacion_1[item]["4.0"],
          five: props.var.matriz_clasificacion_1[item]["5.0"]
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-2">
      <DataTable value={mainData} rows={5} paginator responsiveLayout="scroll">
        <Column
          field="actual"
          header="Actual"
          style={{ width: "10%", fontSize: 12, fontWeight: "bold" }}
        />
        <Column
          field="one"
          header="1.0"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="two"
          header="2.0"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="three"
          header="3.0"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="four"
          header="4.0"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="five"
          header="5.0"
          style={{ width: "15%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
