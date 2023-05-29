import React, { useEffect, useState } from "react";

export default function GroupBy(props) {
  const [groupBy, setGroupBy] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setGroupBy(props.var.groupby);
    }
  }, [props]);

  return (
    <div className="pt-1">
      {groupBy !== null ? (
        <pre className="app-code" style={{ fontSize: 12 }}>
          <code>
            {`Gender`}
            <br />
            {groupBy[0].Gender}
            {`.0            `}
            {groupBy[0].values}
            <br />
            {groupBy[1].Gender}
            {`.0            `}
            {groupBy[1].values}
            <br />
            {`dtype: int64`}
          </code>
        </pre>
      ) : null}
    </div>
  );
}
