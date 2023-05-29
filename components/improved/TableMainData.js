import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableMainNewData from "./TableMainNewData";
import Spinner from "../utilities/Spinner";

export default function TableMainData(props) {
  const [mainData, setMainData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (props.var !== null) {
      const objectData = props.var.main_data.map((item) => {
        const jsonData = {};
        Object.keys(item).forEach((itemKey) => {
          jsonData[itemKey] = item[itemKey];
        });
        return jsonData;
      });

      setTableData(props.var);
      setMainData(objectData);
    }
  }, [props]);

  useEffect(() => {
    if (mainData && mainData.length > 0) {
      const uniqueKeys = Array.from(
        new Set(mainData.flatMap((obj) => Object.keys(obj)))
      );
      const generatedColumns = uniqueKeys.map((key) => (
        <Column
          key={key}
          field={key}
          header={key}
          style={{ width: "15%", fontSize: 12 }}
        />
      ));
      setColumns(generatedColumns);
    } else {
      setColumns([]);
    }
  }, [mainData]);

  return (
    <div className="grid pt-5">
      {mainData !== null ? (
        <div className="col-12 xl:col-12">
          <DataTable
            value={mainData}
            rows={5}
            paginator
            responsiveLayout="scroll"
          >
            {columns}
          </DataTable>

          <p className="pt-3">
            Se aplica ingeniería de datos para poder manipular los datos en un
            futuro:
          </p>

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
