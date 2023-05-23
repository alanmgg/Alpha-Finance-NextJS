import React, { useEffect, useState } from "react";
import Spinner from "../utilities/Spinner";

import DescribeData from "./DescribeData";

export default function NullData(props) {
  const [mainData, setMainData] = useState(null);
  const [nullData, setNullData] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setNullData(props.var.is_null);
      setMainData(props.var);
    }
  }, [props]);

  return (
    <div className="grid pt-5">
      {nullData !== null ? (
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Descripción de la estructura de los datos.</h5>
            <pre className="app-code" style={{ fontSize: 12 }}>
              <code>
                {`Open            `}
                {nullData.open}
                <br />
                {`High            `}
                {nullData.high}
                <br />
                {`Low             `}
                {nullData.low}
                <br />
                {`Close           `}
                {nullData.close}
                <br />
                {`Volume          `}
                {nullData.volume}
                <br />
                {`Dividends       `}
                {nullData.dividends}
                <br />
                {`Stock Splits    `}
                {nullData["stock splits"]}
                <br />
                {`dtype: `}
                {nullData.dtype}
              </code>
            </pre>

            <DescribeData var={mainData} />
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
