import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableChangeData from "./TableChangeData";
import NullData from "./NullData";
import GroupBy from "./GroupBy";
import DescribeData from "./DescribeData";
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
          index: props.var.main_data[item]["index"],
          age: props.var.main_data[item]["Age"],
          sex: props.var.main_data[item]["Sex"],
          bp: props.var.main_data[item]["BP"],
          cholesterol: props.var.main_data[item]["Cholesterol"],
          natok: props.var.main_data[item]["Na_to_K"].toFixed(4),
          drug: props.var.main_data[item]["Drug"]
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
          <div className="card">
            <DataTable
              value={mainData}
              rows={5}
              paginator
              responsiveLayout="scroll"
            >
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
              <Column
                field="bp"
                header="BP"
                style={{ width: "15%", fontSize: 12 }}
              />
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

            <p className="pt-3">
              Aplicando ingeniería de datos para poder manipularlos más
              adelante.
            </p>

            <TableChangeData var={tableData} />
            <NullData var={tableData} />
            <GroupBy var={tableData} />
            <DescribeData var={tableData} />
          </div>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
