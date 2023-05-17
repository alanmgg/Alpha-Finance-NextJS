import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function TableDainData(props) {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (props.var !== null && mainData === null) {
      objectData = [];

      for (const item in props.var) {
        objectData.push({
          date: item,
          open: props.var[item]["1. open"],
          high: props.var[item]["2. high"],
          low: props.var[item]["3. low"],
          close: props.var[item]["4. close"],
          volume: props.var[item]["5. volume"]
        });
      }
      setMainData(objectData);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      <div className="col-12 xl:col-12">
        <div className="card">
          <DataTable
            value={mainData}
            rows={5}
            paginator
            responsiveLayout="scroll"
          >
            <Column
              field="date"
              header="Fecha"
              sortable
              style={{ width: "25%" }}
            />
            <Column
              field="open"
              header="Open"
              sortable
              style={{ width: "20%" }}
            />
            <Column
              field="high"
              header="High"
              sortable
              style={{ width: "20%" }}
            />
            <Column
              field="low"
              header="Low"
              sortable
              style={{ width: "20%" }}
            />
            <Column
              field="close"
              header="Close"
              sortable
              style={{ width: "20%" }}
            />
            <Column
              field="volume"
              header="Volume"
              sortable
              style={{ width: "25%" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
