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

      for (const item in props.var.corr) {
        objectData.push({
          index: props.var.corr[item]["index"],
          age: props.var.corr[item]["Age"],
          sex: props.var.corr[item]["Sex"],
          bp: props.var.corr[item]["BP"],
          cholesterol: props.var.corr[item]["Cholesterol"],
          natok: props.var.corr[item]["Na_to_K"],
          drug: props.var.corr[item]["Drug"]
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
      return (
        <div
          className="p-2"
          style={{ backgroundColor: "#EFF1F3", color: "#000000" }}
        ></div>
      );
    }
  }

  return (
    <div className="grid pt-5">
      <div className="col-12 xl:col-12">
        {corrData !== null ? (
          <div className="card">
            <h5>Selección de características.</h5>
            <p>
              A través de un mapa de calor de identifican posibles variables
              correlacionadas.
            </p>

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
                field="age"
                header="Age"
                style={{ width: "15%", fontSize: 12 }}
                body={(data) => fieldColor(data.age)}
              />
              <Column
                field="sex"
                header="Sex"
                style={{ width: "15%", fontSize: 12 }}
                body={(data) => fieldColor(data.sex)}
              />
              <Column
                field="bp"
                header="BP"
                style={{ width: "15%", fontSize: 12 }}
                body={(data) => fieldColor(data.bp)}
              />
              <Column
                field="cholesterol"
                header="Cholesterol"
                style={{ width: "15%", fontSize: 12 }}
                body={(data) => fieldColor(data.cholesterol)}
              />
              <Column
                field="natok"
                header="Na_to_K"
                style={{ width: "15%", fontSize: 12 }}
                body={(data) => fieldColor(data.natok)}
              />
              <Column
                field="drug"
                header="Drug"
                style={{ width: "15%", fontSize: 12 }}
                body={(data) => fieldColor(data.drug)}
              />
            </DataTable>

            <p className="pt-3" style={{ fontWeight: "bold" }}>
              Varibles seleccionadas:
            </p>
            <p>
              Debido a la importancia de las variables, se considerarán todas
              las variables para la construcción de los modelos.
            </p>
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
