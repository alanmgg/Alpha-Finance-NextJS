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
            {`ID                    `}
            {nullData.ID}
            <br />
            {`Gender                `}
            {nullData.Gender}
            <br />
            {`Ever_Married          `}
            {nullData.Ever_Married}
            <br />
            {`Age                   `}
            {nullData.Age}
            <br />
            {`Graduated             `}
            {nullData.Graduated}
            <br />
            {`Profession            `}
            {nullData.Profession}
            <br />
            {`Work_Experience       `}
            {nullData.Work_Experience}
            <br />
            {`Spending_Score        `}
            {nullData.Spending_Score}
            <br />
            {`Family_Size           `}
            {nullData.Family_Size}
            <br />
            {`Var_1                 `}
            {nullData.Var_1}
            <br />
            {`dtype: `}
            {nullData.dtype}
          </code>
        </pre>
      ) : null}
    </div>
  );
}
