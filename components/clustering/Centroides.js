import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function Centroides(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.centroides) {
        objectData.push({
          cluster: props.var.centroides[item]["ClusterC"],
          gender: props.var.centroides[item]["Gender"].toFixed(4),
          everMarried: props.var.centroides[item]["Ever_Married"].toFixed(4),
          age: props.var.centroides[item]["Age"].toFixed(4),
          graduated: props.var.centroides[item]["Graduated"].toFixed(4),
          profession: props.var.centroides[item]["Profession"].toFixed(4),
          workExperience:
            props.var.centroides[item]["Work_Experience"].toFixed(4),
          spendingScore:
            props.var.centroides[item]["Spending_Score"].toFixed(4),
          familySize: props.var.centroides[item]["Family_Size"].toFixed(4),
          var: props.var.centroides[item]["Var_1"].toFixed(4)
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-3">
      <DataTable value={mainData} rows={5} responsiveLayout="scroll">
        <Column
          field="cluster"
          header="ClusterC"
          style={{ width: "10%", fontSize: 12 }}
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
      </DataTable>
    </div>
  );
}
