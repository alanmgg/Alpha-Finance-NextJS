import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function AplicationValores(props) {
  const [aplicationValores, setAplicationValores] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.valores) {
        objectData.push({
          index: props.var.valores[item]["index"].toFixed(4),
          cero: props.var.valores[item]["0"].toFixed(4)
        });
      }
      setAplicationValores(objectData);
    }
  }, [props]);

  return (
    <div>
      <DataTable
        value={aplicationValores}
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
