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
          four: props.var.valores_mod_1[item]["4"].toFixed(3)
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
            width: "10%",
            fontWeight: "bold",
            fontSize: 12
          }}
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
        <Column
          field="four"
          header="4"
          style={{ width: "15%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
