import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Spinner from "../utilities/Spinner";

var objectData = [];

export default function MatrizData(props) {
  const [corrData, setCorrData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.corr_data) {
        objectData.push({
          index: props.var.corr_data[item]["index"],
          open: props.var.corr_data[item]["Open"],
          high: props.var.corr_data[item]["High"],
          low: props.var.corr_data[item]["Low"],
          close: props.var.corr_data[item]["Close"],
          volume: props.var.corr_data[item]["Volume"],
          dividends: props.var.corr_data[item]["Dividends"],
          stock: props.var.corr_data[item]["Stock Splits"]
        });
      }
      setCorrData(objectData);
    }
  }, [props]);

  function UppercaseString(stringTable) {
    let strinResult =
      stringTable.charAt(0).toUpperCase() + stringTable.slice(1);
    return strinResult;
  }

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
      return <div></div>;
    }
  }

  return (
    <div className="grid pt-5">
      <div className="col-12 xl:col-12">
        {corrData !== null ? (
          <div className="card">
            <h5>
              Paso 1: Hay evidencia de variables posiblemente correlacionadas.
            </h5>

            <DataTable value={corrData} rows={6}>
              <Column
                field="index"
                header=""
                style={{
                  width: "5%",
                  fontWeight: "bold",
                  textAlign: "right",
                  fontSize: 12
                }}
                body={(data) => UppercaseString(data.index)}
              />
              <Column
                field="open"
                header="Open"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.open)}
              />
              <Column
                field="high"
                header="High"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.high)}
              />
              <Column
                field="low"
                header="Low"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.low)}
              />
              <Column
                field="close"
                header="Close"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.close)}
              />
              <Column
                field="volume"
                header="Volume"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.volume)}
              />
              <Column
                field="dividends"
                header="Dividends"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.dividends)}
              />
              <Column
                field="stock"
                header="Stock Splits"
                style={{ width: "10%", fontSize: 12 }}
                body={(data) => fieldColor(data.stock)}
              />
            </DataTable>
          </div>
        ) : (
          <div className="col-12 xl:col-12">
            <Spinner layout="small" />
          </div>
        )}
      </div>
    </div>
  );
}
