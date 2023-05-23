import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function Importancia(props) {
  const [importancia, setImportancia] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.importancia) {
        objectData.push({
          index: props.var.importancia[item]["index"],
          variable: props.var.importancia[item]["Variable"],
          importancia: props.var.importancia[item]["Importancia"].toFixed(4)
        });
      }
      setImportancia(objectData);
    }
  }, [props]);

  return (
    <div>
      <DataTable
        value={importancia}
        rows={5}
        paginator
        responsiveLayout="scroll"
      >
        <Column
          field="index"
          header=""
          style={{
            width: "15%",
            fontWeight: "bold",
            fontSize: 12,
            textAlign: "center"
          }}
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
