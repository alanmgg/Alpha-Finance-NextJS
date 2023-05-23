import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AplicationY from "./AplicationY";
import AplicationXTest from "./AplicationXTest";
import AplicationYPronostico from "./AplicationYPronostico";
import AplicationValores from "./AplicationValores";
import AplicationVariables from "./AplicationVariables";
import Spinner from "./../utilities/Spinner";

var objectData = [];

export default function Aplication(props) {
  const [mainData, setMainData] = useState(null);
  const [xData, setXData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.x) {
        objectData.push({
          index: props.var.x[item]["index"],
          cero: props.var.x[item]["0"].toFixed(4),
          uno: props.var.x[item]["1"].toFixed(4),
          dos: props.var.x[item]["2"].toFixed(4)
        });
      }
      setXData(objectData);
      setMainData(props.var);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null && xData !== null ? (
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Aplicación del algoritmo</h5>
            <p>
              Se seleccionan las variables predictoras (X) y la variable a
              pronosticar (Y). Primero la variable predictoria (X), esta formada
              de Open, High y Low.
            </p>

            <DataTable
              value={xData}
              rows={5}
              paginator
              responsiveLayout="scroll"
            >
              <Column
                field="index"
                header=""
                sortable
                style={{
                  width: "15%",
                  fontWeight: "bold",
                  fontSize: 12,
                  textAlign: "center"
                }}
              />
              <Column
                field="cero"
                header="0"
                sortable
                style={{ width: "25%", fontSize: 12 }}
              />
              <Column
                field="uno"
                header="1"
                sortable
                style={{ width: "25%", fontSize: 12 }}
              />
              <Column
                field="dos"
                header="2"
                sortable
                style={{ width: "25%", fontSize: 12 }}
              />
            </DataTable>

            <p className="pt-5">
              Segundo la variable a pronosticar (Y), esta formada de Close.
            </p>

            <AplicationY var={mainData} />

            <p className="pt-5">
              Se hace la división de los datos. En variables de entrenamiento y
              variables iniciales. A continuación se muestra las variables
              iniciales Open (0), High (1) y Low (3).
            </p>

            <AplicationXTest var={mainData} />

            <p className="pt-5">
              Se entrena el modelo. Teniendo la predicción de la variable Close
              (0).
            </p>

            <AplicationYPronostico var={mainData} />

            <p className="pt-5">
              Comprobamos que nuestro modelo esta entrenado comparando los
              valores iniciales con el pronostico.
            </p>

            <AplicationValores var={mainData} />

            <p className="pt-5">
              La información del algoritmo se muestra a continuación:
            </p>

            <AplicationVariables var={mainData} />
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
