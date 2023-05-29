import React, { useEffect, useState } from "react";

export default function GroupByC(props) {
  const [groupBy, setGroupBy] = useState(null);

  useEffect(() => {
    if (props.var !== null) {
      setGroupBy(props.var.groupby_cluster);
    }
  }, [props]);

  return (
    <div className="pt-3">
      {groupBy !== null ? (
        <pre className="app-code" style={{ fontSize: 12 }}>
          <code>
            {`ClusterC`}
            <br />
            {groupBy[0].ClusterC}
            {`.0            `}
            {groupBy[0].values}
            <br />
            {groupBy[1].ClusterC}
            {`.0            `}
            {groupBy[1].values}
            <br />
            {groupBy[2].ClusterC}
            {`.0            `}
            {groupBy[2].values}
            <br />
            {groupBy[3].ClusterC}
            {`.0            `}
            {groupBy[3].values}
            <br />
            {`dtype: int64`}
          </code>
        </pre>
      ) : null}
    </div>
  );
}
