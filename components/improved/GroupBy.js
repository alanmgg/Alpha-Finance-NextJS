import React, { useEffect, useState } from "react";
import Spinner from "../utilities/Spinner";

export default function GroupBy(props) {
  const [groupByData, setGroupByData] = useState(null);
  const [column, setColumn] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setGroupByData(props.var.groupby);
      setColumn(props.column);
    }
  }, [props]);

  const formatCode = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return ""; // Si los datos no son válidos, retorna una cadena vacía
    }

    let formattedCode = column + "\n";
    data.forEach((item) => {
      const drug = item[column] ? item[column].toString() : ""; // Verifica si existe item.Drug antes de convertirlo a cadena
      const values = item.values ? item.values.toString() : ""; // Verifica si existe item.values antes de convertirlo a cadena
      formattedCode += `${drug.padEnd(7)}${values}\n`;
    });
    formattedCode += "dtype: int64";
    return formattedCode;
  };

  let formattedCode = "";
  if (groupByData !== null) {
    formattedCode = formatCode(groupByData);
  }

  return (
    <div className="grid">
      {groupByData !== null ? (
        <div className="col-12 xl:col-12">
          <pre className="app-code" style={{ fontSize: 12 }}>
            <code>{formattedCode}</code>
          </pre>
        </div>
      ) : (
        <div className="col-12 xl:col-12">
          <Spinner layout="small" />
        </div>
      )}
    </div>
  );
}
