import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Spinner from "../utilities/Spinner";

export default function CorrData(props) {
  const [mainData, setMainData] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (props.var !== null) {
      const objectData = props.var.corr_data.map((item) => {
        const jsonData = {};
        Object.keys(item).forEach((itemKey) => {
          jsonData[itemKey] = item[itemKey];
        });
        return jsonData;
      });

      setMainData(objectData);
    }
  }, [props]);

  function fieldColor(value) {
    if (value === 1) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#6C0220", color: "#FFFFFF" }}
        >
          {value}
        </div>
      );
    } else if (value < 1 && value > 0.75) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#960F27", color: "#FFFFFF" }}
        >
          {value}
        </div>
      );
    } else if (value < 0.75 && value > 0.5) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#CD4E45", color: "#FFFFFF" }}
        >
          {value}
        </div>
      );
    } else if (value < 0.5 && value > 0.25) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#F7B89A", color: "#000000" }}
        >
          {value}
        </div>
      );
    } else if (value < 0.25 && value > 0) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#FBE4D6", color: "#000000" }}
        >
          {value}
        </div>
      );
    } else if (value === 0) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
        >
          {value}
        </div>
      );
    } else if (value < 0 && value > -0.25) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#DEEBF2", color: "#000000" }}
        >
          {value}
        </div>
      );
    } else if (value < -0.25 && value > -0.5) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#96C7DF", color: "#000000" }}
        >
          {value}
        </div>
      );
    } else if (value < -0.5 && value > -0.75) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#3681BA", color: "#FFFFFF" }}
        >
          {value}
        </div>
      );
    } else if (value < -0.75 && value > -1) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#144F8B", color: "#FFFFFF" }}
        >
          {value}
        </div>
      );
    } else if (value === -1) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#053061", color: "#FFFFFF" }}
        >
          {value}
        </div>
      );
    } else if (value === null) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#EFF1F3", color: "#000000" }}
        ></div>
      );
    } else {
      return <div style={{ fontWeight: "bold" }}>{value}</div>;
    }
  }

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
          body={(data) => fieldColor(data[key])}
          style={{ width: "15%", fontSize: 12 }}
        />
      ));
      setColumns(generatedColumns);
    } else {
      setColumns([]);
    }
  }, [mainData]);

  return (
    <div className="grid">
      {mainData !== null ? (
        <div className="col-12 xl:col-12">
          <DataTable value={mainData} responsiveLayout="scroll">
            {columns}
          </DataTable>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
