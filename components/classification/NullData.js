import React, { useEffect, useState } from "react";

export default function NullData(props) {
  const [nullData, setNullData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setNullData(props.var.is_null);
    }
  }, [props]);

  return (
    <div className="pt-3">
      {nullData !== null ? (
        <pre className="app-code" style={{ fontSize: 12 }}>
          <code>
            {`Age             `}
            {nullData.age}
            <br />
            {`Sex             `}
            {nullData.sex}
            <br />
            {`BP              `}
            {nullData.bp}
            <br />
            {`Cholesterol     `}
            {nullData.cholesterol}
            <br />
            {`Na_to_K         `}
            {nullData.na_to_k}
            <br />
            {`Drug            `}
            {nullData.drug}
            <br />
            {`dtype: `}
            {nullData.dtype}
          </code>
        </pre>
      ) : null}
    </div>
  );
}
