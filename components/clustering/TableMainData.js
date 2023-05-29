import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableChangeData from "./TableChangeData";
import NullData from "./NullData";
import GroupBy from "./GroupBy";
import TableMainNewData from "./TableMainNewData";
import Spinner from "./../utilities/Spinner";

var objectData = [];

export default function TableMainData(props) {
  const [mainData, setMainData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.main_data) {
        objectData.push({
          id: props.var.main_data[item]["ID"],
          gender: props.var.main_data[item]["Gender"],
          everMarried: props.var.main_data[item]["Ever_Married"],
          age: props.var.main_data[item]["Age"],
          graduated: props.var.main_data[item]["Graduated"],
          profession: props.var.main_data[item]["Profession"],
          workExperience: props.var.main_data[item]["Work_Experience"],
          spendingScore: props.var.main_data[item]["Spending_Score"],
          familySize: props.var.main_data[item]["Family_Size"],
          var: props.var.main_data[item]["Var_1"]
        });
      }
      setMainData(objectData);
      setTableData(props.var);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null && tableData !== null ? (
        <div className="col-12 xl:col-12">
          <DataTable
            value={mainData}
            rows={5}
            paginator
            responsiveLayout="scroll"
          >
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

          <p className="pt-3">
            Aplicando ingeniería de datos para poder manipularlos más adelante.
          </p>

          <TableChangeData var={tableData} />
          <NullData var={tableData} />
          <GroupBy var={tableData} />

          <p className="pt-3">Eliminamos el ID de la tabla.</p>

          <TableMainNewData var={tableData} />
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
