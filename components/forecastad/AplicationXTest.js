import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function AplicationXTest(props) {
  const [aplicationXTest, setAplicationXTest] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.x_test) {
        objectData.push({
          index: props.var.x_test[item]["index"],
          cero: props.var.x_test[item]["0"].toFixed(4),
          uno: props.var.x_test[item]["1"].toFixed(4),
          dos: props.var.x_test[item]["2"].toFixed(4)
        });
      }
      setAplicationXTest(objectData);
    }
  }, [props]);

  return (
    <div>
      <DataTable
        value={aplicationXTest}
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
          field="cero"
          header="0"
          style={{ width: "25%", fontSize: 12 }}
        />
        <Column field="uno" header="1" style={{ width: "25%", fontSize: 12 }} />
        <Column field="dos" header="2" style={{ width: "25%", fontSize: 12 }} />
      </DataTable>
    </div>
  );
}
