import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import Spinner from "../utilities/Spinner";

export default function TableMainDataForecast(props) {
  const [mainData, setMainData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dropdownValues, setDropdownValues] = useState([]);
  const [selectColumn, setSelectColumn] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      const objectData = props.var.main_data.map((item) => {
        const jsonData = {};
        Object.keys(item).forEach((itemKey) => {
          jsonData[itemKey] = item[itemKey];
        });
        return jsonData;
      });

      setMainData(objectData);

      // Obtener las llaves del JSON y asignarlas al array dropdownValues
      const keys = Object.keys(props.var.main_data[0]);
      const values = keys.map((key) => ({ name: key, code: key }));
      setDropdownValues(values);
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

  function choiceVariable(value) {
    props.method(value.name);
    setSelectColumn(value);
  }

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

          <h6>Selecciona la variable que dependerá del dataframe: </h6>
          <Dropdown
            options={dropdownValues}
            optionLabel="name"
            placeholder="Selecciona la variable..."
            className="w-full"
            value={selectColumn}
            onChange={(e) => choiceVariable(e.value)}
          />
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
