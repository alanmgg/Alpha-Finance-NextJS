import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function ImportanciaModOne(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.importancia_mod_1) {
        objectData.push({
          index: props.var.importancia_mod_1[item]["index"],
          variable: props.var.importancia_mod_1[item]["Variable"],
          importancia:
            props.var.importancia_mod_1[item]["Importancia"].toFixed(4)
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-2">
      <DataTable value={mainData} rows={5} paginator responsiveLayout="scroll">
        <Column
          field="index"
          header="Index"
          style={{ width: "10%", fontSize: 12, fontWeight: "bold" }}
        />
        <Column
          field="variable"
          header="Variable"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="importancia"
          header="Importancia"
          style={{ width: "15%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
