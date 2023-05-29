import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function MatrizEstandarizada(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.m_estandarizada) {
        objectData.push({
          index: props.var.m_estandarizada[item]["index"],
          zero: props.var.m_estandarizada[item]["0"].toFixed(4),
          one: props.var.m_estandarizada[item]["1"].toFixed(4),
          two: props.var.m_estandarizada[item]["2"].toFixed(4),
          three: props.var.m_estandarizada[item]["3"].toFixed(4),
          four: props.var.m_estandarizada[item]["4"].toFixed(4),
          five: props.var.m_estandarizada[item]["5"].toFixed(4),
          six: props.var.m_estandarizada[item]["6"].toFixed(4),
          seven: props.var.m_estandarizada[item]["7"].toFixed(4),
          eight: props.var.m_estandarizada[item]["8"].toFixed(4)
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
          style={{ width: "5%", fontSize: 12 }}
        />
        <Column field="zero" header="0" style={{ width: "7%", fontSize: 12 }} />
        <Column field="one" header="1" style={{ width: "7%", fontSize: 12 }} />
        <Column field="two" header="2" style={{ width: "7%", fontSize: 12 }} />
        <Column
          field="three"
          header="3"
          style={{ width: "7%", fontSize: 12 }}
        />
        <Column field="four" header="4" style={{ width: "7%", fontSize: 12 }} />
        <Column field="five" header="5" style={{ width: "7%", fontSize: 12 }} />
        <Column field="six" header="6" style={{ width: "7%", fontSize: 12 }} />
        <Column
          field="seven"
          header="7"
          style={{ width: "7%", fontSize: 12 }}
        />
        <Column
          field="eight"
          header="8"
          style={{ width: "7%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
