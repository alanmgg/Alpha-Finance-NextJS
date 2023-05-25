import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function ValoresModBA(props) {
  const [variablesY, setVariablesY] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.valores_mod_2) {
        objectData.push({
          index: props.var.valores_mod_2[item]["index"],
          zero: props.var.valores_mod_2[item]["0"]
        });
      }
      setVariablesY(objectData);
    }
  }, [props]);

  return (
    <div>
      <DataTable
        value={variablesY}
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
          field="zero"
          header="0"
          style={{ width: "20%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
