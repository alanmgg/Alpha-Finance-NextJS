import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import VariablesY from "./VariablesY";
import Spinner from "./../utilities/Spinner";

var objectData = [];

export default function Variables(props) {
  const [mainData, setMainData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.x) {
        objectData.push({
          index: props.var.x[item]["index"],
          zero: props.var.x[item]["0"],
          one: props.var.x[item]["1"],
          two: props.var.x[item]["2"],
          three: props.var.x[item]["3"],
          four: props.var.x[item]["4"].toFixed(4)
        });
      }
      setMainData(objectData);
      setTableData(props.var);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null && tableData ? (
        <div className="col-12 xl:col-12">
          <div>
            <h5>Definición de las variables predictoras y variable clase.</h5>
            <p>Variables predictorias.</p>
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
                field="zero"
                header="0"
                style={{ width: "15%", fontSize: 12 }}
              />
              <Column
                field="one"
                header="1"
                style={{ width: "15%", fontSize: 12 }}
              />
              <Column
                field="two"
                header="2"
                style={{ width: "15%", fontSize: 12 }}
              />
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

            <p className="pt-3">Variable clase.</p>

            <VariablesY var={tableData} />
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
