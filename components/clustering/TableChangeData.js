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
          id: props.var.main_data_new[item]["ID"],
          gender: props.var.main_data_new[item]["Gender"],
          everMarried: props.var.main_data_new[item]["Ever_Married"],
          age: props.var.main_data_new[item]["Age"],
          graduated: props.var.main_data_new[item]["Graduated"],
          profession: props.var.main_data_new[item]["Profession"],
          workExperience: props.var.main_data_new[item]["Work_Experience"],
          spendingScore: props.var.main_data_new[item]["Spending_Score"],
          familySize: props.var.main_data_new[item]["Family_Size"],
          var: props.var.main_data_new[item]["Var_1"]
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-2">
      <DataTable value={mainData} rows={5} paginator responsiveLayout="scroll">
        <Column
          field="id"
          header="ID"
          style={{ width: "10%", fontSize: 12, fontWeight: "bold" }}
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
