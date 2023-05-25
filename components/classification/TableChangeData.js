import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function TableChangeData(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.main_data_new) {
        objectData.push({
          index: props.var.main_data_new[item]["index"],
          age: props.var.main_data_new[item]["Age"],
          sex: props.var.main_data_new[item]["Sex"],
          bp: props.var.main_data_new[item]["BP"],
          cholesterol: props.var.main_data_new[item]["Cholesterol"],
          natok: props.var.main_data_new[item]["Na_to_K"].toFixed(4),
          drug: props.var.main_data_new[item]["Drug"]
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
          header=""
          style={{ width: "10%", fontSize: 12, fontWeight: "bold" }}
        />
        <Column
          field="age"
          header="Age"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="sex"
          header="Sex"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column field="bp" header="BP" style={{ width: "15%", fontSize: 12 }} />
        <Column
          field="cholesterol"
          header="Cholesterol"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="natok"
          header="Na_to_K"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="drug"
          header="Drug"
          style={{ width: "15%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
