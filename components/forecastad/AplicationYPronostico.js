import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function AplicationYPronostico(props) {
  const [aplicationYPronostico, setAplicationYPronostico] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.y_pronostico) {
        objectData.push({
          index: props.var.y_pronostico[item]["index"],
          cero: props.var.y_pronostico[item]["0"].toFixed(4)
        });
      }
      setAplicationYPronostico(objectData);
    }
  }, [props]);

  return (
    <div>
      <DataTable
        value={aplicationYPronostico}
        rows={5}
        paginator
        responsiveLayout="scroll"
      >
        <Column
          field="index"
          header=""
          style={{
            width: "5%",
            fontWeight: "bold",
            fontSize: 12,
            textAlign: "center"
          }}
        />
        <Column
          field="cero"
          header="0"
          style={{ width: "20%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
