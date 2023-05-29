import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function ValoresMod(props) {
  const [variablesY, setVariablesY] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.valores_mod_1) {
        objectData.push({
          index: props.var.valores_mod_1[item]["index"],
          zero: props.var.valores_mod_1[item]["0"],
          one: props.var.valores_mod_1[item]["1"],
          two: props.var.valores_mod_1[item]["2"],
          three: props.var.valores_mod_1[item]["3"],
          four: props.var.valores_mod_1[item]["4"]
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
