import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

var objectData = [];

export default function DescribeData(props) {
  const [describeData, setDescribeData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      objectData = [];

      for (const item in props.var.describe) {
        objectData.push({
          index: props.var.describe[item]["index"],
          open: props.var.describe[item]["Open"].toFixed(4),
          high: props.var.describe[item]["High"].toFixed(4),
          low: props.var.describe[item]["Low"].toFixed(4),
          close: props.var.describe[item]["Close"].toFixed(4),
          volume: props.var.describe[item]["Volume"].toFixed(4),
          dividends: props.var.describe[item]["Dividends"].toFixed(4),
          stockSplits: props.var.describe[item]["Stock Splits"].toFixed(4)
        });
      }
      setDescribeData(objectData);
    }
  }, [props]);

  return (
    <div className="pt-3">
      <DataTable value={describeData} rows={5}>
        <Column
          field="index"
          header=""
          style={{ width: "10%", fontWeight: "bold", fontSize: 12 }}
        />
        <Column
          field="open"
          header="Open"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="high"
          header="High"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="low"
          header="Low"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="close"
          header="Close"
          style={{ width: "15%", fontSize: 12 }}
        />
        <Column
          field="volume"
          header="Volume"
          style={{ width: "25%", fontSize: 12 }}
        />
        <Column
          field="dividends"
          header="Dividends"
          style={{ width: "10%", fontSize: 12 }}
        />
        <Column
          field="stockSplits"
          header="Stock Splits"
          style={{ width: "10%", fontSize: 12 }}
        />
      </DataTable>

      <ul className="pt-3">
        <li>
          Se incluye un recuento, media, desviación, valor mínimo, valor máximo,
          percentil inferior (25%), 50% y percentil superior (75%).
        </li>
        <li>Por defecto, el percentil 50 es lo mismo que la mediana.</li>
        <li>
          Se observa que para cada variable, el recuento también ayuda a
          identificar variables con valores nulos o vacios. Estos son: Dividends
          y Stock Splits.
        </li>
      </ul>
    </div>
  );
}
