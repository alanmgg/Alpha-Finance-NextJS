import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function MatrizParticional(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.matriz_cluster) {
        objectData.push({
          index: props.var.matriz_cluster[item]["index"],
          gender: props.var.matriz_cluster[item]["Gender"],
          everMarried: props.var.matriz_cluster[item]["Ever_Married"],
          age: props.var.matriz_cluster[item]["Age"],
          graduated: props.var.matriz_cluster[item]["Graduated"],
          profession: props.var.matriz_cluster[item]["Profession"],
          workExperience: props.var.matriz_cluster[item]["Work_Experience"],
          spendingScore: props.var.matriz_cluster[item]["Spending_Score"],
          familySize: props.var.matriz_cluster[item]["Family_Size"],
          var: props.var.matriz_cluster[item]["Var_1"],
          cluster: props.var.matriz_cluster[item]["ClusterC"]
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-3">
      <DataTable value={mainData} rows={5} paginator responsiveLayout="scroll">
        <Column
          field="index"
          header="Index"
          style={{ width: "5%", fontSize: 12 }}
        />
        <Column
          field="gender"
          header="Gender"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="everMarried"
          header="Ever_Married"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="age"
          header="Age"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="graduated"
          header="Graduated"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="profession"
          header="Profession"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="workExperience"
          header="Work_Experience"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="spendingScore"
          header="Spending_Score"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="familySize"
          header="Family_Size"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="var"
          header="Var_1"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="cluster"
          header="ClusterC"
          style={{ width: "10%", fontSize: 12 }}
        />
      </DataTable>
    </div>
  );
}
