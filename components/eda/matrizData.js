import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// API
import { getCorrData } from "../../api/eda";
// JSON
import CorrDataJson from "./../../config/corrData.json";

var countLoad = 0;

export default function MatrizData(props) {
  const [corrData, setCorrData] = useState(null);

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      getCorrData(props.value, loadCorrHandler, loadErrorHandler);
    }
  }, [props, props.value]);

  async function loadCorrHandler(response) {
    if (response.ok) {
      var responseCorr = await response.json();
      setCorrData(responseCorr.data);
      return;
    }
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    } else if (response.status === 401) {
      const error = await response.json();
    } else if (response.status === 404) {
      const error = await response.json();
    }
    throw new Error("Network response was not ok");
  }

  function loadErrorHandler(error) {}

  function UppercaseString(stringTable) {
    let strinResult =
      stringTable.charAt(0).toUpperCase() + stringTable.slice(1);
    return strinResult;
  }

  function fieldColor(value) {
    if (value === 1) {
      countLoad = countLoad + 1;
      if (countLoad === 5) {
        props.methodCharge();
      }

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
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="grid pt-5">
      <div className="col-12">
        <div className="card">
          <h5>Paso 4: Identificación de relaciones entre pares variables.</h5>
          <p>Regresa la suma de todos los valores nulos en cada variable:</p>

          {corrData !== null ? (
            <DataTable value={corrData} rows={5}>
              <Column
                field="index"
                header=""
                style={{ width: "5%", fontWeight: "bold", textAlign: "right" }}
                body={(data) => UppercaseString(data.index)}
              />
              <Column
                field="open"
                header="Open"
                style={{ width: "20%" }}
                body={(data) => fieldColor(data.open)}
              />
              <Column
                field="high"
                header="High"
                style={{ width: "20%" }}
                body={(data) => fieldColor(data.high)}
              />
              <Column
                field="low"
                header="Low"
                style={{ width: "20%" }}
                body={(data) => fieldColor(data.low)}
              />
              <Column
                field="close"
                header="Close"
                style={{ width: "20%" }}
                body={(data) => fieldColor(data.close)}
              />
              <Column
                field="volume"
                header="Volume"
                style={{ width: "20%" }}
                body={(data) => fieldColor(data.volume)}
              />
            </DataTable>
          ) : null}
        </div>
      </div>
    </div>
  );
}
