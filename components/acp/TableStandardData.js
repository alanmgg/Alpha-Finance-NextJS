import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Spinner from "./../utilities/Spinner";

var objectData = [];

export default function TableStandardData(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.m_estandarizada) {
        objectData.push({
          index: props.var.m_estandarizada[item]["index"],
          open: props.var.m_estandarizada[item]["Open"].toFixed(4),
          high: props.var.m_estandarizada[item]["High"].toFixed(4),
          low: props.var.m_estandarizada[item]["Low"].toFixed(4),
          close: props.var.m_estandarizada[item]["Close"].toFixed(4),
          volume: props.var.m_estandarizada[item]["Volume"].toFixed(4),
          dividends: props.var.m_estandarizada[item]["Dividends"],
          stockSplits:
            props.var.m_estandarizada[item]["Stock Splits"].toFixed(4)
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {mainData !== null ? (
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Paso 2: Se hace una estandarización de los datos.</h5>

            <DataTable
              value={mainData}
              rows={5}
              paginator
              responsiveLayout="scroll"
            >
              <Column
                field="index"
                header=""
                sortable
                style={{ width: "20%", fontWeight: "bold", fontSize: 12 }}
              />
              <Column
                field="open"
                header="Open"
                sortable
                style={{ width: "15%", fontSize: 12 }}
              />
              <Column
                field="high"
                header="High"
                sortable
                style={{ width: "15%", fontSize: 12 }}
              />
              <Column
                field="low"
                header="Low"
                sortable
                style={{ width: "15%", fontSize: 12 }}
              />
              <Column
                field="close"
                header="Close"
                sortable
                style={{ width: "15%", fontSize: 12 }}
              />
              <Column
                field="volume"
                header="Volume"
                sortable
                style={{ width: "25%", fontSize: 12 }}
              />
              <Column
                field="dividends"
                header="Dividends"
                sortable
                style={{ width: "10%", fontSize: 12 }}
              />
              <Column
                field="stockSplits"
                header="Stock Splits"
                sortable
                style={{ width: "10%", fontSize: 12 }}
              />
            </DataTable>
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
